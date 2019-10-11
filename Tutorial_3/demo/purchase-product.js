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
    
  await project.post('/addProduct', reqBody);
  console.log('POST /addProduct called with request data ', reqBody);
}

async function purchaseProduct(product) {
  const reqBody = {
    "product": product,
    "purchaser": "0xaFf485B0dd5D2c2851FDf374D488379F75403663"
  }
  
  const originalErrors = await getErrors();
  try {
    await project.post('/purchaseProduct', reqBody);
    console.log('POST /purchaseProduct called with request data ', reqBody);
    const newErrors = await getErrors();
    if (newErrors.length > originalErrors.length && newErrors[newErrors.length-1]["product"] == product) {
      console.log('Error with purchasing product: ', newErrors[newErrors.length-1]["errorMsg"]);
    }
  }
  catch (err) {
    console.log('Error with POST request ', err);
  }
}

async function addProductQuantity(product, quantity) {
  const reqBody = {
    "product": product,
    "addQuantity": quantity
  }
  
  try {
    await project.post('/addProductQuantity', reqBody);
    console.log('POST /addProductQuantity called with request data ', reqBody);
  }
  catch(err) {
    console.log('Error with adding Product Quantity', err);
  }
}

async function getProductDetails(product) {
  const payload = {
    "value": product
  };
  
  const { quantity, price} = await project.get('/productList', payload);
  console.log('Quantity and price of product ', product, 'is:', quantity, price);
}

async function getErrors() {
  const { data } = await project.get('/events/ErrorLog');
  return data;
}

async function getProducts() {
  const result = await project.get('/events/Product');
  console.log('Products are: ', result);
}

async function getAuthority() {
  const { result } = await project.get('/authority');
  console.log('Authority is: ', result);
}

const item = "green_tie";
const id = 'greentie';
const addQuantity = 3;
const url = '';
const description = 'Nice bright blue tie';
const price = '$89.99';
const company = 'gucci';

// addProduct(item, addQuantity, url, description, price, company, id);

// addProductQuantity(item, 2);

// getProductDetails(item);

// getErrors();

// getProducts();

// getAuthority();

purchaseProduct(item);

