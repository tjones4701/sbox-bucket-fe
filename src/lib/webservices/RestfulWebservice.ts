import { replaceString } from "../common/replaceString";
import appStore from "../localStore";
import { Webservice, WebserviceResponse } from "./Webservice";

export class RestfulWebservice extends Webservice {
    url = null;
    cacheDuration = null;

    constructor(url: string, options: any = null) {
        super();
        this.setOptions(url, options);
    }

    setOptions(url: any, options: any) {
        if (url != null) {
            if (options?.useConfig ?? true) {
                this.url = appStore.get(url);
            } else {
                this.url = url;
            }
        } else {
            this.url = null;
        }
    }

    getUrl() {
        return this.url;
    }

    buildUrl(params = null) {
        let url = this.getUrl();
        return super.buildUrl(url, params);
    }

    replaceUrlParams(url, params) {
        for (let i in params) {
            let key = `:${i}`;
            url = replaceString(url, key, params[i]);
        }
        return url;
    }

    async getConfig(config) {
        return config;
    }

    async get(
        params: any = null,
        config: any = null
    ): Promise<WebserviceResponse> {
        let url = this.buildUrl(params);
        return this.request("get", url, params, await this.getConfig(config));
    }
    async post(
        data: any = null,
        config: any = null
    ): Promise<WebserviceResponse> {
        return this.request(
            "post",
            this.replaceUrlParams(this.getUrl(), data),
            data,
            await this.getConfig(config)
        );
    }
    async patch(
        data: any = null,
        config: any = null
    ): Promise<WebserviceResponse> {
        return this.request(
            "patch",
            this.replaceUrlParams(this.getUrl(), data),
            data,
            await this.getConfig(config)
        );
    }

    async save(
        data: any = null,
        config: any = null
    ): Promise<WebserviceResponse> {
        if (data.id != null) {
            this.url = this.url + '/' + data.id;
            delete data.id;
            return this.patch(data, config);
        } else {
            return this.post(data, config);
        }
    }
}
