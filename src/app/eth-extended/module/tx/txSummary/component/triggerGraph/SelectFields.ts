import { observable, action } from "mobx";
import { ITranslation } from "plugin-api/ITranslation";

export enum GraphSelectFieldKey {
    Trigger = "trigger",
    Account = "account",
    Message = "message"
}

export interface IGraphSelectField {
    key: GraphSelectFieldKey;
    label: string;
}

export class SelectFields {
    protected fields: IGraphSelectField[];

    @observable
    protected selectedField: IGraphSelectField;

    constructor(t: ITranslation) {
        this.fields = [{
            key: GraphSelectFieldKey.Trigger,
            label: t.get("txView.content.txSummary.graphSelect.triggerGraph")
        }, {
            key: GraphSelectFieldKey.Account,
            label: t.get("txView.content.txSummary.graphSelect.accountInteractionGraph")
        }, {
            key: GraphSelectFieldKey.Message,
            label: t.get("txView.content.txSummary.graphSelect.messageGraph")
        }];
        this.selectedField = this.fields[0];
    }

    getFields() {
        return this.fields;
    }

    getSelectedField() {
        return this.selectedField;
    }

    @action setSelectedField(key: string) {
        const field = this.fields.find((f: IGraphSelectField) => {
            return key === f.key;
        });
        if (field) {
            this.selectedField = field;
        }
    }
}
