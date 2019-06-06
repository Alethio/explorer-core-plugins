import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
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
                <TooltipRegular content={
                    <>
                        {tr.get("blockView.content.dataNotLoaded.text")}
                        <span style={{ marginLeft: 3 }}>
                            <TurtleImg width="20" height="17" src={emojiTurtle} alt="emojiTurtle" />
                        </span>
                    </>
                }>
                    <SpinnerRegular />
                </TooltipRegular>
            </ValueBox>
        );
    }
}
