import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { Feedback } from "./Feedback";
import { MobileMenuItem } from "@alethio/ui/lib/layout/topbar/MobileMenuItem";

export interface ITopbarFeedbackProps {
    translation: ITranslation;
}

export class TopbarFeedback extends React.Component<ITopbarFeedbackProps> {
    render() {
        return (
            <MobileMenuItem title={this.props.translation.get("toolbar.feedback.label")}>
                <Feedback translation={this.props.translation} />
            </MobileMenuItem>
        );
    }
}
