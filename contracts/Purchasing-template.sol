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
    
    function addProduct(string memory product, uint addQuantity) public {
        //TODO
    }

    function addProductQuantity(string memory product, uint addQuantity) public {
        //TODO
    }
    
    function purchaseProduct(string memory product, address purchaser) public returns (uint purchaserslength) {
        //TODO
    }
    
    function getPurchasers(string memory product) public view returns (address[] memory purchasers) {
        //TODO
    }
}