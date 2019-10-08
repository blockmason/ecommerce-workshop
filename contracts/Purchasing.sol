pragma solidity ^0.5.8;

contract Purchasing {
    struct ProductDetails {
        uint quantity;
        address[] purchasers;
    }
    mapping(string => ProductDetails) public productList;
    address public authority;
  
    constructor() public {
        authority = msg.sender;
    }
    
    function addProduct(string memory product, uint addQuantity) public {
        productList[product].quantity += addQuantity;
    }
    
    function purchaseProduct(string memory product, address purchaser) public {
        require(productList[product].purchasers.length < productList[product].quantity);
        productList[product].purchasers.push(purchaser);
    }
    
    function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
        return productList[product].purchasers;
    }
}