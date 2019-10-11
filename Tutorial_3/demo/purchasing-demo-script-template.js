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
    //TODO
}

async function purchaseProduct(product) {
    //TODO 
}

async function addProductQuantity(product, quantity) {
    //TODO
}

async function getProductDetails(product) {
    //TODO
}

async function getProducts() {
    //TODO
}

// Set test product
const item = "yellow_tie";
const id = 'yellowtie';
const addQuantity = 3;
const url = '';
const description = 'Nice bright yellow tie';
const price = '$89.99';
const company = 'gucci';

// Function Calls

// addProduct(item, addQuantity, url, description, price, company, id);
// addProductQuantity(item, 2);
// purchaseProduct(item);
// getProductDetails(item);
// getProducts();


