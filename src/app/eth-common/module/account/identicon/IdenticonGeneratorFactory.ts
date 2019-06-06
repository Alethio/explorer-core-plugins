import { FifoCache } from "app/util/cache/FifoCache";
import { IdenticonGenerator } from "./IdenticonGenerator";
import { IdenticonProxy } from "./IdenticonProxy";

/** Number of cached identicons */
const CACHE_SIZE = 50;

export class IdenticonGeneratorFactory {
    create() {
        return new IdenticonGenerator(
            new FifoCache<string, IdenticonProxy>(CACHE_SIZE)
        );
    }
}
