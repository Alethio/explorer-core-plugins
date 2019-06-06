import {
    TimeElapsedBox as TimeElapsedBoxBase,
    ITimeElapsedBoxProps as ITimeElapsedBoxPropsBase
} from "@alethio/ui/lib/data/box/TimeElapsedBox";
import { ITranslation } from "plugin-api/ITranslation";
import React from "react";
import { getRelativeTimeTranslations } from "app/helper/getRelativeTimeTranslations";

export interface ITimeElapsedBoxProps
    extends Pick<ITimeElapsedBoxPropsBase, Exclude<keyof ITimeElapsedBoxPropsBase, "translations">> {
    translation: ITranslation;
}

export class TimeElapsedBox extends React.Component<ITimeElapsedBoxProps> {
    render() {
        return <TimeElapsedBoxBase {...this.props}
            translations={getRelativeTimeTranslations(this.props.translation)} />;
    }
}
