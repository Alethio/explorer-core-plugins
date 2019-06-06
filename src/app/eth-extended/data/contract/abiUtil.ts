import { AbiFunctionStateMutability } from "app/eth-extended/data/contract/IAbi";
import { IAbiFunction } from "app/eth-extended/data/contract/IAbiFunction";

function canBeCalledAutomatically(abiFn: IAbiFunction) {
    return abiFn.inputs.length === 0;
}
function isRead(abiFn: IAbiFunction) {
    if (
        abiFn.stateMutability &&
        (
            abiFn.stateMutability === AbiFunctionStateMutability.View ||
            abiFn.stateMutability === AbiFunctionStateMutability.Pure
        )
    ) {
        return true;
    }
    /**
     * constant is deprecated, if we cannot find "stateMutability" try to read "constant"
     */
    if (abiFn.constant) {
        return true;
    }
    return false;
}

export const abiUtil = {
    method: {
        canBeCalledAutomatically,
        isRead
    }
};
