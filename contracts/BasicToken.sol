// NOTE: This token smart contract template has been simplifed for demonstration purposes and does not meet the ERC-20 token standard!
// DO NOT use in production! Use this ERC20 Token contract instead: https://github.com/blockmason/link-onboarding/blob/master/contracts/ERC20Token.sol

pragma solidity ^0.5.8;

//Change the contract name to your token name
contract BasicToken {
    // Name your custom token
    string public constant name = "Basic Token";

    // Set your custom token symbol
    string public constant symbol = "BASIC";

    uint8 public constant decimals = 18;

    // Contract owner will be your Link account address
    address public owner;

    address public treasury;

    uint256 public totalSupply;

    mapping (address => uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() public {
        owner = msg.sender;

        // Add your wallet address here which will contain your total token supply
        treasury = address(<some address>);

        // Use the following for the treasury if you want the Link default account to be the treasury
        // treasury = msg.sender;

        // Set your total token supply (default 1000)
        totalSupply = 1000 * 10**uint(decimals);

        balances[treasury] = totalSupply;
        emit Transfer(address(0), treasury, totalSupply);
    }

    function () external payable {
        revert();
    }

    function balanceOf(address _tokenholder) public view returns (uint256 balance) {
        return balances[_tokenholder];
    }

    // The sender here is the owner of the contract
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != msg.sender);
        require(_to != address(0));
        require(_to != address(this));
        require(balances[msg.sender] - _value <= balances[msg.sender]);
        require(balances[_to] <= balances[_to] + _value);
        require(_value <= transferableTokens(msg.sender));

        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_from != address(0));
        require(_from != address(this));
        require(_to != _from);
        require(_to != address(0));
        require(_to != address(this));
        require(_value <= transferableTokens(_from));
        require(balances[_from] - _value <= balances[_from]);
        require(balances[_to] <= balances[_to] + _value);

        balances[_from] = balances[_from] - _value;
        balances[_to] = balances[_to] + _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function transferableTokens(address holder) public view returns (uint256) {
        return balanceOf(holder);
    }
}