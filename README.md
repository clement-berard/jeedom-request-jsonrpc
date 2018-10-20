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


## Description

Module NodeJs pour les appels de l'API Json RPC de Jeedom : https://jeedom.github.io/core/fr_FR/jsonrpc_api

Ce module utilise `axios` (https://github.com/axios/axios)

## Installation

`npm i jeedom-request-jsonrpc --save` ou  `yarn add jeedom-request-jsonrpc`

## Get Started

Import du package : 

```javascript
const {apiJeedom, constantsJeedom} = require('jeedom-request-jsonrpc')
```

Import et instanciation de la class jeedomApi : 

```javascript
const apiJeedomRunnable = new apiJeedom(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)
```

Création de la requete : 

```javascript
let req = apiJeedomRunnable.run(
    'scenario::changeState', {
        id: 11,
        state: 'run'
    })
```

Exemple 1 : 

```javascript
req
.then(response => {
    console.log('Ma reponse est : ', response.result)
})
.catch(error => {
    console.log('Oups une erreur : ', error)
})
```

Exemple 2 : 

```javascript
const functionForRequestJeedom = async () => {
    try {
        let maReponseJeedom = await requestJeedom
        console.log("maReponseJeedom", maReponseJeedom)
    } catch (e) {
        cb(e)
    }
}

functionForRequestJeedom()
```

## Request Result

Le resultat de la requete est sous la forme : 

```json
// dans le cas d'une instruction sans retour de valeur
{
    "result": true,
    "status": 200,
    "statusText":"OK"
}
// dans le cas d'une instruction avec retour de valeur
{
     "result":{
         "collectDate": "2018-09-30 14:49:03",
         "value": 21.2
     },
     "status": 200,
     "statusText":"OK"
}
```

## Fonctions disponibles

Les fonctions disponibles sont celle de l'API (https://jeedom.github.io/core/fr_FR/jsonrpc_api)

Les fonctions sont formées de cette facon : 

```javascript
run(mcd, params = {}) {
        return this._getResult(mcd, params)
    }
```

- `mcd` est la commande de l'API
- `params` les parametres lies a cette commande

## Liens utiles

- https://www.jsonrpc.org/specification
- https://jeedom.github.io/core/fr_FR/jsonrpc_api

## Changelog

### 1.0.5 (Octobre 2018)

- Add Typescript Definitions

### 1.0.4 (Octobre 2018)

- Amélioration de la gestion des erreurs (messages et catch)
- Bug fix
- Correction documentation


