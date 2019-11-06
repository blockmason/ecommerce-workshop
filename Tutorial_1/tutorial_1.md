[![https://raw.githubusercontent.com/blockmason/ecommerce-workshop/master/Tutorial_1/Images/tutorial_1_video.png](https://raw.githubusercontent.com/blockmason/ecommerce-workshop/master/Tutorial_1/Images/tutorial_1_video.png)](https://www.youtube.com/watch?v=PRRVt4E_bsI&list=PLaNne2eDpfGl_HkIiTgSR4oce1NxAPjMw&index=2)

---

# Blockmason Link & Blockchain Network Token Setup
Goal: Setup your Link account and obtain the test utility tokens for your blockchain network of choice. 

### Blockmason Link setup

> Follow the simple setup steps outlined in the following section of the Link onboarding guide: https://github.com/blockmason/link-onboarding#signing-up

When you see the code editor in Link with the `Demo` smart contract code, you have successfully setup your Link account!

### Blockchain network token setup
In order to store data on a public blockchain network, you will need to obtain some of its corresponding utility tokens in order to digitally pay for that transaction. This is generally known as a 'gas fee'.

For example, the Ethereum blockchain uses Ether or ETH as it's underlying utility token. Another blockchain network, GoChain, uses GO tokens.

Tokens are specific to a network and this also applies between test and mainnet (production) networks. For example, you can obtain ETH tokens specific for the Ethereum Ropsten testnet for free since it is designed for test purposes. Mainnet tokens, however, usually need to be bought from a cryptocurrency exchange.

> For the public Ethereum blockchain, follow the setup steps outlined here: https://github.com/blockmason/link-onboarding/blob/master/Ethereum.md#setup . The setup requires 3 steps:

1. Instead of running your own Ethereum node, you can just setup an [Infura](https://infura.io) account, which provides a hosted, cloud-based, Ethereum node that you can connect to. 

2. Obtain 1 ETH, recorded on the Ethereum Ropsten testnet from a testnet 'faucet' which drips tokens.

3. Confirm you have received the test 1 ETH by visiting the Ethereum Ropsten testnet **block explorer** at: https://ropsten.etherscan.io/ . Search your wallet address to see your balance. 

> For the public GoChain blockchain, follow the setup steps outlined here: https://github.com/blockmason/link-onboarding/blob/master/GoChain.md#setup . The setup requires only 2 steps since GoChain provides public node APIs that Link can connect to:

1. Obtain test GO tokens from the GO faucet https://faucet.gochain.io/.

2. Confirm you have received the testnet GO tokens by searching your Link default wallet address with the GoChain testnet block explorer: https://testnet-explorer.gochain.io/ . 

Now you are all setup with Link and some test tokens and ready to proceed with the [next tutorial](https://github.com/blockmason/ecommerce-workshop/blob/master/Tutorial_2/tutorial_2.md)!
