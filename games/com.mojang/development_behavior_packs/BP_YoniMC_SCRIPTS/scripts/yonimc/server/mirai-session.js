import { MojangNet } from "./basis.js";
import { Logger } from "yoni-mcscripts-lib";
const { HttpRequest, http, HttpHeader } = MojangNet;
export class MiraiSession {
    static logger = new Logger("MiraiSession");
    timeoutDelay = 5;
    botQQNumber = null;
    API_URL;
    #API_KEY;
    #sessionKey;
    constructor(apiUrl, apiKey = "", botQQNumber = null) {
        this.API_URL = apiUrl;
        this.#API_KEY = apiKey;
        if (botQQNumber != null) {
            this.botQQNumber = botQQNumber;
            this.refreshSession();
        }
    }
    async sendGroupMessage(groupId, message) {
        if (message == null || message.trim() == "")
            throw new Error("empty message");
        let body = {
            target: groupId,
            messageChain: [
                {
                    type: "Plain",
                    text: `${message}`
                }
            ]
        };
        let headers = { "Content-Type": "application/json" };
        return await this.post("/sendGroupMessage", body, headers);
    }
    /**
     * @param {string} url
     * @param {{[key]: any}} contents
     * @param {Array<{[key]: any}>} headers
     * @returns {Promise<Object>}
     */
    async post(url, contents = {}, headers = {}, retryCount = 2) {
        MiraiSession.logger.trace("new request, type: POST, retryCount: {}", retryCount);
        url = `${this.API_URL}/${url}`;
        let error;
        do {
            let sessionKey;
            try {
                sessionKey = await this.getSession(error ? true : false);
            }
            catch (e) {
                error = e;
                continue;
            }
            MiraiSession.logger.trace("request url: {}, type: POST", url);
            let request = new HttpRequest(url)
                .setMethod("POST")
                .setTimeout(this.timeoutDelay)
                .setBody(JSON.stringify(Object.assign({ sessionKey }, contents)));
            MiraiSession.logger.trace("request url: {}, type: POST, contents: {}", url, JSON.stringify(contents));
            for (let headerKey in headers) {
                request.addHeader(headerKey, headers[headerKey]);
            }
            try {
                let response = await MiraiSession.performHttpRequest(request);
                return MiraiSession.decodeResponse(response);
            }
            catch (e) {
                error = e;
            }
        } while (retryCount-- > 0);
        MiraiSession.logger.error("failed to post request, reason: {}", error);
        throw Object.assign(new Error("failed to post request"), { cause: error });
    }
    /**
     * @param {string} url
     * @param {{[key]: any}} args
     * @param {Array<{[key]: any}>} headers
     */
    async get(url, args = {}, headers = {}, retryCount = 2) {
        MiraiSession.logger.trace("new request, type: GET, retryCount: {}", retryCount);
        url = `${this.API_URL}/${url}`;
        args = Object.entries(args);
        let error;
        do {
            let fullUrl = url;
            let requestArgs = Array.from(args);
            let sessionKey;
            try {
                sessionKey = await this.getSession(error ? true : false);
            }
            catch (e) {
                error = e;
                continue;
            }
            requestArgs.push(["sessionKey", sessionKey]);
            let isFirstArg = true;
            for (let kV of requestArgs) {
                if (isFirstArg) {
                    fullUrl += "?";
                    isFirstArg = false;
                }
                else {
                    fullUrl += "&";
                }
                fullUrl += `${encodeURIComponent(kV[0])}=${encodeURIComponent(kV[1])}`;
            }
            MiraiSession.logger.trace("request url: {}, type: GET", fullUrl);
            let request = new HttpRequest(fullUrl)
                .setMethod("GET")
                .setTimeout(this.timeoutDelay);
            for (let headerKey in headers) {
                request.addHeader(headerKey, headers[headerKey]);
            }
            try {
                let response = await MiraiSession.performHttpRequest(request);
                return MiraiSession.decodeResponse(response);
            }
            catch (e) {
                error = e;
            }
        } while (retryCount-- > 0);
        MiraiSession.logger.error("failed to get request, reason: {}", error);
        throw Object.assign(new Error("failed to get request"), { cause: error });
    }
    static decodeResponse(httpResponse) {
        if (!String(httpResponse.status).startsWith("2")) {
            throw new Error(`http response failed with ${httpResponse.status}`);
        }
        let body = httpResponse.body;
        if (body.trim() === "") {
            throw new Error("empty response body");
        }
        let rt = JSON.parse(body); //if is wrong JSON text, it throws;
        return rt;
    }
    static async performHttpRequest(httpRequest, retryCount = 0) {
        let error;
        do {
            try {
                let rt = await http.request(httpRequest);
                return rt;
            }
            catch (e) {
                error = e;
            }
        } while (retryCount-- >= 0);
        MiraiSession.logger.error("http request failed\ncause by: {}", error);
        throw Object.assign(new Error("http request failed"), { cause: error });
    }
    async refreshSession(botQQNumber = this.botQQNumber, retryCount = 2) {
        if (botQQNumber == null) {
            throw new Error("you must specific a botQQNumber for the new session");
        }
        try {
            MiraiSession.logger.trace("refresh session use apiKey: ******, qq: {}, retryCount: {}", botQQNumber, retryCount);
            //make a request 
            let verifyApiKeyRequest = new HttpRequest(this.API_URL + "/verify")
                .setMethod("POST")
                .setTimeout(this.timeoutDelay)
                .setBody(JSON.stringify({
                verifyKey: this.#API_KEY
            }));
            let verifyApiKeyResponse = await MiraiSession.performHttpRequest(verifyApiKeyRequest, retryCount);
            MiraiSession.logger.trace("request verify api done, decoding...");
            let verifyResult;
            try {
                verifyResult = MiraiSession.decodeResponse(verifyApiKeyResponse);
            }
            catch (e) {
                MiraiSession.logger.error("api verification failed, because:\n{}", e);
                return;
            }
            let unbindSessionKey = verifyResult.session;
            if (unbindSessionKey == null) {
                MiraiSession.logger.error("verify seems succeed, but didn't get a session key");
                return;
            }
            MiraiSession.logger.trace("got new sessionkey: {}, binding...", unbindSessionKey);
            let bindSessionRequest = new HttpRequest(this.API_URL + "/bind")
                .setMethod("POST")
                .setTimeout(this.timeoutDelay)
                .setBody(JSON.stringify({
                sessionKey: unbindSessionKey,
                qq: botQQNumber
            }));
            let bindSessionResponse = await MiraiSession.performHttpRequest(bindSessionRequest, retryCount);
            let bindSessionResult;
            try {
                bindSessionResult = MiraiSession.decodeResponse(bindSessionResponse);
            }
            catch (e) {
                MiraiSession.logger.error("unable to make sure that session has been bind to a bot, because:\n{}", e);
                return;
            }
            if (bindSessionResult.code === 0) {
                MiraiSession.logger.trace("bind qq {} for session {}", botQQNumber, unbindSessionKey);
                this.#sessionKey = unbindSessionKey;
                this.sessionLastUpdateTime = Date.now();
                return unbindSessionKey;
            }
        }
        catch (e) {
            MiraiSession.logger.error("unknown error occurred when refreshing session\n{}", e);
        }
    }
    sessionLastUpdateTime = 0;
    sessionUpdateDelay = 240000;
    /**
     * @param {boolean} force
     * @param {number} retryCount
     */
    async getSession(force = false, retryCount = 1) {
        MiraiSession.logger.trace("getting session, force: {}, retryCount: {}", force, retryCount);
        //if there is a sessionKey and doesn't set force flag, and the key has a valid time
        //return this cached sessionKey
        if (this.#sessionKey != null && !force
            && (Date.now() - this.sessionLastUpdateTime < this.sessionUpdateDelay)) {
            MiraiSession.logger.trace("getting session, use cached session: {}", this.#sessionKey);
            return this.#sessionKey;
        }
        //if didn't cache any session key, refresh it
        if (this.#sessionKey == null) {
            MiraiSession.logger.trace("no session, refresh()");
            try {
                await this.refreshSession();
            }
            catch (e) {
                MiraiSession.logger.error("failed to getting a session, reason:\n{}", e);
                throw Object.assign(new Error("failed to getting a session"), { cause: e });
            }
        }
        let error;
        let sessionKey = null;
        do {
            MiraiSession.logger.trace("update info for session: {}", this.#sessionKey);
            let getSessionInfoRequest = new HttpRequest(this.API_URL + "/sessionInfo?sessionKey=" + this.#sessionKey)
                .setMethod("GET")
                .setTimeout(this.timeoutDelay);
            let sessionInfoResponse = await MiraiSession.performHttpRequest(getSessionInfoRequest, retryCount);
            let sessionInfo;
            try {
                sessionInfo = MiraiSession.decodeResponse(sessionInfoResponse);
            }
            catch (e) {
                MiraiSession.logger.error("unable to check the session info, reason:\n{}", e);
                error = Object.assign(new Error("unable to check the session info"), { cause: e });
                continue;
            }
            if (sessionInfo.code === 0) {
                MiraiSession.logger.trace("success, session '{}' is fine", this.#sessionKey);
                this.sessionLastUpdateTime = Date.now();
                sessionKey = this.#sessionKey;
                break;
            }
            this.#sessionKey = null;
            MiraiSession.logger.trace("session is gone: session: {}, refreshing...", this.#sessionKey);
            return this.getSession();
        } while (retryCount-- > 0);
        if (sessionKey !== null) {
            MiraiSession.logger.trace("use session: {}", sessionKey);
            return sessionKey;
        }
        throw Object.assign(new Error("failed to getting a session"), { cause: error });
    }
}
