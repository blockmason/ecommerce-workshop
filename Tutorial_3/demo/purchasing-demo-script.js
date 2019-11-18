const fetch = require('node-fetch');
const { link } = require('@blockmason/link-sdk');

// Authenticate with Link API
const project = link({
    clientId: '',
    clientSecret: ''
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
    
  await project.post('/addProduct', reqBody);
}

async function addProductQuantity(product, quantity) {
  const reqBody = {
    "product": product,
    "addQuantity": quantity
  }
  
  const response = await project.post('/addProductQuantity', reqBody);
  console.log('POST /addProductQuantity called with request data ', reqBody);
  if (response.errors) {
    console.log('Error with adding quantity of ', quantity, '. Check that product exists!');
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

async function getProductDetails(product) {
  const payload = {
    "value": product
  };
  
  const result = await project.get('/productList', payload);
  console.log('Product details for ', product, 'are:', result);
}

async function getProducts() {
  try {
    const result = await project.get('/events/Product');
    console.log('Products are: ', result);
  } catch(err) {
    console.log('Error is ', error);
  }
  
}

async function getAuthority() {
  const { result } = await project.get('/authority');
  console.log('authority is', result);
}

// Set test product
const item = "soccerball";
const id = 'soccerball';
const addQuantity = 10;
const url = 'https://images.unsplash.com/photo-1554728667-662368ae729a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
const description = 'Nice ball';
const price = '89.99';
const company = 'FIFA';

// Function Calls

// addProduct(item, addQuantity, url, description, price, company, id);
// addProductQuantity(item, 2);
// purchaseProduct(item);
// getProductDetails(item);
getProducts();
// getAuthority();


