const axios = require('axios')


class jeedomRequest {

    /**
     *
     * @param url
     * @param apikey
     * @param reqParams
     * @param options
     * @param jsonrpc
     */
    constructor(url, apikey, reqParams = {}, options = {}, jsonrpc = '2.0') {
        this.url = url
        this.apikey = apikey
        this.reqParams = reqParams
        this.jsonrpc = jsonrpc
    }

    /**
     *
     * @param method
     * @param paramsCustom
     * @returns {{jsonrpc: (string|*), method: *, params: {apikey: *}}}
     * @private
     */
    _getBody(method, paramsCustom = false) {
        let params = {
            "apikey": this.apikey
        }
        if (paramsCustom) {
            params = {...params, ...paramsCustom};
        }
        return {
            "jsonrpc": this.jsonrpc,
            "method": method,
            "params": params
        }
    }

    /**
     *
     * @param cmd
     * @param params
     * @returns {*}
     * @private
     */
    _getResult(cmd, params) {
        let body = this._getBody(cmd, params)
        let reqParamsToSend = {...{}, ...this.reqParams}
        return axios.post(this.url, body, reqParamsToSend)
    }

    // 1) Divers

    run(mcd, params = {}) {
        return this._getResult(mcd, params)
    }

    // all constant

    get scenario_state() {
        return {
            RUN: "run",
            STOP: "stop",
            ENABLE: "enable",
            DISABLE: "disable"
        }
    }

}

const CONSTANTS = {
    scenario_state: {
        RUN: "run",
        STOP: "stop",
        ENABLE: "enable",
        DISABLE: "disable"
    }
}


module.exports = {
    apiJeedom: jeedomRequest,
    constantsJeedom: CONSTANTS
};