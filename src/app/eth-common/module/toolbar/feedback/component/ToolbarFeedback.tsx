import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { Feedback } from "./Feedback";

export interface IToolbarFeedbackProps {
    translation: ITranslation;
}

export class ToolbarFeedback extends React.Component<IToolbarFeedbackProps> {
    render() {
        return (
            <ToolbarItem title={this.props.translation.get("toolbar.feedback.label")} >
                <Feedback translation={this.props.translation} />
            </ToolbarItem>
        );
    }
}
