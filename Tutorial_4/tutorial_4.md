# Microservices
Goal: To create the JavaScript that will interact with our Smart Contracts using the Link SDK

## What microservices do we need?

#### Payments Service
#### Purchase Service
#### Comments Service

---
## Microservice Smart Contracts

### Creating the contracts

### Choosing a blockchain

---
## Interacting with your Smart Contracts through the SDK

Now that we have created the Smart Contracts, now we need to write our application code that will interact with those contracts through the Link APIs. We do this by first installing the Link SDK, specifically for JavaScript. Then we will create each of our service JavaScript files ```comments-service.js```, ```payments-service.js```, and ```purchase-service.js```.

* Make sure you have installed the Link SDK for JavaScript through Node via ```npm install @blockmason/link-sdk```. Once installed let's add it to each of our service JavaScript files by adding in the line ```const { link } = require('@blockmason/link-sdk');```.
* Next you need to configure the Link SDK to utilize the correct Smart Contract APIs by adding the appropriate **Client ID** and **Client Secret**:

  ```
  const service = link ({
    clientId: "<CLIENT_ID>",
    clientSecret: "<CLIENT_SECRET>" });
    ```
---
## Building portable microservices

### Payments Service
### Purchase Service
### Comments Service