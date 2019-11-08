import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { DifficultyBox } from "@alethio/ui/lib/data/box/DifficultyBox";
import { DecodedHexData } from "@alethio/ui/lib/data/hex/DecodedHexData";
import { HashValueBox } from "@alethio/ui/lib/data/box/HashValueBox";
import { UncleNumberBox } from "@alethio/explorer-ui/lib/box/uncle/UncleNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { UncleHashBox } from "@alethio/explorer-ui/lib/box/uncle/UncleHashBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { MinerLabelBox } from "@alethio/explorer-ui/lib/box/account/MinerLabelBox";
import { Link } from "plugin-api/component/Link";
import { ITranslation } from "plugin-api/ITranslation";
import { IUncleDetails as IUncleDetailsExtended } from "app/shared/data/uncle/IUncleDetails";
import { IUncleDetails as IUncleDetailsLite } from "app/eth-lite/data/uncle/IUncleDetails";

export interface IUncleDetailsProps {
    uncleDetails: IUncleDetailsExtended | IUncleDetailsLite;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

export class UncleDetails extends React.PureComponent<IUncleDetailsProps> {
    render() {
        let { translation: tr, uncleDetails: uncle, locale, ethSymbol } = this.props;
        const uncleReward = (uncle as IUncleDetailsExtended).beneficiaryReward;

        return <>
            <LayoutRow minWidth={900}>
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.uncleNumber.label")}</Label>
                    <UncleNumberBox>{uncle.id}</UncleNumberBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    {uncle.creationTime ?
                    <>
                    <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                    <TimeElapsedBox timestamp={uncle.creationTime}
                        translation={tr}
                        locale={locale} />
                    </>
                    : null }
                </LayoutRowItem>
                { uncle.position !== void 0 ?
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.position.label")}</Label>
                    <ValueBox>{uncle.position}</ValueBox>
                </LayoutRowItem>
                : null }
            </LayoutRow>
            <LayoutRow minWidth={760}>
                <LayoutRowItem>
                    <Label>{tr.get("general.hash")}</Label>
                    <UncleHashBox>{uncle.hash}</UncleHashBox>
                </LayoutRowItem>
                {uncle.parentId ?
                <LayoutRowItem>
                    <Label>{tr.get("uncleView.content.includedBy.label")}</Label>
                    <BlockNumberBox>{uncle.parentId}</BlockNumberBox>
                </LayoutRowItem> : null }
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("general.nonce")}</Label>
                    <HashValueBox>{uncle.nonce}</HashValueBox>
                </LayoutRowItem>
            </LayoutRow>
            { uncle.sha3uncles ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.sha3Uncles.label")}</Label>
                    <HashValueBox>{uncle.sha3uncles}</HashValueBox>
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { uncle.beneficiaryAddress ?
            <LayoutRow>
                <LayoutRowItem fullRow>
                    <Label>{tr.get("blockView.content.beneficiary.label")}</Label>
                    <AddressHashBox>{uncle.beneficiaryAddress}</AddressHashBox>
                    { (uncle as IUncleDetailsExtended).beneficiaryName ?
                    <Link to={`page://aleth.io/account?accountHash=${uncle.beneficiaryAddress}`}>
                        <MinerLabelBox>{(uncle as IUncleDetailsExtended).beneficiaryName}</MinerLabelBox>
                    </Link>
                    : null }
                    { uncleReward ?
                    <>
                    <Label arrow>{tr.get("blockView.content.beneficiary.reward.label")}</Label>
                    <EthValueBox wei={uncleReward} locale={locale}
                        symbol={ethSymbol} />
                    </>
                    : null }
                </LayoutRowItem>
            </LayoutRow>
            : null }
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("general.gasLimit")}</Label>
                    <NumberBox value={uncle.gasLimit} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.difficulty.label")}</Label>
                    <DifficultyBox
                        value={uncle.difficulty} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            { uncle.extraData ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.extraData.label")}</Label>
                    <DecodedHexData data={uncle.extraData} />
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { uncle.mixHash ?
            <LayoutRow>
                { uncle.mixHash ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.mixHash.label")}</Label>
                    <HashValueBox>{uncle.mixHash}</HashValueBox>
                </LayoutRowItem>
                : [] }
            </LayoutRow>
            : null }
        </>;
    }
}
