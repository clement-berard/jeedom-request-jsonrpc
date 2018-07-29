# Jeedom API - JSON RPC 2.0

## Description

Module NodeJs pour les appels de l'API Json RPC de Jeedom : https://jeedom.github.io/core/fr_FR/jsonrpc_api

Ce module utilise `axios` (https://github.com/axios/axios)

## Installation

`npm i jeedom-request-jsonrpc`

## Exemple complet (pour les plus rapides ! Détails en dessous :)

```javascript
const {apiJeedom, constantsJeedom} = require('./lib/jeedom-request-jsonrpc')

const apiJeedomRunnable = new apiJeedom(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)

let req = apiJeedomRunnable.run(
    'scenario::changeState', {
        id: 11,
        state: 'run'
    })

req
.then(response => {
    console.log('Ma reponse est : ', response.data)
})
.catch(error => {
    console.log('Oups une erreur : ',error)
})

```

## Initialisation

Require du module (qui export la classe API et des constantes) : 

```javascript
const {apiJeedom, constantsJeedom} = require('./lib/jeedom-request-jsonrpc')
```

On déclare une nouvelle classe avec :

```javascript
const apiJeedomRunnable = new apiJeedom(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)
```

Le constructeur de la classe est le suivant : 

```javascript
constructor(url, apikey, reqParams = {}, options = {}, jsonrpc = '2.0')
{
        this.url = url
        this.apikey = apikey
        this.reqParams = reqParams
        this.jsonrpc = jsonrpc
}
```

`reqParams` sont les parametres de `axios` disponible a cette url https://github.com/axios/axios#request-config


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

## Appel des fonctions

Chaque function execute la requete avec une commande de l'API et renvoit une Promise :

```javascript
let req = apiJeedomRunnable.run(
    'scenario::changeState', {
        id: 11,
        state: 'run'
    })

req
.then(response => {
    console.log('Ma reponse est : ', response.data)
})
.catch(error => {
    console.log('Oups une erreur : ',error)
})
```

ou `scenario::changeState` est un exemple de commande disponible ici https://jeedom.github.io/core/fr_FR/jsonrpc_api

La réponse est alors contenue dans `response.data`




