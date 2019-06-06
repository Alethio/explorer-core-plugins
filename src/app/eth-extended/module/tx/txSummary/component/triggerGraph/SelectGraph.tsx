import * as React from "react";
import { Observer, observer } from "mobx-react";
import { SelectBox } from "@alethio/ui/lib/control/SelectBox";
import { Radio } from "@alethio/ui/lib/control/Radio";
import { HighlightSelectBox } from "@alethio/explorer-ui/lib/box/HighlightSelectBox";
import { SelectFields } from "./SelectFields";

interface ISelectGraphProps {
    fields: SelectFields;
}
@observer
export class SelectGraph extends React.Component<ISelectGraphProps> {
    private requestClose: () => void;
    render() {
        return (
            <SelectBox offset={{left: -20, top: -47}} render={({requestClose}) => {
                this.requestClose = requestClose;
                return (
                    <Observer>
                        {() => this.props.fields.getFields().map((f) => {
                            return (
                                <Radio
                                    id={"txGraph_" + f.key}
                                    key={f.key}
                                    value={f.key}
                                    name="txGraph"
                                    checked={this.props.fields.getSelectedField().key === f.key}
                                    onChange={this.onCheckboxChange}
                                >{f.label}</Radio>
                            );
                        })}
                    </Observer>
                );
            }}>
                <HighlightSelectBox>{ this.props.fields.getSelectedField().label }</HighlightSelectBox>
            </SelectBox>
        );
    }

    private onCheckboxChange = (
        _e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
        _name: string,
        value: string
    ) => {
        if (checked) {
            this.props.fields.setSelectedField(value);
        }
        this.requestClose();
    }
}
