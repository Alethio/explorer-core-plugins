import { IPageDef } from "plugin-api/IPageDef";
import { DashboardPageTemplate } from "./DashboardPageTemplate";

export enum DashboardPageSlotType {
    Content = "content"
}

export const dashboardPage: IPageDef<DashboardPageSlotType, {}> = {
    contextType: {},
    paths: {
        "/": () => ({})
    },
    getPageTemplate: () => DashboardPageTemplate
};
