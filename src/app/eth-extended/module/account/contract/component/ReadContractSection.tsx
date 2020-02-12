import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { TypedValueBox } from "@alethio/ui/lib/layout/content/box/TypedValueBox";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { abiUtil } from "app/eth-extended/data/contract/abiUtil";
import { ReadInput } from "app/eth-extended/module/account/contract/component/ReadInput";
import { ContractWeb3Api } from "app/eth-extended/data/contract/ContractWeb3Api";
import { IAbiMemberIOValue } from "app/eth-extended/data/contract/IAbi";
import { IAbiFunction } from "app/eth-extended/data/contract/IAbiFunction";
import { Button } from "@alethio/ui/lib/control/Button";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { FloatingActionBar } from "@alethio/ui/lib/overlay/FloatingActionBar";
import { SwitchIcon } from "@alethio/ui/lib/icon/SwitchIcon";
import { Task } from "@puzzl/core/lib/async/Task";
import { CancellationToken, OperationCanceledError } from "@puzzl/core/lib/async/cancellation";
import { ContractAbi } from "app/eth-extended/data/contract/ContractAbi";
import { KeyboardReturnIcon } from "@alethio/ui/lib/icon/KeyboardReturnIcon";
import { ILogger } from "plugin-api/ILogger";

interface IAbiFnInvocation {
    abiFn: IAbiFunction;
    inputsValues: IAbiMemberIOValue[];
    outputsValues: IAbiMemberIOValue[];
    inProgress: boolean;
    error: boolean;
}

interface IReadContractSectionProps {
    translation: ITranslation;
    contractAddress: string;
    abi: ContractAbi;
    contractWeb3Api: ContractWeb3Api;
    logger: ILogger;
}

const ReadContractSectionRoot = styled.div`
    background-color: ${({theme}) => theme.colors.readContractSectionBg};
    padding: 20px 0 20px 241px;
`;
const StyledLabel = styled(Label)`
    color: ${({theme}) => theme.colors.readContractLabelBg};
`;
const InputTypeSpan = styled.span`
    color: ${({theme}) => theme.colors.typedValueBoxTypeText };
    margin-left: 8px;
`;

const READ_CONTRACT_LINE_BASE_HEIGHT = 44;

@observer
export class ReadContractSection extends React.Component<IReadContractSectionProps> {
    @observable
    private abiFnInvocations: IAbiFnInvocation[] = [];

    private dataFetchTask: Task<void> | undefined;

    constructor(props: IReadContractSectionProps) {
        super(props);

        this.updateContractReadData(props.contractWeb3Api, props.abi, props.contractAddress);
    }

    componentWillUnmount() {
        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
    }

    componentDidUpdate(props: IReadContractSectionProps) {

        if (
            props.abi !== this.props.abi ||
            props.contractAddress !== this.props.contractAddress ||
            props.contractWeb3Api !== this.props.contractWeb3Api
        ) {
            this.updateContractReadData(props.contractWeb3Api, props.abi, props.contractAddress);
        }
    }

    private updateContractReadData(
        contractWeb3Api: ContractWeb3Api,
        // abi: IAbiFunction[],
        abi: ContractAbi,
        contractAddress: string
    ) {
        this.buildAbiFnInvocations(abi.getReadFunctions());

        if (this.dataFetchTask) {
            this.dataFetchTask.cancel();
        }
        this.dataFetchTask = new Task(
            async (cancelToken) => this.readContractConstants(contractWeb3Api, abi, contractAddress, cancelToken)
                .catch(e => {
                    if (!(e instanceof OperationCanceledError)) {
                        throw e;
                    }
                })
        );
        // TODO: error and loading states for constants
        this.dataFetchTask.start()
            .catch(e => this.props.logger.error(e));
    }

    private buildAbiFnInvocations(abi: IAbiFunction[]) {
        this.abiFnInvocations = abi.map(abiFn => {
            let abiResult: IAbiFnInvocation = {
                abiFn,
                inputsValues: abiFn.inputs.map(inp => {
                    let inputVal: IAbiMemberIOValue = {
                        name: inp.name,
                        type: inp.type,
                        value: ""
                    };
                    return inputVal;
                }),
                outputsValues: abiFn.outputs.map(outp => {
                    let outputVal: IAbiMemberIOValue = {
                        name: outp.name,
                        type: outp.type,
                        value: ""
                    };
                    return outputVal;
                }),
                inProgress: abiUtil.method.canBeCalledAutomatically(abiFn),
                error: false
            };
            return abiResult;
        });
    }

    /**
     * @param contractWeb3Api
     * @param abi
     * @param contractAddress
     */
    async readContractConstants(
        contractWeb3Api: ContractWeb3Api,
        // abi: IAbiFunction[],
        abi: ContractAbi,
        contractAddress: string,
        cancelToken: CancellationToken
    ) {
        await contractWeb3Api.loadAbi(abi.getRawData(), contractAddress);
        cancelToken.throwIfCancelled();

        this.abiFnInvocations = await Promise.all(
            this.abiFnInvocations.map(async (abiFnInvocation) => {
                if (abiUtil.method.canBeCalledAutomatically(abiFnInvocation.abiFn)) {
                    await this.callAbiMethod(abiFnInvocation);
                    cancelToken.throwIfCancelled();
                }
                return abiFnInvocation;
            })
        );
    }
    private shouldAddSpacer(idx: number, abiFn: IAbiFunction, prevMethodIsAutoCalled: boolean) {
        /**
         * Spacer not to be added for first abi method
         * must be added before every form required method and
         * must be added for auto called abi method that comes after a form method
         */
        return !!idx && (
            (abiUtil.method.canBeCalledAutomatically(abiFn) && !prevMethodIsAutoCalled) ||
            (!abiUtil.method.canBeCalledAutomatically(abiFn))
        );
    }

