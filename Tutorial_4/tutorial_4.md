[![images/tutorial_4_video.png](images/tutorial_4_video.png)](https://www.youtube.com/watch?v=H75sKShaGC4)

---

# Create Blockchain-Powered Microservices
Goal: To create portable microservices that give our application a series of independently deployable features. We create these with JavaScript files that will interact with our Smart Contracts on the blockchain using the Link JavaScript SDK.

## What microservices do we need?

### Payments Service
The payment microservice controls the **transfer of funds from a purchaser to a seller** when a product is bought.

**Details:** The payment microservice executes transfers of a custom token, which we created in an earlier tutorial, and held by a `treasury`. When products are purchased, tokens are transferred between the appropriate wallets. These custom tokens are used instead of the typical credit card.

### Purchase Service
The purchase microservice controls: the creation and storage of products (including the details of those products), changes to product inventory, and records which products are bought and by whom.

### Comments Service
The Comments microservice records and retrieves customer commentsfor a particular product.

---
## Using Environment Variables when Interacting with your Link APIs
Recall in the [previous tutorial](https://github.com/blockmason/ecommerce-workshop/blob/master/Tutorial_3/tutorial_3.md), we used basic *node* scripts to interact with our `Purchasing` smart contract. In these scripts, we copied/pasted the required `client_id` and `client_secret` directly into our script. 

```
  const service = link ({
    clientId: "<CLIENT_ID>",
    clientSecret: "<CLIENT_SECRET>" });
```
However, in creating our microservices, we will be **using environment variables** to protect our client ID and secret from the public and being stored in version control.

Before we move on let us set up some environment variables in a `.env` file

> * Create a new file in your project folder named `.env`

> * Add your `.env` to your `.gitignore`

> * In your `.env` file you can store your client IDs and client secrets for each microservice. So for example, for the `Purchasing` smart contract APIs, you may have:
```
PURCHASE_CLIENT_ID=abcdefg..
PURCHASE_CLIENT_SECRET=abcefg..
```

Then in your script file, you can use the environment variables with:
```
  const service = link ({
    clientId: process.env.PURCHASE_CLIENT_ID,
    clientSecret: process.env.PURCHASE_CLIENT_SECRET });
```

---
## Building portable microservices
In this section we will break down how each microservice is constructed using JavaScript.
### Payments Service

First we need to set up the SDK.
```
const { link } = require('@blockmason/link-sdk');

const paymentMicroservice = link({
    clientId: "<CLIENT_ID>",
    clientSecret: "<CLIENT_SECRET>"
});

```

Next we need two functions which will: 
* Check the balance of a user's wallet to ensure that the customer has enough money in their wallet to make the purchase when they are checking out

* Transfer funds from the customer to the producer when a purchase is made 

```
const paymentService = {

    balanceOf: async function (address) {
        const reqBody = {
            "_tokenholder": address
        }
        const { balance } = await paymentMicroservice.get('/balanceOf', reqBody);
        return(parseInt(balance, 16) / Math.pow(10, 18));
    },

    transferFrom: async function transferFunds(sender, recipient, amount) {
        const funds = (amount*Math.pow(10, 18)).toString(16);
        const transferBody = {
          "_from": sender,
          "_to": recipient,
          "_value": funds
        }
        try {
          console.log('transfering funds now');
          await paymentMicroservice.post('/transferFrom', transferBody);
          console.log('transferring funds complete');
        }
        catch(err) {
          console.log(err);
        }
       },
}
```

Finally we export our payment service as a module that can be used elsewhere:

```
module.exports = paymentService;
```
---
### Purchase Service
The following `Purchasing` microservice setup code should be very familiar, if not identical, to the scripts we built in the [previous tutorial](https://github.com/blockmason/ecommerce-workshop/blob/master/Tutorial_3/tutorial_3.md). 

First we set up the SDK.
```
const { link } = require('@blockmason/link-sdk');

// Purchse Service API
const purchaseMicroservice = link({
    clientId: "<CLIENT_ID>",
    clientSecret: "<CLIENT_SECRET>"
});
```

Next, we need to add a function that will allow for the creation of new products. In the `addProduct` function we create an object with all the product details and use the Link SDK to send a post request to store those details.

```
purchaseService = {
    addProduct: async function (product, quantity, url, description, price, company, id) {
        const reqBody = {
            "product": product.toString(),
            "addQuantity": quantity.toString(),
            "url": url.toString(),
            "description": description.toString(),
            "price": price.toString(),
            "company": company.toString(),
            "id": id.toString(),
        };
        return await purchaseMicroservice.post('/addProduct', reqBody);
    },
```

We also need a function that will be called when a product is purchased. This function records which product is purchased and by whom.

```
    purchaseProduct: async function (product, buyerAddress) {
        console.log(product);
        console.log(buyerAddress);
        const reqBody = {
            "product": product,
            "purchaser": buyerAddress
        };
        const response = await project.post('/purchaseProduct', reqBody);
        console.log('POST /purchaseProduct called with request data ', reqBody);
        if (response.errors) {
            console.log('Error with purchasing product. Check that product and sufficient quantity exists');
        }
    }
```

Finally, we want to be able to retrieve all the products that we have stored on the blockchain. Using the `getProducts` function we can retrieve an array of products and information about these products.

```
    getProducts: async function () {
        const productList = await purchaseMicroservice.get('/events/Product');
        return productList.data
    }
}
```

Finally we export our purchasing service as a module that can be used elsewhere:

```
module.exports = purchaseService;
```
---
### Comments Service

First we set up the SDK.
```
const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: "<CLIENT_ID>",
    clientSecret: "<CLIENT_SECRET>"
});
```

The comments service is relatively simple. It consists of making a post request to store a comment about a specific product, and making a get request to retrieve all the comments.

```
commentsService = {
    getComments: async function () {
        const comments = await commentsMicroservice.get('/events/Comment');
        comments.data.forEach((data) => {
            this.addCommentsInMemory(data)
        });
    },

    addCommentsInMemory: function(commentData) {
        this.commentsInMemory.push(commentData);
    },
}

module.exports = commentsService;
```

And that's it for our 3 microservices! Each represents a simple service containing a few key functions that our front-end application can now use.

In the [next and final tutorial](https://github.com/blockmason/ecommerce-workshop/blob/master/Tutorial_5/tutorial_5.md), we tie it all together and run our ecommerce marketplace app!