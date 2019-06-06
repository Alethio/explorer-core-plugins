import { ICache } from "app/util/cache/ICache";

export interface IKeyValueStoreApi<K, V> {
    fetch(key: K): Promise<V>;
}

export class KeyValueStore<K, V> {
    constructor(
        private cache: ICache<K, V>,
        private api: IKeyValueStoreApi<K, V>
    ) {

    }

    async fetch(key: K) {
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        let data = await this.api.fetch(key);
        this.cache.set(key, data);

        return data;
    }
}
