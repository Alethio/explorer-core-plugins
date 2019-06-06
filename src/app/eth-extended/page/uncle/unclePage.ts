import { IPageDef } from "plugin-api/IPageDef";
import { UnclePageSlotType } from "app/shared/page/uncle/UnclePageSlotType";
import { UnclePageTemplate } from "app/shared/page/uncle/component/UnclePageTemplate";
import { uncleByHashContextType } from "app/eth-extended/context/uncleByHashContextType";
import { IUncleByHashContext } from "app/eth-extended/context/IUncleByHashContext";

export const unclePage: IPageDef<UnclePageSlotType, IUncleByHashContext> = {
    contextType: uncleByHashContextType,
    paths: {
        "/uncle/:uncleHash([a-fA-F0-9]+)": params => `/uncle/0x${params.uncleHash}`,
        "/uncle/0x:uncleHash([a-fA-F0-9]+)": params => ({ uncleHash: params.uncleHash })
    },
    buildCanonicalUrl: ({ uncleHash }) => `/uncle/0x${uncleHash.replace(/^0x/, "")}`,
    hasSidebar: true,
    getPageTemplate: () => UnclePageTemplate
};
