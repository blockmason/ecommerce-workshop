const { link } = require('@blockmason/link-sdk');

// Purchse Service API
const purchaseMicroservice = link({
    clientId: '',
    clientSecret: ''
});

module.exports = {
    addProduct: function(product, quantity) {
        const reqBody = {
            "product": product,
            "addQuantity": quantity
        };
        return purchaseMicroservice.post('/addProduct', reqBody);
    },

    purchaseProduct: function(product, buyerAddress) {
        const reqBody = {
            "product": product,
            "purchaser": buyerAddress
        };
        return purchaseMicroservice.post('/purchaseProduct', reqBody);
    },

    getPurchasers: function(product) {
        const reqBody = {
            "product": product
        };
        return purchaseMicroservice.get('/getPurchasers', reqBody);
    },

    getAuthority: function() {
        return purchaseMicroservice.get('/authority');
    }
}