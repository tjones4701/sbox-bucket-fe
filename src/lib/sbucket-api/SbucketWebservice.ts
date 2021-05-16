
import { Authentication } from "../authentication";
import { ApplicationConfig } from "../config";
import { RestfulWebservice } from "../webservices/RestfulWebservice";
import { WebserviceError, WebserviceResponse } from "../webservices/Webservice";
import { SbucketApiCodes, SbucketApiConfigurations } from "./apiCodes";

for (let i in SbucketApiConfigurations) {
    ApplicationConfig.add(i, SbucketApiConfigurations[i]);
}

export class SbucketWebserviceResponse {
    request = null;
    wasCached = false;
    constructor(request, wasCached = false) {
        this.request = request;
        this.wasCached = wasCached;
    }
    getResponse() { }

    getData() {
        return this.request?.data?.data;
    }
}


export class SbucketWebservice extends RestfulWebservice {
    bearer = null;
    apiCode;
    apiData: any = {};
    isMocking = false;
    apiEndpoint: string = null;

    constructor(apiCode: string, options = null) {
        super(null, options);
        let endpointUrl = ApplicationConfig.get("ENDPOINTS.SBUCKET");
        let apiData = ApplicationConfig.get(`APIS.SBUCKET.${apiCode}`);
        this.apiData = apiData;
        let apiUrl = `/v${apiData?.version ?? 1}/${apiData.url}`;

        this.url = endpointUrl + apiUrl;
    }

    async getBearer() {
        return Authentication.getJwt();
    }

    async getConfig(config) {
        if (config == null) {
            config = {};
        }
        if (config.headers == null) {
            config.headers = {};
        }
        if (config?.headers?.auth == null) {
            config.headers.auth = await this.getBearer();
        }

        if (config.timeout == null) {
            let timeout = this.apiData?.timeout;
            if (timeout != null) {
                config.timeout = timeout;
            }
        }

        return config;
    }

    buildUrl(params = null) {
        let url = this.getUrl();
        let paramsString = null;
        if (params != null) {
            for (let [key, value] of Object.entries(params)) {
                let param = ":" + key;
                if (url.includes(param)) {
                    url = url.replace(param, value);
                    delete params[key];
                }
            }
            if (Object.keys(params).length > 0) {
                paramsString = super.toQuery(params);
                url += "?" + paramsString;
            }
        }

        return url;
    }

    async postRequest(
        data, wasCached
    ) {
        return new SbucketWebserviceResponse(data, wasCached);
    }

    async postRequestError(
        status, request
    ) {
        let code = request?.data?.error?.error;
        let message = request?.data?.error?.description;
        return new WebserviceError(status, code, message);
    }

    async get(
        params: any = null,
        config: any = null
    ): Promise<SbucketWebserviceResponse> {
        let url = this.buildUrl(params);
        try {
            return await this.request(
                "get",
                url,
                params,
                await this.getConfig(config)
            );
        } catch (e) {
            try {
                let error: WebserviceError = e;
                if (error.status === 401) {
                    return new WebserviceResponse(null, false);
                } else {
                    throw e;
                }
            } catch (secondE) {
                throw new WebserviceError(
                    null,
                    "ERROR_HANDLER_ERROR",
                    "Error handling the error handler",
                    secondE
                );
            }
        }
    }
}

export function Sbucket(apiCode: SbucketApiCodes) {
    let ws = new SbucketWebservice(apiCode);
    return ws;
}