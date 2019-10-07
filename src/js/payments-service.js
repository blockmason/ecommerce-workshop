const { link } = require('@blockmason/link-sdk');

// Ethereum Ropsten API access
const paymentMicroservice = link({
    clientId: "",
    clientSecret: ""
});

const paymentService = function (amount) {
    const reqBody = {
        "_to": "".toLowerCase(),
        "_value": (amount * Math.pow(10, 18)).toString(16)
    };

    try {
        paymentMicroservice.post('/transfer', reqBody);
        console.log('Purchase made - funds transferred to seller');
    } catch (err) {
        console.log(err);
        alert("Blockchain network payment request timed out. Please try again.");
    }
}

module.exports = paymentService;