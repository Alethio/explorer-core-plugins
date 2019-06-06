import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { Hash } from "@alethio/ui/lib/data/Hash";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { GridLink } from "@alethio/explorer-ui/lib/grid/GridLink";

export class CmLinkRenderer<T> implements IGridFieldRenderer<ICmLite> {
    render(f: ICmLite) {
        return (
            <GridLink to={
                `page://aleth.io/cm?txHash=${f.originatorTxHash}&validationIndex=${f.txValidationIndex}`
            }>
                <Hash>{`${f.originatorTxHash}_${f.txValidationIndex}`}</Hash>
            </GridLink>
        );
    }
}
