import * as React from "react";
import { observer } from "mobx-react";
import { Select } from "@alethio/ui/lib/control/Select";
import { Option } from "@alethio/ui/lib/control/Option";
import { SelectFields } from "./SelectFields";

interface ISelectGraphProps {
    fields: SelectFields;
}
@observer
export class SelectGraph extends React.Component<ISelectGraphProps> {
    render() {
        return (
            <Select value={this.props.fields.getSelectedField().key}
                onSelect={this.onCheckboxChange}>
                {this.props.fields.getFields().map((f) => {
                    return (
                        <Option
                            key={f.key}
                            value={f.key}
                        >{f.label}</Option>
                    );
                })}
            </Select>
        );
    }

    private onCheckboxChange = (value: string) => this.props.fields.setSelectedField(value);
}
