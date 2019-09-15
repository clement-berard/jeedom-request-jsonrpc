const { apiJeedom: ApiJeedomClass } = require('../lib/jeedom-request-jsonrpc.js')

const getJeedomInstance = () => new ApiJeedomClass('http://url.com', 'mykey')

const goodParams = {
  cmd: "cmd::byId",
  params: {
    id: "634"
  }
}

const goodResultApi = {
  statusCode: 200,
  statusMessage: "OK",
  body: {
    jsonrpc: "2.0",
    id: 99999,
    result: {
      id: "634",
      logicalId: "temperature",
      generic_type: "TEMPERATURE",
      eqType: "xiaomihome",
      name: "Température",
      order: "0",
      type: "info",
      subType: "numeric",
      eqLogic_id: "59",
      isHistorized: "1",
      unite: "°C",
      configuration: {
        logicalId: "temperature",
        minValue: "",
        maxValue: "",
        customValuesStatelessAllinone: "0",
        SINGLE: "0",
        DOUBLE: "1",
        LONG: "2",
        customValuesStateless: "0",
        BUTTON: "0"
      },
      template: {
        dashboard: "line",
        mobile: "line"
      },
      display: {
        icon: "<i class=\"fa fa-thermometer-empty\"></i>",
        generic_type: "",
        graphDerive: "0",
        graphStep: "0"
      },
      value: null,
      isVisible: "1",
      alert: [

      ],
      currentValue: 23.28
    }
  }
}

const goodResultApi2 = {
  statusCode: 200,
  statusMessage: "OK",
  body: {
    jsonrpc: "2.0",
    id: 99999,
    result: {
      value: ''
    }
  }
}

const goodResult = {
  statusCode: 200,
  statusMessage: "OK",
  result: {
    id: "634",
    logicalId: "temperature",
    generic_type: "TEMPERATURE",
    eqType: "xiaomihome",
    name: "Température",
    order: "0",
    type: "info",
    subType: "numeric",
    eqLogic_id: "59",
    isHistorized: "1",
    unite: "°C",
    configuration: {
      logicalId: "temperature",
      minValue: "",
      maxValue: "",
      customValuesStatelessAllinone: "0",
      SINGLE: "0",
      DOUBLE: "1",
      LONG: "2",
      customValuesStateless: "0",
      BUTTON: "0"
    },
    template: {
      dashboard: "line",
      mobile: "line"
    },
    display: {
      icon: "<i class=\"fa fa-thermometer-empty\"></i>",
      generic_type: "",
      graphDerive: "0",
      graphStep: "0"
    },
    value: null,
    isVisible: "1",
    alert: [],
    currentValue: 23.28
  },
  error: false
}

it('constructor', () => {
  const jeedomInstance = getJeedomInstance()
  expect(jeedomInstance).toBeInstanceOf(ApiJeedomClass)
  expect(jeedomInstance.url).toBe('http://url.com/core/api/jeeApi.php')
  expect(jeedomInstance.apikey).toBe('mykey')
})

it('_getBody', () => {
  const jeedomInstance = getJeedomInstance()
  const expected = { jsonrpc: '2.0', method: 'POST', params: { apikey: 'mykey' } }
  expect(jeedomInstance._getBody('POST')).toEqual(expected)
})

it('run', () => {
  const jeedomInstance = getJeedomInstance()
  const expected = { jsonrpc: '2.0', method: 'POST', params: { apikey: 'mykey' } }
  expect(jeedomInstance._getBody('POST')).toEqual(expected)
})

describe('run function', () => {
  it('cmd exist with a value', async () => {
    const jeedomInstance = getJeedomInstance()
    const spy = jest.spyOn(jeedomInstance, 'jeedomRequest').mockImplementation(() => goodResultApi)
    const { cmd, params } = goodParams
    const result = await jeedomInstance.run(cmd, params)
    expect(result).toEqual(goodResult)
    spy.mockRestore()
  })

  it('cmd exist without a value', async () => {
    const jeedomInstance = getJeedomInstance()
    const spy = jest.spyOn(jeedomInstance, 'jeedomRequest').mockImplementation(() => goodResultApi2)
    const { cmd, params } = goodParams
    const result = await jeedomInstance.run(cmd, params)
    expect(result).toEqual({ statusCode: 200, statusMessage: "OK", result: true, error: false })
    spy.mockRestore()
  })

  it('request failed with error server', async () => {
    const jeedomInstance = getJeedomInstance()
    const spy = jest.spyOn(jeedomInstance, 'jeedomRequest').mockImplementation(() => ({ statusCode: 500, statusMessage: 'NOK', body: {} }))
    const { cmd, params } = goodParams
    await expect(jeedomInstance.run(cmd, params)).rejects.toThrowError()
    spy.mockRestore()
  })
})
