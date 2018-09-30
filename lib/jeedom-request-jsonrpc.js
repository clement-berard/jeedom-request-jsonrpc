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
  constructor (url, apikey, reqParams = {}, options = {}, jsonrpc = '2.0') {
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
  _getBody (method, paramsCustom = false) {
    let params = {
      "apikey": this.apikey
    }
    if (paramsCustom) {
      params = { ...params, ...paramsCustom }
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
     * @returns {Promise<any | SVGAnimatedString>}
     * @private
     */
  async _getResult (cmd, params) {
    let body = this._getBody(cmd, params)
    let paramId = (params.id) ? params.id : 'no id'
    let reqParamsToSend = { ...{}, ...this.reqParams }
    try {
      let res = await axios.post(this.url, body, reqParamsToSend)
      let { status, statusText, data: { result } } = res
      if (!result) {
        switch (this.getCmdPrefix(cmd)) {
          case 'scenario':
            throw new Error(`No scenario with id ${paramId} or state is not valid`)
          default:
            throw new Error('No scenario with id')
        }
      }
      result = result.value === '' ? true : result
      return { status, statusText, result }
    } catch (e) {
      let status = e.response ? e.response.status : 'no status'
      let statusText = e.response ? e.response.statusText : 'no status text'
      throw new Error(`jeedom-request-jsonrpc Error : ${status} ${statusText} 
      \n for ${this.url} 
      \n body : ${JSON.stringify(body)} 
      \n reqParamsToSend : ${JSON.stringify(reqParamsToSend)} \n`)
    }
  }

  /**
     * run jeedom api command
     * @param mcd
     * @param params
     * @returns {*}
     */
  run (mcd, params = {}) {
    return this._getResult(mcd, params)
  }

  getCmdPrefix (cmd) {
    return cmd.split("::")[0]
  }
}

const SCENARIOS_STATES = {
  RUN: 'run',
  STOP: 'stop',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

module.exports = {
  apiJeedom: jeedomRequest,
  scenarioStates: SCENARIOS_STATES
}
