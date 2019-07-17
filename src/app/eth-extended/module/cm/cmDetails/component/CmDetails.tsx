import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { CmIdBox } from "app/eth-extended/component/box/cm/CmIdBox";
import { TxTypeBox } from "@alethio/explorer-ui/lib/box/tx/TxTypeBox";
import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { weiToEth } from "app/util/wei";
import { CmStatus } from "app/eth-extended/module/cm/cmDetails/component/CmStatus";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ContractIcon } from "@alethio/ui/lib/icon/ContractIcon";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { GweiValueBox } from "@alethio/ui/lib/data/box/GweiValueBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { TraceArrow } from "app/eth-extended/module/cm/cmDetails/component/TraceArrow";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { ITranslation } from "plugin-api/ITranslation";
import { TraceValueBox } from "app/eth-extended/module/cm/cmDetails/component/TraceValueBox";

export interface ICmDetailsProps {
    txHash: string;
    txValidationIndex: number;
    cmDetails: ICmDetails;
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    modules?: JSX.Element[];
}

export class CmDetails extends React.PureComponent<ICmDetailsProps> {
    render() {
        let { translation: tr, cmDetails: cm, locale, latestEthPrice, ethSymbol } = this.props;

        return <>
            <LayoutSection>
                <LayoutRow minWidth={960}>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.id.label")}</Label>
                        <CmIdBox noLink txHash={this.props.txHash}
                            txValidationIndex={this.props.txValidationIndex} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.cmType.label")}</Label>
                        <TxTypeBox>{tr.get("general.contractMsg.type." + CmType[cm.type])}</TxTypeBox>
                        <Label arrow disabled={cm.value.isZero()}>{
                            cm.type === CmType.SelfDestruct ?
                                tr.get("general.contractMsg.refundValue") :
                                tr.get("general.contractMsg.value")
                        }</Label>
                        <EthValueBox
                            wei={cm.type === CmType.SelfDestruct ? cm.refundBalance! : cm.value}
                            locale={locale}
                            symbol={ethSymbol}
                        />
                        { latestEthPrice ?
                        <UsdValueBox
                            value={weiToEth(cm.value).multipliedBy(latestEthPrice).toNumber()}
                            locale={locale}
                        />
                        : null }
                        <CmStatus cm={cm} translation={tr} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={750}>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.originatorTxHash.label")}</Label>
                        <TxHashBox>{this.props.txHash}</TxHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.triggeredBy.label")}</Label>
                        { cm.parentTxValidationIndex > 0 ?
                        <CmIdBox txHash={this.props.txHash} txValidationIndex={cm.parentTxValidationIndex} />
                        :
                        <TxHashBox>{this.props.txHash}</TxHashBox>
                        }
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox>{cm.block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        {cm.block.creationTime ?
                        <>
                        <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                        <TimeElapsedBox timestamp={cm.block.creationTime}
                            translation={tr}
                            locale={locale} />
                        </>
                        : null }
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.from")}</Label>
                        <AddressHashBox Icon={ContractIcon}>{cm.from}</AddressHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{
                            cm.type === CmType.Create ?
                                tr.get("general.creates") :
                                cm.type === CmType.SelfDestruct ?
                                    tr.get("general.refunds") :
                                    tr.get("general.to")
                        }</Label>
                        <AddressHashBox
                            Icon={cm.type === CmType.Create ? ContractIcon : void 0}
                        >{cm.to}</AddressHashBox>
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
            { cm.type !== CmType.SelfDestruct ?
            <LayoutSection>
                <LayoutRow minWidth={600}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasLimit")}</Label>
                        <NumberBox value={cm.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasPrice")}</Label>
                        <GweiValueBox wei={cm.gasPrice} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={750}>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.gasUsed.label")}</Label>
                        <GasUsedValueBox value={cm.gasUsed} limit={cm.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.cmFee.label")}</Label>
                        <EthValueBox wei={cm.gasUsed.multipliedBy(cm.gasPrice)} decimals={9} locale={locale}
                            symbol={ethSymbol} />
                        { latestEthPrice ?
                        <UsdValueBox colors="highlight"
                            value={weiToEth(cm.gasUsed.multipliedBy(cm.gasPrice))
                                .multipliedBy(latestEthPrice).toNumber()} locale={locale} />
                        : null }
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
            : null }
            <LayoutSection>
                { cm.output ?
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("cmView.content.cmOutput.label")}</Label>
                        <HexData data={cm.output} />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                { cm.error ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.error.label")}</Label>
                        <ValueBox colors="error">{cm.error}</ValueBox>
                        <ErrorIcon />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
            </LayoutSection>
            <LayoutSection>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.totalMsgsTriggered.label")}</Label>
                        <NumberBox locale={locale} value={cm.totalMsgsTriggered} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.depth.label")}</Label>
                        <ValueBox>{cm.depth}</ValueBox>
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("cmView.content.traceAddress.label")}</Label>
                        <TraceValueBox>
                            {cm.traceAddr.map((i, idx) => idx ? <React.Fragment key={idx}>
                                <TraceArrow />{i}
                            </React.Fragment> :
                            i)}
                        </TraceValueBox>
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("cmView.content.blockValidationIndex.label")}</Label>
                        <NumberBox value={cm.blockValidationIdx} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
            { this.props.modules && this.props.modules.map((m, i) => <LayoutSection key={i}>{m}</LayoutSection>)}
        </>;
    }
}
