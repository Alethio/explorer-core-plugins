import React from "react";
import ReactDOM from "react-dom";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ITranslation } from "plugin-api/ITranslation";
import { observer } from "mobx-react";
import { IconButton } from "@alethio/ui/lib/control/IconButton";
import { CloseIcon } from "@alethio/ui/lib/icon/CloseIcon";
import { observable } from "mobx";

export interface IReorgBannerProps {
    translation: ITranslation;
    isReorged: boolean;
}

const ReorgBannerRoot = styled.div`
    background: ${props => props.theme.colors.base.bg.alt};
    border-radius: 4px;
    padding: 0 16px;
    box-sizing: border-box;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.04);

    position: fixed;
    z-index: 9999;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;

    @media ${props => props.theme.media.xs} {
        top: 100px;
        width: 90%;
    }
`;

const ReorgBannerText = styled.div`
    font-size: 14px;
    font-weight: 400;
    padding: 10px 16px 10px 0;
`;

@observer
export class ReorgBanner extends React.Component<IReorgBannerProps> {
    @observable
    private visible: boolean;

    constructor(props: IReorgBannerProps) {
        super(props);

        this.visible = props.isReorged;
    }

    componentDidUpdate(prevProps: IReorgBannerProps) {
        if (prevProps.isReorged !== this.props.isReorged) {
            this.visible = this.props.isReorged;
        }
    }

    render() {
        let { translation: tr } = this.props;

        let [msgPreLink, msgLink, msgPostLink] = tr.get("general.reorgNotice").split(/\{link\}|\{\/link\}/);

        return this.visible ? ReactDOM.createPortal(
            <ReorgBannerRoot>
                <ReorgBannerText>{msgPreLink}<a href="javascript:;"
                    onClick={() => location.reload()}>{msgLink}</a>{msgPostLink}</ReorgBannerText>
                <IconButton Icon={CloseIcon} color={theme => theme.colors.base.secondary.color}
                    onClick={() => this.visible = false} />
            </ReorgBannerRoot>,
            document.body
        ) : null;
    }
}
