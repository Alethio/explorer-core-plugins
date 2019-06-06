import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { Hash } from "@alethio/ui/lib/data/Hash";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { GridLink } from "@alethio/explorer-ui/lib/grid/GridLink";

export class CmParentLinkRenderer<T> implements IGridFieldRenderer<ICmLite> {
    render(f: ICmLite) {
        return (
            f.parentTxValidationIndex > 0 ?
                <GridLink to={
                    `page://aleth.io/cm?txHash=${f.originatorTxHash}&validationIndex=${f.parentTxValidationIndex}`
                }>
                    <Hash>{`${f.originatorTxHash}_${f.parentTxValidationIndex}`}</Hash>
                </GridLink>
                :
                <GridLink to={`page://aleth.io/tx?txHash=${f.originatorTxHash}`} >
                    <Hash>{`${f.originatorTxHash}`}</Hash>
                </GridLink>
        );
    }
}
