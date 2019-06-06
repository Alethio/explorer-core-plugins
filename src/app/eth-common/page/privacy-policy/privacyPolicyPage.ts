import { IPageDef } from "plugin-api/IPageDef";

export const privacyPolicyPage: IPageDef<string, {}> = {
    contextType: {},
    paths: {
        "/privacy-policy": params => ({})
    },
    isPrivacyPolicy: true,
    hasSidebar: true,
    getPageTemplate: () => import("./component/PrivacyPolicyTemplate")
        .then(({ PrivacyPolicyTemplate }) => PrivacyPolicyTemplate),
    buildCanonicalUrl: () => `/privacy-policy`
};
