import * as React from "react";
import { CopyIcon } from "@alethio/ui/lib/icon/CopyIcon";
import { ITranslation } from "plugin-api/ITranslation";
import { FloatingActionBar } from "@alethio/ui/lib/overlay/FloatingActionBar";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { SwitchIcon } from "@alethio/ui/lib/icon/SwitchIcon";
import { Button } from "@alethio/ui/lib/control/Button";
import { Clipboard } from "@puzzl/browser/lib/Clipboard";

export interface ICreationCodeSectionProps {
    byteCode: string;
    opCode: string;
    byteCodeElement: React.ReactElement<{}>;
    opCodeElement: React.ReactElement<{}>;
    translation: ITranslation;
}

@observer
export class CreationCodeSection extends React.Component<ICreationCodeSectionProps> {
    @observable
    private showOpCode = false;

    render() {
        let { translation: tr, byteCodeElement, opCodeElement } = this.props;

        return (
            <div>
                { this.showOpCode ?
                // Make sure source code element is destroyed/re-mounted every time
                <div key={1}>{opCodeElement}</div> :
                <div key={2}>{byteCodeElement}</div>
                }
                <FloatingActionBar>
                    <Button floating Icon={CopyIcon} onClick={this.handleCopyCode}>{
                        tr.get("accountView.contract.sourceCode.copyCode.label")
                    }</Button>
                    <Button floating Icon={SwitchIcon} onClick={this.toggleOpCode}>{
                        this.showOpCode ?
                            tr.get("accountView.contract.accountCode.switch.byteCode.label") :
                            tr.get("accountView.contract.accountCode.switch.opCode.label")
                    }</Button>
                </FloatingActionBar>
            </div>
        );
    }

    private handleCopyCode = () => {
        new Clipboard(document).copy(this.showOpCode ? this.props.opCode : this.props.byteCode);
    }

    private toggleOpCode = () => {
        this.showOpCode = !this.showOpCode;
    }
}
