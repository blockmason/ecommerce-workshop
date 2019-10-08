const { link } = require('@blockmason/link-sdk');

// Ethereum Ropsten API access
const paymentMicroservice = link({
    clientId: "rSHW55cN0lDd9T4KyhvNXM57CgygDGSDTx0M2ArEtbo",
    clientSecret: "QK+J1i97Idf30h5RGPozAlf9YCcL8PNdG29Nhsnz+lX29MyhRbxuuB/OAQ7MYnc"
});

const paymentService = {

    balanceOf: async function (address) {
        const reqBody = {
            "_tokenholder": address
        }
        const { balance } = await paymentMicroservice.get('/balanceOf', reqBody);
        return(parseInt(balance, 16) / Math.pow(10, 18));
    },

    transferFrom: async function transferFunds(sender, recipient, amount) {
        const funds = (amount*Math.pow(10, 18)).toString(16);
        const transferBody = {
          "_from": sender,
          "_to": recipient,
          "_value": funds
        }
        try {
          console.log('transfering funds now');
          await paymentMicroservice.post('/transferFrom', transferBody);
          console.log('transferring funds complete');
        }
        catch(err) {
          console.log(err);
        }
       },
}

module.exports = paymentService;