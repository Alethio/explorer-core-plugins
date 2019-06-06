import * as React from "react";
import { IErrorIconProps } from "@alethio/ui/lib/icon/ErrorIcon";
import { ITranslation } from "plugin-api/ITranslation";
import { ErrorHint } from "@alethio/ui/lib/ErrorHint";

interface IErrorIconHintProps extends IErrorIconProps {
    translation: ITranslation;
}

export class ErrorIconHint extends React.Component<IErrorIconHintProps> {
    render() {
        let { translation } = this.props;

        return (
            <ErrorHint>{translation.get("general.error")}</ErrorHint>
        );
    }
}
