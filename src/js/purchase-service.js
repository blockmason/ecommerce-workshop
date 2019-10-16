const { link } = require('@blockmason/link-sdk');
require('dotenv').config();

// Purchse Service API
const purchaseMicroservice = link({
    clientId: process.env.PURCHASE_CLIENT_ID,
    clientSecret: process.env.PURCHASE_CLIENT_SECRET
});

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

    purchaseProduct: async function (product, buyerAddress) {
        const reqBody = {
            "product": product,
            "purchaser": buyerAddress
        };
        await purchaseMicroservice.post('/purchaseProduct', reqBody);
    },

    getProducts: async function () {
        productList = await purchaseMicroservice.get('/events/Product');
        return productList.data
    }
}

module.exports = purchaseService;