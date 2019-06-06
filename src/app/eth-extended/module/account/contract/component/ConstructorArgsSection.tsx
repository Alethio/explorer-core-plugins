import * as React from "react";
import { CopyIcon } from "@alethio/ui/lib/icon/CopyIcon";
import { ITranslation } from "plugin-api/ITranslation";
import { FloatingActionBar } from "@alethio/ui/lib/overlay/FloatingActionBar";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { SwitchIcon } from "@alethio/ui/lib/icon/SwitchIcon";
import { Button } from "@alethio/ui/lib/control/Button";
import { Clipboard } from "@puzzl/browser/lib/Clipboard";

export interface IConstructorArgsSectionProps {
    byteCode: string;
    decodedArgs: string;
    byteCodeElement: React.ReactElement<{}>;
    decodedArgsElement: React.ReactElement<{}>;
    translation: ITranslation;
}

@observer
export class ConstructorArgsSection extends React.Component<IConstructorArgsSectionProps> {
    @observable
    private showDecodedArgs = false;

    render() {
        let { translation: tr, byteCodeElement, decodedArgsElement } = this.props;

        return (
            <div>
                { this.showDecodedArgs ?
                // Make sure source code element is destroyed/re-mounted every time
                <div key={1}>{decodedArgsElement}</div> :
                <div key={2}>{byteCodeElement}</div>
                }
                <FloatingActionBar>
                    <Button floating Icon={CopyIcon} onClick={this.handleCopyCode}>{
                        tr.get("accountView.contract.sourceCode.copyCode.label")
                    }</Button>
                    <Button floating Icon={SwitchIcon} onClick={this.toggleDecodedArgs}>{
                        this.showDecodedArgs ?
                            tr.get("accountView.contract.arguments.switch.byteCode.label") :
                            tr.get("accountView.contract.arguments.switch.decodedArgs.label")
                    }</Button>
                </FloatingActionBar>
            </div>
        );
    }

    private handleCopyCode = () => {
        new Clipboard(document).copy(this.showDecodedArgs ? this.props.decodedArgs : this.props.byteCode);
    }

    private toggleDecodedArgs = () => {
        this.showDecodedArgs = !this.showDecodedArgs;
    }
}
