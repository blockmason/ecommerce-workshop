const fetch = require('node-fetch');
const { link } = require('@blockmason/link-sdk');

// Authenticate with Link API
const project = link({
    clientId: 'OgjoJLf92GG99gixM62bCFr6TFLGfiQx5g6ulaJ_GrA',
    clientSecret: '4BNAYRXX5QO4gwZscx7VlhnX/a/TaPSqaCIZ7n4N2QDq190rlck6yudkC9k3zGG'
  }, {
    fetch
});

async function addProduct(product, addQuantity, url, description, price, company, id) {
  const reqBody = {
    "product": product,
    "addQuantity": addQuantity,
    "url": url,
    "description": description,
    "price": price,
    "company": company,
    "id": id
  }
    
  const response = await project.post('/addProduct', reqBody);
  console.log('POST /addProduct called with request data ', reqBody);
  if (response.errors) {
    console.log('Error adding Product. Check all product parameters passed');
  }
}

async function purchaseProduct(product) {
  const reqBody = {
    "product": product,
    "purchaser": "0xaFf485B0dd5D2c2851FDf374D488379F75403663"
  }
  
  const response = await project.post('/purchaseProduct', reqBody);
  console.log('POST /purchaseProduct called with request data ', reqBody);
  if (response.errors) {
    console.log('Error with purchasing product. Check that product and sufficient quantity exists');
  }
}

async function addProductQuantity(product, quantity) {
  const reqBody = {
    "product": product,
    "addQuantity": quantity
  }
  
  const response = await project.post('/addProductQuantity', reqBody);
  console.log('POST /addProductQuantity called with request data ', reqBody);
  if (response.errors) {
    console.log('Error with adding quantity of ', quantity, '. Check that product exists');
  }
}

async function getProductDetails(product) {
  const payload = {
    "value": product
  };
  
  const { quantity, price} = await project.get('/productList', payload);
  console.log('Quantity and price of product ', product, 'is:', quantity, price);
}

async function getProducts() {
  const result = await project.get('/events/Product');
  console.log('Products are: ', result);
}

// Test APIs
const item = "yellow_tie";
const id = 'yellowtie';
const addQuantity = 3;
const url = '';
const description = 'Nice bright yellow tie';
const price = '$89.99';
const company = 'gucci';

// addProduct(item, addQuantity, url, description, price, company, id);

addProductQuantity(item, 2);

// getProductDetails(item);

// getErrors();

// getProducts();

// getAuthority();

// purchaseProduct(item);

