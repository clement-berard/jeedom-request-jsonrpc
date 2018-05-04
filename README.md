# Jeedom API - JSON RPC

## Description

Module NodeJs pour les appels de l'API Json RPC de Jeedom : https://jeedom.github.io/core/fr_FR/jsonrpc_api

Ce module utilise `axios` (https://github.com/axios/axios)

## Initialisation

Require du module : 

```javascript
const jeedomApiModule = require('jeedom-request-jsonrpc');
```

On déclare une nouvelle classe avec :

```javascript
const jeedomApiJson = new jeedomApiModule(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)
```

Le constructeur de la classe est le suivant : 

```javascript
constructor(url, apikey, reqParams = {}, jsonrpc = '2.0') {
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

Exemple : `object::full` devient `objectFull`, `cmd::execCmd` devient `cmdExecCmd` etc...

## Appel des fonctions

Chaque function execute la requete et renvoit une Promise :

```
let req = jeedomApiJson.messageAll()

req
.then(response => {
    console.log('je sui sun geni', response.data)
})
.catch(error => {
    console.log('je sui sun error',error)
})
```

La réponse est alors contenue dans `response.data`

## Exemple complet

```
const jeedomApiModule = require('./jeedom-request');
const axios = require('axios')

const jeedomApiJson = new jeedomApiModule(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)

let req = jeedomApiJson.messageAll()

req
.then(response => {
    console.log('je sui sun geni', response.data)
})
.catch(error => {
    console.log('je sui sun error',error)
})

```


