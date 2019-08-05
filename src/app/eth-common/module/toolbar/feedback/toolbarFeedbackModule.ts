import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarFeedback, IToolbarFeedbackProps } from "./component/ToolbarFeedback";

export const toolbarFeedbackModule: IModuleDef<IToolbarFeedbackProps, {}> = {
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => ToolbarFeedback,
    getContentProps(data) {
        let { translation } = data;
        let props: IToolbarFeedbackProps = {
            translation
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("toolbar.feedback.help") as any
};
