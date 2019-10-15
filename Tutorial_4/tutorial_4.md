# Microservices
Goal: To create the JavaScript that will interact with our Smart Contracts using the Link SDK

## What microservices do we need?

#### Payments Service
#### Purchase Service
#### Comments Service

---
## Microservice Smart Contracts

### Creating the contracts
In the previous tutorial we worked with Smart Contracts. Now that we are familiar we need to create individual Smart Contracts for each microservice we will be running in our application.

  #### Payments Smart Contract
Let's take a look at what this contract consists of:

```
contract BasicToken {
    // Name your custom token
    string public constant name = "Basic Token";
```

The first thing we want to do is change the contract name to your token name

```
    string public constant symbol = "BASIC";

    uint8 public constant decimals = 18;

    address public owner;
```

Then we want to set your custom token symbol

```
    address public treasury;

    uint256 public totalSupply;

    mapping (address => uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() public {
        owner = msg.sender;

        treasury = address(<some address>);

        // Use the following for the treasury if you want the Link default account to be the treasury
        // treasury = msg.sender;

        totalSupply = 1000 * 10**uint(decimals);

        balances[treasury] = totalSupply;
        emit Transfer(address(0), treasury, totalSupply);
    }
...
```
Lastly we want to add the wallet address for your treasury or we can use the default Link address. The treasury  will contain your total token supply. And then we just set your total token supply to be created *(default 1000)*.

- Purchase Smart Contract

- Comments Smart Contract

### Choosing a blockchain
There are lots of factors to consider when choosing which blockchain you want each individual microservice to be deployed to when using Link. By default we can use the Link Private Network, or we can manual choose which network we want to use. For instance we can use the Ethereum blockchain for our payments microservice, and a blockchain like GoChain for our inventory management and purchase service.

While we won't go into the details here on setting up connectors for each blockchain, you can find the relevant information in our on-boarding documentation here https://github.com/blockmason/link-onboarding.

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
**Using environment variables** to protect our client ID and secret from public development version control applications.

- Before we move on let's set up some environment variables in a ```.env``` file
- Create a new file in your project folder named ```.env```
- Add you ```.env``` to your ```.gitignore```
- In your ```.env``` file you can store your client IDs and client secrets for each microservice.

---
## Building portable microservices

### Payments Service
### Purchase Service
### Comments Service