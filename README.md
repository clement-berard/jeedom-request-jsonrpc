# Jeedom API - JSON RPC

## Description

Module NodeJs pour les appels de l'API Json RPC de Jeedom : https://jeedom.github.io/core/fr_FR/jsonrpc_api

Ce module utilise `axios` (https://github.com/axios/axios)

## Installation

`npm i jeedom-request-jsonrpc`

## Exemple complet (pour les plus rapides ! Détails en dessous :)

```javascript
const jeedomApiModule = require('jeedom-request-jsonrpc');

const jeedomApiJson = new jeedomApiModule(
    '{IP-JEEDOM}/core/api/jeeApi.php',
    'mon-api-key'
)

// je veux executer la method cmd::execCmd
let req = jeedomApiJson.cmd_execCmd({
    id: 802
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
constructor(url, apikey, reqParams = {}, options = {}, jsonrpc = '2.0') {
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

Exemple : `object::full` devient `object_full`, `cmd::execCmd` devient `cmd_execCmd` etc...

## Appel des fonctions

Chaque function execute la requete et renvoit une Promise :

```javascript
let req = jeedomApiJson.messageAll()

req
.then(response => {
    console.log('Ma reponse est : ', response.data)
})
.catch(error => {
    console.log('Oups une erreur : ',error)
})
```

La réponse est alors contenue dans `response.data`




