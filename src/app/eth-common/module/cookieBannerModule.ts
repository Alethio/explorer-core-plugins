import { IModuleDef } from "plugin-api/IModuleDef";
import { ICookieBannerProps, CookieBanner } from "@alethio/explorer-ui/lib/cookieBanner/CookieBanner";
import { CookieBannerState } from "@alethio/explorer-ui/lib/cookieBanner/CookieBannerState";

export const cookieBannerModule: (state: CookieBannerState) => IModuleDef<ICookieBannerProps, {}, void> = state => ({
    contextType: {},
    dataAdapters: [],

    getContentComponent() {
        return Promise.resolve(CookieBanner);
    },

    getContentProps({ translation: tr }) {
        let props: ICookieBannerProps = {
            translations: {
                title: tr.get("cookieBanner.label"),
                text: tr.get("cookieBanner.text"),
                accept: tr.get("cookieBanner.accept"),
                moreInfo: tr.get("cookieBanner.moreInfo")
            },
            state
        };
        return props;
    }
});
