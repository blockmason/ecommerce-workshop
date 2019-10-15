# Microservices
Goal: To create portable microservices that give our application a series of independently deployable features. We create these with JavaScript files that will interact with our Smart Contracts on the blockchain using the Link SDK.

## What microservices do we need?

### Payments Service
Simplest explanation: The payment microservice controls the transfer of funds from a purchaser to a seller when a product is bought.

In-depth explanation: The payment microservice creates an intermediary that represents real-world value and mints a number of these tokens storing them in a specified treasury. From the treasury the tokens can then be transferred to and between customer held wallets.

In this use-case we use these tokens instead of using a credit card.

### Purchase Service
The purchase microservice controls the creation and storage of products (including the details of those products), the addition of product inventory, and it records which products are bought and by whom.

### Comments Service
The Comments microservice records customer comments, the associated product ID, and can retrieve product comments whenever they are needed.

---
## Microservice Smart Contracts

### Creating the contracts
In the previous tutorial we worked with Smart Contracts. Now that we are familiar we need to create individual Smart Contracts for each microservice we will be running in our application.

*- NOTE: please refer to the .sol files for full details on each contract.*

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
```
Lastly we want to add the wallet address for your treasury or we can use the default Link address. The treasury  will contain your total token supply. And then we just set your total token supply to be created *(default 1000)*.

#### Purchase Smart Contract
Now let's see what we need for the purchase microservice smart contract. We have already covered most of the purchasing Smart Contract in tutorial 3, but here is a brief summary...

The data for each product object are mapped to keys like these:

```
contract Purchasing {
    event Product(string product, uint quantity, string url, string price, string description, string company, string id);
    struct ProductDetails {
        uint quantity;
        address[] purchasers;
        string url;
        string description;
        string price;
        string company;
        string id;
        bool isSet;
    }
```

You can add new products with this function

```
    function addProduct(string memory product, uint addQuantity, string memory url, string memory description, string memory price, string memory company, string memory id) public {
        productList[product].quantity = addQuantity;
        productList[product].url = url;
        productList[product].price = price;
        productList[product].description = description;
        productList[product].company = company;
        productList[product].id = id;
        productList[product].isSet = true;
        emit Product(product, addQuantity, url, price, description, company, id);
    }
```

You can increase the quantity of a product that already exists with this function

```
    function addProductQuantity(string memory product, uint addQuantity) public {
        require(productList[product].isSet);
        productList[product].quantity += addQuantity;
    }
```

When a product is purchased you would want to call this function to record that action

```
    function purchaseProduct(string memory product, address purchaser) public {
        require(productList[product].purchasers.length < productList[product].quantity);
        productList[product].purchasers.push(purchaser);
    }
```

And finally, you can get a list of purchasers for each product with this function

```
    function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
        return productList[product].purchasers;
    }
}
```

#### Comments Smart Contract
The last Smart Contract we need to create is the contract for creating and storing comments.

This contract is very simple. It just stores the comment string and the product ID associated with that comment. It looks something like this:

```
pragma solidity ^0.5.10;

contract Comments {
    event Comment(string asset, string comment);
    address public authority;

    constructor() public {
        authority = msg.sender;
    }

    function postComment(string memory asset, string memory comment) public {
        emit Comment(asset, comment);
    }
}
```
The ```postComment``` function records the comment and data associated with that comment, which can later be retrieved with the API end point ```/events/Comment```.

---

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