import React from "react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { IPageDef } from "plugin-api/IPageDef";
import { UnclePageSlotType } from "app/shared/page/uncle/UnclePageSlotType";
import { UnclePageTemplate } from "app/shared/page/uncle/component/UnclePageTemplate";
import { uncleByIndexContextType } from "app/eth-lite/context/uncleByIndexContextType";
import { IUncleByBlockContext } from "app/eth-lite/context/IUncleByBlockContext";

export const unclePage: IPageDef<UnclePageSlotType, IUncleByBlockContext> = {
    contextType: uncleByIndexContextType,
    paths: {
        "/block/:blockNumber(\\d+)/uncle/:uncleIndex(\\d+)": params => ({
            blockNumber: Number(params.blockNumber),
            uncleIndex: Number(params.uncleIndex)
        })
    },
    buildCanonicalUrl: ({ blockNumber, uncleIndex }) => `/block/${blockNumber}/uncle/${uncleIndex}`,
    hasSidebar: true,
    getPageTemplate: () => UnclePageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("uncleView.content.noData.text") }} />
        </ErrorBox>;
    }
};
