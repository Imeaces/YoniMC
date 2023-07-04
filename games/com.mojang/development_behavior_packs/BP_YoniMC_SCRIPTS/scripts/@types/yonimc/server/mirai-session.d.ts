export class MiraiSession {
    static logger: Logger;
    static decodeResponse(httpResponse: any): any;
    static performHttpRequest(httpRequest: any, retryCount?: number): Promise<MojangNet.HttpResponse>;
    constructor(apiUrl: any, apiKey?: string, botQQNumber?: null);
    timeoutDelay: number;
    botQQNumber: null;
    API_URL: any;
    sendGroupMessage(groupId: any, message: any): Promise<Object>;
    /**
     * @param {string} url
     * @param {{[key]: any}} contents
     * @param {Array<{[key]: any}>} headers
     * @returns {Promise<Object>}
     */
    post(url: string, contents?: {
        [key]: any;
    }, headers?: Array<{
        [key]: any;
    }>, retryCount?: number): Promise<Object>;
    /**
     * @param {string} url
     * @param {{[key]: any}} args
     * @param {Array<{[key]: any}>} headers
     */
    get(url: string, args?: {
        [key]: any;
    }, headers?: Array<{
        [key]: any;
    }>, retryCount?: number): Promise<any>;
    refreshSession(botQQNumber?: null, retryCount?: number): Promise<any>;
    sessionLastUpdateTime: number;
    sessionUpdateDelay: number;
    /**
     * @param {boolean} force
     * @param {number} retryCount
     */
    getSession(force?: boolean, retryCount?: number): any;
    #private;
}
import { Logger } from "yoni-mcscripts-lib/@types/yoni-mcscripts-lib/yoni/index.js";
import { MojangNet } from "./basis.js";
