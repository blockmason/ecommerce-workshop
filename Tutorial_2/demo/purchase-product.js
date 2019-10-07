const fetch = require('node-fetch');
const { link } = require('@blockmason/link-sdk');

// Authenticate with Link API
const project = link({
    clientId: 'ZC1cNrW1yVn22zXxay0ZaaF7brr5ZUxaSb1FTb3lYmA',
    clientSecret: 'YRQ+MbHbmd1/KQaP/9X73OJpGqnUXuff3FKtiTaK+8FWDypVb3YRaqhoFMfF/LU'
  }, {
    fetch
});

async function addProduct(product, quantity) {
    const reqBody = {
        "product": product,
        "addQuantity": quantity
      }
      
      try {
        await project.post('/addProduct', reqBody);
        console.log('POST /addProduct called successfully with request data ', reqBody);
      }
      catch(err) {
        console.log('Error with POST /addProduct: ',err);
    }
}

async function buyProduct(product) {
    const reqBody = {
      "product": product,
      "purchaser": "0xaFf485B0dd5D2c2851FDf374D488379F75403663"
    }
    
    try {
      await project.post('/purchaseProduct', reqBody);
      console.log('POST /purchaseProduct called successfully with request data ', reqBody);
    }
    catch(err) {
      console.log('Error with POST /purchaseProduct: ',err);
    }
}

async function getPurchasers(product) {
    const payload = {
      "product": product
    };
  
    const { purchasers } = await project.get('/getPurchasers', payload);
    console.log('GET /getPurchasers of', payload, 'is ', purchasers);
}

async function getQuantity(product) {
    const payload = {
        "value": product
    };
    
    const { quantity } = await project.get('/productList', payload);
    console.log('GET /quantity of product', payload, 'is ', parseInt(quantity,16));
}


const item = "white_tie";

// addProduct(item, 2);

// buyProduct(item);

// getPurchasers(item);

getQuantity(item);
