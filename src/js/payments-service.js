const { link } = require('@blockmason/link-sdk');

// Ethereum Ropsten API access
const paymentMicroservice = link({
  clientId: process.env.PAYMENT_CLIENT_ID,
  clientSecret: process.env.PAYMENT_CLIENT_SECRET
});

const paymentService = {

  balanceOf: async function (address) {
    const reqBody = {
      "_tokenholder": address
    }
    const { balance } = await paymentMicroservice.get('/balanceOf', reqBody);
    return (parseInt(balance, 16) / Math.pow(10, 18));
  },

  transferFrom: async function transferFunds(sender, recipient, amount) {
    const funds = (amount * Math.pow(10, 18)).toString(16);
    const transferBody = {
      "_from": sender,
      "_to": recipient,
      "_value": funds
    }
    await paymentMicroservice.post('/transferFrom', transferBody);
    console.log('transferring funds complete');
  },
}

module.exports = paymentService;