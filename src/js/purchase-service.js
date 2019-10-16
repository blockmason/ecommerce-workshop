const { link } = require('@blockmason/link-sdk');

// Purchse Service API
const purchaseMicroservice = link({
    clientId: 'Miko76KUQlRlqcV8S-rYlw2m_MkFDt9HWLaidl3OGp4',
    clientSecret: 'oH+ScLTgaM+jLil+szLnRwYZPk9MPm585h9glUA9ZDXfRL8O4tOpmqxnSyMmrqx'
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
        console.log(product);
        console.log(buyerAddress);
        const reqBody = {
            "product": product,
            "purchaser": buyerAddress
        };
        await purchaseMicroservice.post('/purchaseProduct', reqBody);
        return;
    },

    getProducts: async function () {
        productList = await purchaseMicroservice.get('/events/Product');
        return productList.data
    }
}

module.exports = purchaseService;