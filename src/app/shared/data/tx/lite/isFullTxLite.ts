import { ITxLiteFull } from "app/shared/data/tx/lite/ITxLiteFull";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";

export function isFullTxLite(txLite: ITxLite): txLite is ITxLiteFull {
    return (txLite as ITxLiteFull).type !== undefined;
}
