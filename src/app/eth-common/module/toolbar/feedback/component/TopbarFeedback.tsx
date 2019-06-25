import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { Feedback } from "./Feedback";
import { MenuItem } from "plugin-api/component/topbar/MenuItem";

export interface ITopbarFeedbackProps {
    translation: ITranslation;
}

export class TopbarFeedback extends React.Component<ITopbarFeedbackProps> {
    render() {
        return (
            <MenuItem title={this.props.translation.get("toolbar.feedback.label")}>
                <Feedback translation={this.props.translation} />
            </MenuItem>
        );
    }
}
