const request = require('phin')

class jeedomRequest {
  /**
   *
   * @param jeedomHost
   * @param apikey
   * @param reqParams
   * @param jsonrpc
   * @param uriJeedomApi
   */
  constructor (jeedomHost, apikey, reqParams = {}, jsonrpc = '2.0', uriJeedomApi = '/core/api/jeeApi.php') {
    this.url = jeedomHost + uriJeedomApi
    this.apikey = apikey
    this.reqParams = reqParams
    this.jsonrpc = jsonrpc
  }

  /**
   *
   * @param method
   * @param paramsCustom
   * @returns {{method: *, jsonrpc: string, params: *}}
   * @private
   */
  _getBody (method, paramsCustom = false) {
    let params = {
      apikey: this.apikey
    }
    if (paramsCustom) {
      params = { ...params, ...paramsCustom }
    }
    return {
      jsonrpc: this.jsonrpc,
      method: method,
      params: params
    }
  }

  /**
   *
   * @param body
   */
  jeedomRequest (body) {
    return request({
      url: this.url,
      method: 'POST',
      data: body,
      parse: 'json',
      core: this.reqParams
    })
  }

  /**
   *
   * @param cmd
   * @param params
   * @returns {Promise<{result: *, statusMessage: *, statusCode: *}>}
   * @private
   */
  async _getResult (cmd, params) {
    const body = this._getBody(cmd, params)
    try {
      const res = await this.jeedomRequest(body)
      const { statusCode, statusMessage, body: { result = false, error = false } } = res
      if (statusCode >= 200 && statusCode < 300) {
        const finalResult = (result && result.value) === '' ? true : result
        return { statusCode, statusMessage, result: finalResult, error }
      } else {
        throw new Error("jeedom-request-jsonrpc Server error")
      }
    } catch (e) {
      console.error("jeedom-request-jsonrpc Error : ", e)
    }
  }

  /**
   *
   * @param mcd
   * @param params
   * @returns {Promise<{result: *, statusMessage: *, statusCode: *}>}
   */
  run (mcd, params = {}) {
    return this._getResult(mcd, params)
  }
}

/**
 *
 * @type {{apiJeedom: *}}
 */
module.exports = {
  apiJeedom: jeedomRequest
}
