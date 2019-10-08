# Create, Deploy and Interact with a Smart Contracts
Goal: Creating a 'purchasing' smart contract and deploy it to the blockchain. 

### Create a Smart Contract
Smart contracts are essentially lines of code which control the execution of a transaction between blockchain accounts based on events. Smart contracts are regarded as self-executing and intended to avoid the need of intermediaries or 3rd parties.

We will use the Solidity(https://solidity.readthedocs.io/en/latest/) programming language throughout these tutorials to program Ethereum-blockchain compatible smart contracts. 

Solidity has influences from C++, Python and JavaScript and you'll see some of the similar syntax used in the following examples. 

#### A 'Purchasing' Smart Contract
In this series, we are going to build a simple blockchain-powered e-commerce app, where buyers are limited to only 1 of any item. 

We will start with creating a basic `Purchasing` smart contract to record products, total quantity, and buyers on the blockchain.

> We start with the contract template file `Purchasing-template.sol`. 
```
pragma solidity ^0.5.8;

contract Purchasing {
    struct ProductDetails {
        uint quantity;
        address[] purchasers;
    }
    mapping(string => ProductDetails) public productList;
    address public authority;
  
    constructor() public {
        authority = msg.sender;
    }
    
    ...functions...
}
```
Things to note:
* A `struct` is custom defined object type which can group together different types of variables. In this contract, we have a `ProductDetails` custom object which contains the `quantity` and and array of `purchasers` of a specific product.

* The product details are mapped to a product in the `productList` mapping object, which can be publicly accessed.

* The `authority` of this smart contract will be the address which deploys the contract (i.e. `msg.sender`). When deploying a contract using Blockmason Link, the Link default account is the deploying address and will thus be the contract `authority`. 

* There are 3 functions to finish the code for: `#addProduct()`, `#purchaseProduct()`, and `#getPurchasers()`. 

##### #addProduct()
```
function addProduct(string memory product, uint addQuantity) public {
    //TODO
}
```
> Here, we just need to add our product and quantity to the `productList` mapping. We want the quantity added to be cumulative, and not override any existing quantity value. 

```
function addProduct(string memory product, uint addQuantity) public {
    productList[product].quantity += addQuantity;
}
```

##### #getPurchasers()
```
function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
    //TODO
}
```
> Here, we simply need to return the `purchasers` array for a particular `product` from the `productList`:
```
function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
    return productList[product].purchasers;
}
```

##### #purchaseProduct()
```
function purchaseProduct(string memory product, address purchaser) public {
    //TODO
}
```

> Here we need to do 2 things:
> 1. First check if there is product available for purchase. Since each buyer is limited to 1 of any item, we can simply check that the `quantity` is greater than the length of the `purchasers` array. We will use the `require()` Solidity keyword to check for this requirement first. 

> 2. Add the buyer to the `purchasers` array for the product. 

```
function purchaseProduct(string memory product, address purchaser) public {
    require(productList[product].purchasers.length < productList[product].quantity);
    productList[product].purchasers.push(purchaser);
}
```
> See the completed smart contract code in: https://github.com/blockmason/ecommerce-workshop/blob/master/contracts/Purchasing.sol


### Deploy a Smart Contract using Blockmason Link
The process for connecting and interacting with external blockchains using Link is relatively straightforward using the Link Project Wizard. In general, the process flow looks something like this:

![Link public blockchain setup flow](images/Link_public_blockchain_flow.png)

1. Create your smart contract in Link
2. Label your public blockchain
3. Setup your network connector by identifying the network's public JSON-RPC API endpoint. 
4. Deploy your smart contract onto the public blockchain
5. Label your generated APIs
6. Label your API Consumer (e.g. the name of your app using the APIs)
7. Obtain your OAuth API authentication (automatically generated)

Let us now deploy the `Purchasing.sol` smart contract to the blockchain. 

> 1. In Link, click on the *`Create new`* button which starts the new project wizard.

![Link New Project](images/link_create_new.png)

> 2. Under *Which contract would you like to use?*, select *`Create new`* and then copy and paste the `Purchasing.sol` code into the *Source Code* field. Set the *Display Name* as `Purchasing`. Press *`Save`* and *`Next`*.

![Link New Contract](images/link_new_contract.png)

> 3. Under *Which Ethereum account would you like to use?*, use the *`Default Account`*. This is the account we seeded with test utility tokens for our specific blockchain as part of the setup. 

![Default Link Account](images/link_default_account.png)

> 4. Under *Which network would you like to use?*, select *`Create new`* and name it based on the network you are using. Keep the *Block Confirmations Needed* at 0 and the default *EVM Version*. Press *`Save`* and *`Next`*.

![New Network Link](images/link_new_network.png)

> 5. Under *Which connector would you like to use?*, select *`Create new`*. Enter in a connector *Display Name* and provide the appropriate network RPC URL. For example, if you are using Ethereum, you can use an [Infura](https://infura.io/) hosted node URL to connect with that network. If you are using GoChain Testnet, you can use the URL `https://testnet-rpc.gochain.io`. See the [Link Onboarding](https://github.com/blockmason/link-onboarding#using-public-blockchains) section on using public blockchains. Ensure you are using the correct *Network* and press *`Save`* and *`Next`*.

![New Network Connector Link](images/link_network_connector.png)

> 6. Now we just need to label our Deployment. Under *Where is your contract deployed?*, select *`Create new`*. Call this deployment `Purchasing Testnet Deployment`. Since we do not have **an existing contract deployment**, leave the *Address* field blank. Ensure the *Account* is the `Default Account`, the *Contract* is the `Purchasing` contract and the desired *Network*. Press *`Save`* and *`Next`*.

![Contract Deployment Prep](images/link_contract_check_deploy.png)

> 7. Now we are ready to deploy our contract to the desired network. When asked *Are you ready to perform the following deployment?*, press `Deploy` and you should get a deployment in progress indicator icon. This might take a few seconds to complete. If deployed correctly, you will automatically proceed to the next step to setup your API.

**Note: if you get an *insufficient gas fee funds related error, you need to seed your Link default account/wallet with test utility tokens of your selected blockchain network. Refer to the *Blockchain network token setup* section of Tutorial 1.**

![Link Confirm Deployment](images/link_confirm_deployment.png)

> 8. Now we label our Purchasing contract API. Under *Name*, call it *`purchasing-testnet-api`* Also add in a human-readable display name. Ensure you are using the correct *Contract Deployment*. Press *`Save`* and *`Next`*.

![Link API Setup](images/link_api_setup.png)

> 9. Now we label our Purchasing API **Consumer**. This is usually the name of the app or service calling the API. For example, let us call the consumer `E-Commerce App`. Ensure you are using the correct *API* and *Account*. Press *`Save`* and *`Next`*.

![Link Consumer Setup](images/link_consumer_setup.png)

> 10. Lastly, your consumer needs to authenticate with the Purchasing API. An OAuth2.0 Client Secret is automatically generated. Ensure you are using the correct Principal/Consumer. Press *`Save`*, *`Next`* and then *`Finish`*.

![Link Setup OAuth](images/link_oauth.png)

Once you hit *`Finish`*, you should end up back at Home page and see your Purchasing code in the code editor, the API tab and a gear icon which toggles the `client_id` and `client_secret` auth credentials at the bottom of the page. You will use these credentials to interact with you newly created APIs!

![Link API Setup Completed](images/link_api_setup_completed.png)

Let us also double check that our Purchasing contract deployed successfully on the blockchain. 

>Click on the `Ethereum Contract Deployments` menu item to see a list of contract deployments and their addresses. In the following example, the contract deployment address is `0x3ea042fa32f731422d6147bb31515395413986c6`

![List of Contract Deployments](images/ethereum_contract_deployments_list.png)

> Copy and paste this address into the selected blockchain's explorer to see the details of your contract deployment.

**Congrats! You have successfully deployed your smart contract to the blockchain!** In the next Tutorial, we will interact with the deployed contract using our Link APIs. 









