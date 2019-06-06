import { IModuleDef } from "plugin-api/IModuleDef";
import { IChartsProps, Charts } from "./Charts";

export const chartsModule: IModuleDef<IChartsProps, {}, "content"> = {
    contextType: {},
    slotNames: ["content"],
    dataAdapters: [],
    getContentComponent: async () => Charts,
    getContentProps(data) {
        let props: IChartsProps = {
            modules: data.slots && data.slots.content
        };
        return props;
    }
};
