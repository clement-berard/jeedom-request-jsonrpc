<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img width="100"src="https://i2.wp.com/poneynumerique.fr/wp-content/uploads/2015/08/jeedom.png">
     <img width="100"src="https://image.flaticon.com/icons/png/512/460/460989.png">
  </a>
</p>

<h1 align="center">Welcome to jeedom-request-jsonrpc 👋</h1>
<p align="center">
  Jeedom API - JSON RPC 2.0 for NodeJs
</p>

<p align="center">  
    <a href="https://www.npmjs.com/package/jeedom-request-jsonrpc">
        <img src="https://img.shields.io/npm/v/jeedom-request-jsonrpc.svg" alt="Coverage">
    </a>
    <a href="https://www.npmjs.com/package/jeedom-request-jsonrpc">
        <img src="https://img.shields.io/npm/dw/jeedom-request-jsonrpc.svg" alt="Coverage">
    </a>
    <a href="https://travis-ci.org/clement-berard/jeedom-request-jsonrpc">
            <img src="https://img.shields.io/travis/clement-berard/jeedom-request-jsonrpc" alt="Coverage">
    </a>
</p>

## Overview

[![Greenkeeper badge](https://badges.greenkeeper.io/clement-berard/jeedom-request-jsonrpc.svg)](https://greenkeeper.io/)

Node module to calls Jeedom's RPC API : https://jeedom.github.io/core/fr_FR/jsonrpc_api

This module uses phin for request (https://github.com/ethanent/phin)

## Install

- `npm i jeedom-request-jsonrpc --save`
- `yarn add jeedom-request-jsonrpc`

## Get Started

Import package: 

```javascript
const { apiJeedom } = require('jeedom-request-jsonrpc')
```

Instanciate: 

```javascript
const apiJeedomRunnable = new apiJeedom(
    'jeedom-hostname-or-ip',
    'my-api-key'
)
```

Details of `apiJeedom` function:

`apiJeedom(jeedomHost, apikey, reqParams = {}, jsonrpc = '2.0', uriJeedomApi = '/core/api/jeeApi.php')`

- `jeedomHost` host of jeedom server
- `apikey` api key of jeedom
- `reqParams` optionnals params to add to request ([phin package options](https://github.com/ethanent/phin#custom-core-http-options))
- `jsonrpc` version of jsonrpc
- `uriJeedomApi` base url of jeedom server

Make a request: 

```javascript
const requestJeedom = apiJeedomRunnable.run(
    'scenario::changeState', {
        id: 11,
        state: 'run'
    })
```

Details of `apiJeedomRunnable.run` function:

`apiJeedomRunnable.run(cmd, params)`

- `cmd` command of API
- `params` params belongs to command

Example 1 : (`Promise flow`)

```javascript
requestJeedom
.then(response => {
    console.log('Response : ', response.result)
})
.catch(error => {
    console.log('An error : ', error)
})
```

Example 2 : (`async - await`)

```javascript
const functionToRequestJeedom = async () => {
    try {
        let jeedomResponse = await requestJeedom
        console.log("Response", jeedomResponse)
    } catch (e) {
        cb(e)
    }
}

functionToRequestJeedom()
```

## Requests result examples 
 
### without a value returned

```json

{
    "statusCode": 200,
    "statusMessage":"OK",
    "result": true,
    "error": false
}
```

### with a value returned

```json
{
    "statusCode": 200,
    "statusMessage":"OK",
    "result":{
        "collectDate": "2018-09-30 14:49:03",
        "value": 21.2
     },
    "error": false
}
```

### with an error

```json
{
  "statusCode": 200,
  "statusMessage": "OK",
  "result": false,
  "error": {
    "code": 701,
    "message": "Cmd introuvable : 63334"
  }
}
```

## Useful links

- https://www.jsonrpc.org/specification
- https://jeedom.github.io/core/fr_FR/jsonrpc_api

## Changelog

https://github.com/clement-berard/jeedom-request-jsonrpc/releases
