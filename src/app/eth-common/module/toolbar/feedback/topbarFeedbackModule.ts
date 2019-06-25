import { IModuleDef } from "plugin-api/IModuleDef";
import { TopbarFeedback, ITopbarFeedbackProps } from "./component/TopbarFeedback";

export const topbarFeedbackModule: IModuleDef<ITopbarFeedbackProps, {}> = {
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => TopbarFeedback,
    getContentProps(data) {
        let { translation } = data;
        let props: ITopbarFeedbackProps = {
            translation
        };
        return props;
    }
};
