const BEGIN_MARKER = "a165";
const END_MARKER = "0029";
const SWARM_SOURCE_LENGTH = 86;

export function removeSwarmSourceFromByteCode(byteCode: string) {
    /**
     * Extract last chars where the swarmsource should be located
     */
    let swarmSource = byteCode.substring(byteCode.length - SWARM_SOURCE_LENGTH);
    /**
     * Validate if it is a real swarmsource
     */
    if (validateSwarmSource(swarmSource)) {
        /**
         * RETURN the bytecode without the swarm
         */
        return byteCode.substring(0, byteCode.length - SWARM_SOURCE_LENGTH);
    } else {
        /**
         * Otherwise return the original string
         */
        return byteCode;
    }
}

function validateSwarmSource(swarmSource: string) {
    if (swarmSource.length !== SWARM_SOURCE_LENGTH) {
        return false;
    }
    if (swarmSource.substring(0, BEGIN_MARKER.length) !== BEGIN_MARKER) {
        return false;
    }
    if (swarmSource.substring(swarmSource.length - END_MARKER.length) !== END_MARKER) {
        return false;
    }
    return true;
}
