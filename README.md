<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img width="100"src="https://i2.wp.com/poneynumerique.fr/wp-content/uploads/2015/08/jeedom.png">
     <img width="100"src="https://image.flaticon.com/icons/png/512/460/460989.png">
  </a>
</p>

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
</p>


## Overview

Node module to calls Jeedom's RPC API : https://jeedom.github.io/core/fr_FR/jsonrpc_api

This module uses axios (https://github.com/axios/axios)

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

Make a request: 

```javascript
const requestJeedom = apiJeedomRunnable.run(
    'scenario::changeState', {
        id: 11,
        state: 'run'
    })
```

Details of `run` function:

`run(cmd, params)`

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

## Request Result

Two examples of request result: 

```json
// without a value returned
{
    "status": 200,
    "statusText":"OK",
    "result": true
}
// with a value returned
{
    "status": 200,
    "statusText":"OK",
    "result":{
        "collectDate": "2018-09-30 14:49:03",
        "value": 21.2
     }
}
```

## Useful links

- https://www.jsonrpc.org/specification
- https://jeedom.github.io/core/fr_FR/jsonrpc_api

## Changelog

### 1.0.6 (January 2019)

- Fix documentation
- Delete some useless packages
- Refactor of code

### 1.0.5 (October 2018)

- Add Typescript Definitions

### 1.0.4 (October 2018)

- Improve error managment
- Bugs fix
- Fix documentation


