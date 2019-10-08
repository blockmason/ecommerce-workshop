pragma solidity ^0.5.8;

contract Purchasing {
    event Product(string product, uint quantity, string url, string price, string description, string company, string id);
    struct ProductDetails {
        uint quantity;
        address[] purchasers;
        string url;
        string description;
        string price;
        string company;
        string id;
    }
    mapping(string => ProductDetails) public productList;
    address public authority;
  
    constructor() public {
        authority = msg.sender;
    }
    
    function addProduct(string memory product, uint addQuantity, string memory url, string memory description, string memory price, string memory company, string memory id) public {
        productList[product].quantity = addQuantity;
        productList[product].url = url;
        productList[product].price = description;
        productList[product].description = price;
        productList[product].company = company;
        productList[product].id = id;
        emit Product(product, addQuantity, url, price, description, company, id);
    }

       function addProductQuantity(string memory product, uint addQuantity) public {
        productList[product].quantity += addQuantity;
    }
    
    function purchaseProduct(string memory product, address purchaser) public {
        require(productList[product].purchasers.length < productList[product].quantity,  "Sender not authorized.");
        productList[product].purchasers.push(purchaser);
    }
    
    function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
        return productList[product].purchasers;
    }
}