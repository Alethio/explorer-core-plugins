import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { CopyIcon } from "@alethio/ui/lib/icon/CopyIcon";
import { ITranslation } from "plugin-api/ITranslation";
import { FloatingActionBar } from "@alethio/ui/lib/overlay/FloatingActionBar";
import { Button } from "@alethio/ui/lib/control/Button";
import { Link } from "plugin-api/component/Link";
import { IContractDataSource, SourceType } from "../../../../data/contract/dataSource/ContractDataSource";
import { Clipboard } from "@puzzl/browser/lib/Clipboard";

export interface ISourceCodeSectionProps {
    sourceCode: string;
    sourceCodeElement: React.ReactElement<{}>;
    contractAddress: string;
    dataSource: IContractDataSource;
    translation: ITranslation;
}

const Disclaimer = styled.div`
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme.colors.base.secondary.color};
`;

export class SourceCodeSection extends React.Component<ISourceCodeSectionProps> {
    render() {
        let { translation: tr, sourceCodeElement } = this.props;
        let disclaimer: React.ReactNode | null = null;
        if (this.props.dataSource.type !== SourceType.Ethstats) {
            let [, disclaimerPre, disclaimerTextLink, disclaimerPost] =
            tr.get(
                "accountView.contract.dataSource." + SourceType[this.props.dataSource.type] + ".label"
            ).match(/(.*){link}(.*){\/link}(.*)/)!;
            disclaimer = (
                <Disclaimer>
                    {disclaimerPre}
                    <Link to={this.props.dataSource.getUrl(this.props.contractAddress)}>
                        {disclaimerTextLink}
                    </Link>
                    {disclaimerPost}
                </Disclaimer>
            );
        }

        return (
            <div>
                {sourceCodeElement}
                { disclaimer ?
                <FloatingActionBar position="top-right">
                    { disclaimer }
                </FloatingActionBar>
                : null }
                <FloatingActionBar>
                    <Button floating Icon={CopyIcon} onClick={this.handleCopyCode}>{
                        tr.get("accountView.contract.sourceCode.copyCode.label")
                    }</Button>
                </FloatingActionBar>
            </div>
        );
    }

    private handleCopyCode = () => {
        new Clipboard(document).copy(this.props.sourceCode);
    }
}
