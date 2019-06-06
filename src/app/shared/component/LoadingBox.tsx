import * as React from "react";
import { IMessageBoxProps } from "@alethio/ui/lib/MessageBox";
import { ITranslation } from "plugin-api/ITranslation";
import { LoadingBox as LoadingBoxBase } from "@alethio/ui/lib/LoadingBox";

export interface ILoadingBoxProps {
    colors?: IMessageBoxProps["colors"];
    translation: ITranslation;
}

export class LoadingBox extends React.Component<ILoadingBoxProps> {
    render() {
        return (
            <LoadingBoxBase colors={this.props.colors}>
                <span dangerouslySetInnerHTML={{
                    __html: this.props.translation.get("general.loadingText")
                }} />
            </LoadingBoxBase>
        );
    }
}
