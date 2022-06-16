export const MetaFi_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "baseInterestPercentage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "LTVPercentage",
        "type": "uint32"
      },
      {
        "internalType": "address[]",
        "name": "whitelistedTokens",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "feeRecipients",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "feePercentages",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "metaFiMarketPlaceAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_loanBorrower",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_borrowerRepayAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_loanLender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_lenderRepayAmount",
        "type": "uint256"
      }
    ],
    "name": "BorrowerAndLenderRepaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "LoanRequestSettled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lenderRepayAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "lender",
        "type": "address"
      }
    ],
    "name": "NFTTransferredAndLenderPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftRecipient",
        "type": "address"
      }
    ],
    "name": "NFTTransferredToLender",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "_isLoanExpired",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "_resetLoanRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_nftPrice",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "_loanPeriod",
        "type": "uint64"
      },
      {
        "internalType": "uint32",
        "name": "_loanInterestPercentage",
        "type": "uint32"
      },
      {
        "internalType": "uint128",
        "name": "_loanAmount",
        "type": "uint128"
      }
    ],
    "name": "createNewLoanRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "failedTransferCredits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "fulfillBuyRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reservePrice",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endDate",
        "type": "uint256"
      }
    ],
    "name": "fulfillCreateDirectSale",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBaseInterestPercentage",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLTVPercentage",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMetaFiMarketPlaceAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftTokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getTokenOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      }
    ],
    "name": "lenderDepositAndFulfillBuy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_nftPrice",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "_loanPeriod",
        "type": "uint64"
      },
      {
        "internalType": "uint32",
        "name": "_loanInterestPercentage",
        "type": "uint32"
      },
      {
        "internalType": "uint128",
        "name": "_loanAmount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "_borrowerDeposit",
        "type": "uint128"
      }
    ],
    "name": "loanRequestAndDepositAndBuyRequest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "loanRequests",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "loanInterestPercentage",
        "type": "uint32"
      },
      {
        "internalType": "uint64",
        "name": "loanEndTime",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "loanPeriod",
        "type": "uint64"
      },
      {
        "internalType": "uint128",
        "name": "NFTPrice",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "loanAmount",
        "type": "uint128"
      },
      {
        "internalType": "address",
        "name": "loanBorrower",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "loanLender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ERC20Token",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "buyRequested",
        "type": "bool"
      },
      {
        "internalType": "uint128",
        "name": "borrowerDeposit",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "lenderDeposit",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "borrowerRepayAmount",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_erc20Token",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      }
    ],
    "name": "repayLoan",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "newBaseInterestPercentage",
        "type": "uint32"
      }
    ],
    "name": "setBaseInterestPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "newFeePercentage",
        "type": "uint32"
      }
    ],
    "name": "setFeePercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newFeeRecipient",
        "type": "address"
      }
    ],
    "name": "setFeeRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "newLTVPercentage",
        "type": "uint32"
      }
    ],
    "name": "setLTVPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newMetaFiMarketPlaceAddress",
        "type": "address"
      }
    ],
    "name": "setMetaFiMarketPlaceAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isOwner",
        "type": "bool"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "newWhitelistedTokens",
        "type": "address[]"
      }
    ],
    "name": "setWhitelistedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "settleLoanRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawAllFailedCredits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
  