import base from "../config/configData";
import { parseNumber } from "./parseNumber";

let configItems = base;

class configHandler {
    configItems: any = {};
    constructor(configItems) {
        this.configItems = {};
        for (let key in configItems) {
            let value = configItems[key];
            this.add(key, value);
        }
    }

    add(key: string, value: any) {
        this.configItems[key.toLowerCase()] = value;
    }

    get(key: string, def: any = null): any {
        if (this.configItems != null) {
            key = key.toLowerCase();
            return this.configItems[key] ?? def;
        }
        return def;
    }
    getNumber(key: string, def: number = null): any {
        return parseNumber(this.get(key, def));
    }

    getAll() {
        return this.configItems;
    }
}

export const ApplicationConfig = new configHandler(configItems);

