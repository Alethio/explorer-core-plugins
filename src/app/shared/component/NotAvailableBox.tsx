import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { ITranslation } from "plugin-api/ITranslation";
import { SpinnerRegular } from "@alethio/ui/lib/fx/SpinnerRegular";
import emojiTurtle from "assets/emojiTurtle.png";
import styled from "@alethio/explorer-ui/lib/styled-components";

const TurtleImg = styled.img`
    vertical-align: text-bottom;
`;

export interface INotAvailableBoxProps {
    translation: ITranslation;
}

export class NotAvailableBox extends React.Component<INotAvailableBoxProps> {
    render() {
        let { translation: tr } = this.props;

        return (
            <ValueBox>
                <Tooltip content={
                    <>
                        {tr.get("blockView.content.dataNotLoaded.text")}
                        <span style={{ marginLeft: 3 }}>
                            <TurtleImg width="20" height="17" src={emojiTurtle} alt="emojiTurtle" />
                        </span>
                    </>
                }>
                    <SpinnerRegular />
                </Tooltip>
            </ValueBox>
        );
    }
}
