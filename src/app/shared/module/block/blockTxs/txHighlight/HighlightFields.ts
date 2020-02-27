import { observable, action } from "mobx";
import { BigNumber } from "@alethio/ui/lib/util/BigNumber";
import { ITranslation } from "plugin-api/ITranslation";

interface IHighlightField<TTxData, THighlightFieldKey extends string> {
    key: THighlightFieldKey;
    getLabel(t: ITranslation): string;
    getData(t: TTxData): number | BigNumber;
}

export class HighlightFields<TTxData, THighlightFieldKey extends string> {
    protected fields: IHighlightField<TTxData, THighlightFieldKey>[];

    @observable
    protected selectedField: IHighlightField<TTxData, THighlightFieldKey>;

    getFields() {
        return this.fields;
    }

    getSelectedField() {
        return this.selectedField;
    }

    @action setSelectedField(key: string) {
        const field = this.fields.find((f: IHighlightField<TTxData, THighlightFieldKey>) => {
            return key === f.key;
        });
        if (field) {
            this.selectedField = field;
        }
    }
}
