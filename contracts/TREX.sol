// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IDEX {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TREX {
    uint256 fee;
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "This is an only owner function.");
        _;
    }

    constructor(address _owner, uint256 _fee) {
        owner = _owner;
        fee = _fee;
    }

    function swapExactTokensForTokens(
    address _dexAddress,
    uint _amountIn,
    uint _amountOutMin,
    address[] calldata _path,
    address _to,
    uint _deadline
    ) public {
        require(_path.length >= 2, "Path yetersiz");
        address inputToken = _path[0];

        uint256 commission = (_amountIn * fee) / 1000;
        uint256 actualAmountIn = _amountIn - commission;
        uint256 actualAmountOutMin = (_amountOutMin * actualAmountIn) / _amountIn;

        require(
            IERC20(inputToken).transferFrom(msg.sender, address(this), _amountIn),
            "transferFrom failed"
        );

        require(
            IERC20(inputToken).approve(_dexAddress, actualAmountIn),
            "approve failed"
        );

        IDEX dex = IDEX(_dexAddress);

        dex.swapExactTokensForTokens(
            actualAmountIn,
            actualAmountOutMin,
            _path,
            _to,
            _deadline
        );
    }


    function swapExactETHForTokens(
        address _dexAddress,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
        ) public payable {
            require(msg.value > 0, "ETH amount cannot be zero");
            require(path.length >= 2, "Invalid path");

            uint256 commission = (msg.value * fee) / 1000;
            uint256 actualAmountIn = msg.value - commission;

            uint256 actualAmountOutMin = (amountOutMin * actualAmountIn) / msg.value;

            IDEX dex = IDEX(_dexAddress);

            dex.swapExactETHForTokens{value: actualAmountIn}(
                actualAmountOutMin,
                path,
                to,
                deadline
            );
        }

    function swapExactTokensForETH(
        address _dexAddress,
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
        ) external returns (uint[] memory amounts) {
            require(amountIn > 0, "AmountIn must be greater than 0");
            require(path.length >= 2, "Invalid path");

            address inputToken = path[0];

            uint256 commission = (amountIn * fee) / 1000;
            uint256 actualAmountIn = amountIn - commission;

            uint256 actualAmountOutMin = (amountOutMin * actualAmountIn) / amountIn;

            require(
                IERC20(inputToken).transferFrom(msg.sender, address(this), amountIn),
                "TransferFrom failed"
            );

            require(
                IERC20(inputToken).approve(_dexAddress, actualAmountIn),
                "Approve failed"
            );

            IDEX dex = IDEX(_dexAddress);

            amounts = dex.swapExactTokensForETH(
                actualAmountIn,
                actualAmountOutMin,
                path,
                to,
                deadline
            );
        }

    function changeFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    receive() external payable { }
}