    render() {
        const { translation: tr } = this.props;
        let prevMethodIsAutoCalled = true;

        return (
            <ReadContractSectionRoot>
                {
                    this.abiFnInvocations.map((fnInvocation, idx) => {
                        let shouldAddSpacer = this.shouldAddSpacer(
                            idx, fnInvocation.abiFn, prevMethodIsAutoCalled
                        );
                        prevMethodIsAutoCalled = abiUtil.method.canBeCalledAutomatically(fnInvocation.abiFn);
                        return (
                            <React.Fragment key={idx}>
                                { shouldAddSpacer ? <Spacer height="24px" key={idx} /> : null }
                                { abiUtil.method.canBeCalledAutomatically(fnInvocation.abiFn) ?
                                this.renderAutoCalledMethod(fnInvocation) :
                                this.renderFormMethod(fnInvocation) }
                            </React.Fragment>
                        );
                    })
                }
                <FloatingActionBar>
                    <Button elevation="high" colors="primary" Icon={SwitchIcon} onClick={this.resetForm}>{
                        tr.get("accountView.contract.read.reset.label")
                    }</Button>
                </FloatingActionBar>
            </ReadContractSectionRoot>
        );
    }

    private renderAutoCalledMethod(metodInvocation: IAbiFnInvocation) {
        return metodInvocation.abiFn.outputs.map((output, idx) => (
            <LayoutRow key={idx}>
                <LayoutRowItem baseHeight={READ_CONTRACT_LINE_BASE_HEIGHT}>
                    <Label>{!idx ? metodInvocation.abiFn.name : ""}</Label>
                    <TypedValueBox
                        value={metodInvocation.outputsValues ? metodInvocation.outputsValues[idx].value : ""}
                        type={output.type}
                    />
                </LayoutRowItem>
            </LayoutRow>
        ));
    }

    private renderFormMethod(fnInvocation: IAbiFnInvocation) {
        return ([
            ...fnInvocation.inputsValues.map((input, idx) => (
                <LayoutRow key={idx + "input"}>
                    <LayoutRowItem baseHeight={READ_CONTRACT_LINE_BASE_HEIGHT}>
                        <StyledLabel>{!idx ? fnInvocation.abiFn.name : ""}</StyledLabel>
                        <ReadInput
                            onChange={(value) => { input.value = value; }}
                            value={input.value}
                            name={input.name}
                            placeholder={
                                <>
                                    <span>{
                                        (input.name ||
                                        this.props.translation.get(
                                            "accountView.contract.read.inputDefaultPlaceholder.label"
                                        ))
                                    }</span>
                                    <InputTypeSpan>{ input.type }</InputTypeSpan>
                                </>
                            }
                        />
                        {
                            idx === fnInvocation.abiFn.inputs.length - 1 ?
                            <Button onClick={() => this.callAbiMethod(fnInvocation)}
                                Icon={KeyboardReturnIcon}
                                iconPlacement="right"
                            >
                                { this.props.translation.get("accountView.contract.read.query.label") }
                            </Button> :
                            null
                        }
                    </LayoutRowItem>
                </LayoutRow>
            )),
            ...fnInvocation.outputsValues.map((output, idx) => (
                <LayoutRow key={idx + "output"}>
                    <LayoutRowItem baseHeight={READ_CONTRACT_LINE_BASE_HEIGHT}>
                        <Label>{
                            !idx ?
                            this.props.translation.get("accountView.contract.read.result.label") :
                            ""
                        }</Label>
                        <TypedValueBox
                            value={
                                fnInvocation.outputsValues ?
                                fnInvocation.outputsValues[idx].value :
                                (output.name ? output.name + ":" : "")
                            }
                            type={output.type}
                            withinForm
                        />
                    </LayoutRowItem>
                </LayoutRow>
            ))
        ]);
    }

    private callAbiMethod = async (fnInvocation: IAbiFnInvocation) => {
        // TODO: don't mutate arguments
        fnInvocation.inProgress = true;
        fnInvocation.error = false;
        fnInvocation.outputsValues.forEach(o => { o.value = ""; });
        try {
            fnInvocation.outputsValues = await this.props.contractWeb3Api.callAbiMethod(
                fnInvocation.abiFn,
                fnInvocation.inputsValues.map(input => input.value)
            );
        } catch (_e) {
            fnInvocation.error = true;
        }
        fnInvocation.inProgress = false;

        return fnInvocation;
    }

    private resetForm = () => {
        this.abiFnInvocations.forEach(fnInvocation => {
            if (!abiUtil.method.canBeCalledAutomatically(fnInvocation.abiFn)) {
                fnInvocation.inputsValues.forEach(o => { o.value = ""; });
                fnInvocation.outputsValues.forEach(o => { o.value = ""; });
            }
        });
    }

}
