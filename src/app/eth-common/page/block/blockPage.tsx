import React from "react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { IPageDef } from "plugin-api/IPageDef";
import { BlockPageSlotType } from "./BlockPageSlotType";
import { BlockPageTemplate } from "./component/BlockPageTemplate";
import { latestBlockContext } from "app/eth-common/context/latestBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";
import { IBlockContext } from "app/shared/context/IBlockContext";

export const blockPage: IPageDef<BlockPageSlotType, IBlockContext> = {
    contextType: blockContextType,
    paths: {
        "/Block_:blockId": params => `/block/${params.blockId}`,
        "/block/latest": latestBlockContext,
        "/block/:blockId(\\d+)": params => ({
            blockNumber: parseInt(params.blockId, 10)
        })
    },
    buildCanonicalUrl: ({ blockNumber }) => `/block/${blockNumber}`,
    hasSidebar: true,
    getPageTemplate: () => BlockPageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("blockView.content.noData.text") }} />
        </ErrorBox>;
    }
};
