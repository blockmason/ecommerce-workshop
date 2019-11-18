const { link } = require('@blockmason/link-sdk');

const purchaseMicroservice = link({
    clientId: process.env.PURCHASE_CLIENT_ID,
    clientSecret: process.env.PURCHASE_CLIENT_SECRET
});

purchaseService = {
    addProduct: function (product, quantity, url, description, price, company, id) {
        const reqBody = {
            "product": product.toString(),
            "addQuantity": quantity.toString(),
            "url": url.toString(),
            "description": description.toString(),
            "price": price.toString(),
            "company": company.toString(),
            "id": id.toString(),
        };
        return purchaseMicroservice.post('/addProduct', reqBody);
    },

    purchaseProduct: function (product, buyerAddress) {
        console.log(product);
        console.log(buyerAddress);
        const reqBody = {
            "product": product,
            "purchaser": buyerAddress
        };
        return purchaseMicroservice.post('/purchaseProduct', reqBody);
    },

    getProducts: function () {
        return purchaseMicroservice.get('/events/Product');
    },

    getPurchasers: function (productID) {
        const reqBody = {
            "product": productID
        }
        purchasers = purchaseMicroservice.get('/getPurchasers', reqBody);
        return purchasers;
    }
}

module.exports = purchaseService;