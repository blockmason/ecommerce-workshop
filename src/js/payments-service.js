const { link } = require('@blockmason/link-sdk');

// Ethereum Ropsten API access
const paymentMicroservice = link({
    clientId: "rSHW55cN0lDd9T4KyhvNXM57CgygDGSDTx0M2ArEtbo",
    clientSecret: "QK+J1i97Idf30h5RGPozAlf9YCcL8PNdG29Nhsnz+lX29MyhRbxuuB/OAQ7MYnc"
});

const paymentService = {
    transfer: function (amount) {
        const reqBody = {
            "_to": "0xe1c0f84e2cf7b16a56a58b839d21cdda79f55a44".toLowerCase(),
            "_value": (amount * Math.pow(10, 18)).toString(16)
        };

        try {
            paymentMicroservice.post('/transferFrom', reqBody);
            console.log('Purchase made - funds transferred to seller');
        } catch (err) {
            console.log(err);
            alert("Blockchain network payment request timed out. Please try again.");
        }
    },

    balanceOf: async function (user) {
        console.log(user);
        userBalance = await paymentMicroservice.get('/balanceOf', user);
        console.log(userBalance);
    }
}

module.exports = paymentService;