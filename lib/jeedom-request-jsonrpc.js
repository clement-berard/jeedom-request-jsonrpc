const axios = require('axios')

class jeedomRequest {

    constructor(url, apikey, reqParams = {}, jsonrpc = '2.0') {
        this.url = url
        this.apikey = apikey
        this.reqParams = reqParams
        this.jsonrpc = jsonrpc
      }

      getBody(method, paramsCustom = false) {
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

        getBaseUrl () {
            return this.url
        }

        getResult(body){
            let reqParamsToSend = {...{}, ...this.reqParams}
            return axios.post(this.url, body, reqParamsToSend)
        }

      messageAll()  {
        let cmd = 'message::all'
        return this.getResult(this.getBody(cmd))
    }

}

module.exports = jeedomRequest;