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
        this._setOption(options)
    }

    /**
     *
     * @param opt
     * @private
     */
    _setOption(opt = {}) {
        this.directRealData = (typeof opt['directRealData'] !== "undefined") ? opt['directRealData'] : true
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

    ping(params = {}) {
        return this._getResult('ping', params)
    }

    version(params = {}) {
        return this._getResult('version', params)
    }

    datetime(params = {}) {
        return this._getResult('datetime', params)
    }

    // 2) API config

    config_byKey(params = {}) {
        return this._getResult('config::byKey', params)
    }

    config_save(params = {}) {
        return this._getResult('config::save', params)
    }

    // API JSON Cmd
    cmd_all(params = {}) {
        return this._getResult('cmd::all', params)
    }

    cmd_byId(params = {}) {
        return this._getResult('cmd::byId', params)
    }

    cmd_byEqLogicId(params = {}) {
        return this._getResult('cmd::byEqLogicId', params)
    }

    cmd_execCmd(params = {}) {
        return this._getResult('cmd::execCmd', params)
    }

    cmd_getStatistique(params = {}) {
        return this._getResult('cmd::getStatistique', params)
    }

    cmd_getTendance(params = {}) {
        return this._getResult('cmd::getTendance', params)
    }

    cmd_getHistory(params = {}) {
        return this._getResult('cmd::getHistory', params)
    }

    cmd_save(params = {}) {
        return this._getResult('cmd::save', params)
    }

    // API JSON Message

    messageAll(p = {}) {
        let cmd = 'message::all'
        return this._getResult(cmd, p)
    }

}

module.exports = jeedomRequest;