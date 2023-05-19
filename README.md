# NestJS API TRANSACTIONS

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- NodeJs
- Kafka Broker
- Database MongoDB
- Docker

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/IngenieroCesar/api-transactions
```


### 1.3 Project Docker Image

``` sh
docker pull ghcr.io/ingenierocesar/api-transactions:v0.0.1
```

## 2. Project structure

The project has been developed with: 
- Modular/clean architecture (Hexagonal)
- Command Query Responsibility Segregation (CQRS) pattern.

## 3. REST API

The REST API to the example app is described below.

## Create Transaction

### Request

`POST /transactions/`

Body: {
  "accountExternalIdDebit": "Guid",
  "accountExternalIdCredit": "Guid",
  "tranferTypeId": 1,
  "value": 1200
}

### Response

    HTTP/1.1 204 NO CONTENT

## Get Transaction

### Request

`POST /transactions/get/`

Body: {
  "transactionExternalId": "ad",
  "transactionType": {
    "name": ""
  },
  "transactionStatus": {
    "name": ""
  },
  "value": 120,
  "createdAt": "18/05/2023 14:25:59"
}


### Response

    HTTP/1.1 200 OK

Body: {
    "_id": "6466c41740a1793254d09e82",
    "id": "ce9ffd6f-1bb4-4e1c-a55e-4eb01e2cd6e1",
    "accountExternalIdDebit": "Guid",
    "accountExternalIdCredit": "Guid",
    "tranferTypeId": 1,
    "value": 1200,
    "status": "rejected",
    "createdAt": "18/05/2023 19:34:31",
    "updatedAt": "18/05/2023 19:34:32",
    "__v": 0
}
