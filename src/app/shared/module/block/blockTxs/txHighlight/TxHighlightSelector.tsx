import * as React from "react";
import { observer } from "mobx-react";
import { Select } from "@alethio/ui/lib/control/Select";
import { Option } from "@alethio/ui/lib/control/Option";
import { ITranslation } from "plugin-api/ITranslation";
import { HighlightFields } from "./HighlightFields";

interface ITxHighlightSelectorProps<TItem, THighlightFieldKey extends string> {
    fields: HighlightFields<TItem, THighlightFieldKey>;
    translation: ITranslation;
    disabled?: boolean;
}

@observer
export class TxHighlightSelector<TItem, THighlightFieldKey extends string>
extends React.Component<ITxHighlightSelectorProps<TItem, THighlightFieldKey>> {

    render() {
        let { translation: tr } = this.props;
        return (
            <Select disabled={this.props.disabled} value={this.props.fields.getSelectedField().key}
                onSelect={this.onCheckboxChange} >
                {this.props.fields.getFields().map((f) => {
                    return (
                        <Option
                            key={f.key}
                            value={f.key}
                        >{f.getLabel(tr)}</Option>
                    );
                })}
            </Select>
        );
    }

    private onCheckboxChange = (value: string) => this.props.fields.setSelectedField(value);
}
