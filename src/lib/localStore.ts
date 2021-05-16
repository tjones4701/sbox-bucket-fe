import { Logger } from "./logger";


class StorageItem {
    value: any;
    key: string;
    expiry: number;
    localStore: LocalStore;

    constructor(
        localStore: LocalStore,
        key: string,
        value: any,
        expiry = null
    ) {
        this.localStore = localStore;
        this.key = key;
        this.value = value;
        this.expiry = expiry;
    }

    setLocalStore(store: LocalStore): void {
        this.localStore = store;
    }

    getLocalStore() {
        return this.localStore;
    }

    getValue(def: any, ignoreExpired: boolean = false): any {
        if (!ignoreExpired && this.isExpired()) {
            return def;
        }
        if (this.value == null) {
            return def;
        }
        return this.value;
    }
    setValue(value: any, newExpiry: number, save: boolean = true): StorageItem {
        this.value = value;
        if (newExpiry != null) {
            this.setExpiry(newExpiry, false);
        }
        if (save) {
            this.save();
        }

        return this;
    }

    getKey(): string {
        return this.key;
    }
    setKey(key: string): StorageItem {
        this.key = key;
        return this;
    }

    getExpiry(): number {
        return this.expiry;
    }

    setExpiry(expiry: number, save: boolean = true): StorageItem {
        let currentTime = new Date().getTime();
        this.expiry = currentTime + expiry;
        if (save) {
            this.save();
        }
        return this;
    }

    isExpired() {
        let currentTime = new Date().getTime();
        if (this.expiry == null) {
            return false;
        }
        return this.expiry <= currentTime;
    }

    update(key: string, value: any, expiry: number) {
        this.setKey(key);
        this.setValue(value, expiry, true);
    }

    serialize() {
        let jsonObject = {
            value: this.value,
            expiry: this.expiry,
        };

        return JSON.stringify(jsonObject);
    }

    save() {
        if (this.localStore != null) {
            this.localStore.saveStorageItem(this);
        } else {
            throw "No Local Store Set for StorageItem";
        }
    }
}

export class LocalStore {
    prefix: string = "app";
    encryptFunction: (value: any) => any;

    constructor(
        prefix,
        options = {
            encryptFunction: null,
        }
    ) {
        this.encryptFunction = options?.encryptFunction;
        this.prefix = prefix;
    }

    getPrefix(): string {
        if (this.prefix == null) {
            return "app";
        }
        return this.prefix;
    }
    setPrefix(prefix: string): LocalStore {
        this.prefix = prefix;
        return this;
    }

    generateKey(key: string): string {
        return this.prefix + "_" + key;
    }

    get(key, def = null): any {
        try {
            let storageItem = this.getStorageItem(key);
            if (storageItem != null) {
                return storageItem.getValue(def);
            }
        } catch (e) {
            Logger.error(e);
        }
        return def;
    }

    isLocalStorageItem(key): boolean {
        try {
            let item = localStorage.getItem(this.generateKey(key));
            if (item != null) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    getStorageItem(key: string): StorageItem {
        let localStoreKey = this.generateKey(key);
        try {
            let val = JSON.parse(localStorage.getItem(localStoreKey));
            return new StorageItem(this, key, val.value, val.expiry);
        } catch (e) { }
        return null;
    }

    saveStorageItem(storageItem: StorageItem) {
        try {
            let data: string = storageItem.serialize();
            let key = this.generateKey(storageItem.getKey());
            storageItem.setLocalStore(this);
            localStorage.setItem(key, data);
            return storageItem;
        } catch (e) {
            return null;
        }
    }

    getCurrentTime(): number {
        let d = new Date();
        return d.getTime();
    }

    isExpired(key: string | StorageItem): boolean {
        let storageItem: StorageItem = null;
        if (!(key instanceof StorageItem)) {
            storageItem = this.getStorageItem(key);
        }

        if (storageItem == null) {
            throw "No storage item found";
        }

        return storageItem.isExpired();
    }

    getTimeUntilExpiry(key: string): number {
        let now = new Date().getTime();

        let expiry = this.getExpiry(key);
        if (expiry != null) {
            return expiry - now;
        }
        return null;
    }

    getExpiry(key: string): number {
        let storageItem = this.getStorageItem(key);
        if (storageItem != null) {
            return storageItem.expiry;
        } else {
            return null;
        }
    }

    createStorageItem(
        key: string,
        value: any,
        expiry: number = null
    ): StorageItem {
        let storageItem = new StorageItem(this, key, value, expiry);
        storageItem.save();
        return storageItem;
    }

    set(key: string, value: any, expiry: number = null): StorageItem {
        let storageItem = this.getStorageItem(key);
        if (storageItem == null) {
            storageItem = this.createStorageItem(key, value, expiry);
        }
        storageItem.update(key, value, expiry);
        return storageItem;
    }

    clearAll() {
        let items = this.getAllStorageItemKeys();
        for (let index in items) {
            this.clear(items[index]);
        }
    }

    clear(key: string): void {
        try {
            let localStoreKey = this.generateKey(key);
            localStorage.removeItem(localStoreKey);
        } catch (e) { }
    }

    getAllStorageItemKeys(): string[] {
        try {
            let keys = Object.keys(localStorage);
            let prefix = this.getPrefix() + "_";
            let itemKeys = [];
            for (let index in keys) {
                let itemKey = keys[index];
                if (itemKey.startsWith(prefix)) {
                    itemKey = itemKey.substr(prefix.length);
                    itemKeys.push(itemKey);
                }
            }

            return itemKeys;
        } catch (e) {
            return [];
        }
    }

    getAll() {
        let keys = this.getAllStorageItemKeys();
        let values = {};
        for (let index in keys) {
            let itemKey = keys[index];
            try {
                let val = this.get(itemKey);
                values[itemKey] = val;
            } catch (e) { }
        }
        return values;
    }

    getAllStorageItems() {
        let keys = this.getAllStorageItemKeys();
        let storageItems = {};
        for (let index in keys) {
            let itemKey = keys[index];

            try {
                let storageItem = this.getStorageItem(itemKey);
                if (storageItem != null) {
                    storageItems[storageItem.getKey()] = storageItem;
                }
            } catch (e) { }
        }

        return storageItems;
    }
    encrypt(value) {
        return value;
    }
}

const appStore = new LocalStore("app");
export default appStore;
