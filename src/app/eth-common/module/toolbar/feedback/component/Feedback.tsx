import * as React from "react";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { InfoIcon } from "@alethio/ui/lib/icon/InfoIcon";
import { ITranslation } from "plugin-api/ITranslation";

export interface IFeedbackProps {
    translation: ITranslation;
}

export class Feedback extends React.Component<IFeedbackProps> {
    render() {
        return <ToolbarIconButton
            Icon={InfoIcon}
            onClick={this.handleFeedbackOpen}
        />;
    }

    private handleFeedbackOpen = () => {
        // HACK: triggers the hidden hotjar feedback button
        let feedbackBtn = document.querySelector(`div[class^="_hj"][class$="_feedback_minimized_label"]`);
        if (feedbackBtn) {
            (feedbackBtn as HTMLElement).click();
        } else {
            if (!(window as any).hjBootstrap) {
                // Widget didn't load, probably because of ad blocker. let's show an error
                alert(this.props.translation.get("general.hotjarError"));
            }
        }
    }
}
