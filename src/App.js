import {useState, useEffect} from 'react';
import {ThemeProvider } from '@mui/material/styles';
import {Typography, AppBar, Toolbar, Button} from '@mui/material';
// import Web3 from 'web3';
import Web3 from "web3/dist/web3.min.js";
import {MetaFi_ABI} from './contracts/MetaFi.js';
import {MetaFiMarket_ABI} from './contracts/MetaFiMarket.js';
import {NFT_ABI} from './contracts/NFT.js';
import {ERC20_ABI} from './contracts/ERC20.js';
import {META_ADDRESS, META_MARKET_ADDRESS, USDC_ADDRESS} from './utils/constants.js';
import NFTListTable from './components/NFTListTable.js'
import RaiseBorrowRequest from './components/RaiseBorrowRequest.js'
import LoanRequestList from './components/LoanRequestList.js'

const {BigNumber} = require("@ethersproject/bignumber");

export default function App(){

  const [account, setAccount] = useState("Connect Wallet")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [metaFiLoanContract, setMetaFiLoanContract] = useState(null)
  const [metaFiMarketContract, setMetaFiMarketContract] = useState(null)
  const [NFTContract, setNFTContract] = useState(null)
  const [USDCContract, setUSDCContract] = useState(null)
  const [nftContractAddress, setNftContractAddress] = useState("0xdF69DC866b3D768A54c7Db50Fa9001578A17a4aC")
  const [tokenCount, setTokenCount] = useState(0)
  const [tokenName, setTokenName] = useState(0)
  const [tokenID, setTokenID] = useState(0)
  const [name, setName] = useState("")
  const [currentPrice, setCrrentPrice] = useState(0)
  const [borrowerDeposit, setBorrowerDeposit] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0)
  const [period, setPeriod] = useState(0)
  const [loanRequests, setLoanRequests] = useState([])
  const [NFTListData, setNFTListData] = useState([])
  const [LoanRequestData, setLoanRequestData] = useState([])
  const [LoanGrantedData, setLoanGrantedData] = useState([])
  const [baseDailyInterRate, setBaseDailyInterRate] = useState(0)
  const [erc20Token, setERC20Token] = useState("0xe11A86849d99F524cAC3E7A0Ec1241828e332C62") //default is USDC

  const NFTlistColumn = [
    "",
    "Token ID",
    "Name",
    "Contract Address",
    "Token Standard",
    "Owner Address",
    "Current Price"
  ]

  const LoanRequestColumn = [
    "Token ID",
    "Name",
    "Borrower Address",
    "Current Price",
    "Deposit Amount",
    "Loan Amount",
    "Period(days)",
    "Interest % (daily)",
    "MaxRepaymentAmount",
    ""
  ]

  useEffect(() => {    
    console.log(tokenCount, tokenName) 
    getNFTList()
    getLoanRequest()  

  }, [metaFiLoanContract])

  useEffect(() => {    
    console.log(tokenCount, tokenName) 
    getLoanRequest()  

  }, [account])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const getNFTList = async () => {
    if(NFTContract && metaFiMarketContract){       
      const newData = []
      for(let i = 0; i < tokenCount; i++){        
        const saleData = await metaFiMarketContract.methods.tokenIdToSale(nftContractAddress, i).call()
        console.log("NFT")
        console.log(saleData.salePrice)
        if(saleData.startTime > 0){
          newData.push({tokenID:i, 
            name:tokenName, 
            contractAddress:nftContractAddress, 
            tokenStandard:"ERC-721", 
            ownerAddress:saleData.seller, 
            currentPrice:(saleData.salePrice) / 1000000000000000000, 
            erc20Token:saleData._erc20Token})          
        }
      }
      setNFTListData(newData)
      console.log(newData)
    }
  }

  const getLoanRequest = async () => {
    if(metaFiLoanContract){  
      
      //fetch loan request data from contract
      let newLoanData = []
      let newLoanDataExceptCurrentAccount = []
      for(let i = 0; i < tokenCount; i++){
        const loanData = await metaFiLoanContract.methods.loanRequests(nftContractAddress, i).call()
        console.log("loan")
        if(loanData.loanPeriod > 0){      
          if(loanData.loanBorrower.toLowerCase() == account.toLowerCase()){
            newLoanData.push({
              tokenID: i, 
              name: tokenName, 
              borrowerAddress: loanData.loanBorrower, 
              currentPrice: loanData.NFTPrice / (10 ** 18),
              borrowerDeposit: loanData.borrowerDeposit / (10 ** 18),
              lenderDeposit: loanData.lenderDeposit / (10 ** 18),
              period: loanData.loanPeriod / 86400,
              dailyInterest: loanData.loanInterestPercentage / 100 ,
              maxRepayAmount: (loanData.loanAmount * (1 + loanData.loanInterestPercentage * ( Math.trunc(loanData.loanPeriod / 86400) + 1) / 10000)) / (10 ** 18),
              erc20Token: loanData.ERC20Token,
              loanAmount: loanData.loanAmount,
              loanStartTime: loanData.loanEndTime - loanData.loanPeriod,
              buyRequested: loanData.buyRequested
            })  
          } else {
            newLoanDataExceptCurrentAccount.push({
              tokenID: i, 
              name: tokenName, 
              borrowerAddress: loanData.loanBorrower, 
              currentPrice: loanData.NFTPrice / (10 ** 18),
              borrowerDeposit: loanData.borrowerDeposit / (10 ** 18),
              lenderDeposit: loanData.lenderDeposit / (10 ** 18),
              period: loanData.loanPeriod / 86400,
              dailyInterest: loanData.loanInterestPercentage / 100 ,
              maxRepayAmount: (loanData.loanAmount * (1 + loanData.loanInterestPercentage * ( Math.trunc(loanData.loanPeriod / 86400) + 1) / 10000)) / (10 ** 18),
              erc20Token: loanData.ERC20Token,
              loanAmount: loanData.loanAmount,
              loanStartTime: loanData.loanEndTime - loanData.loanPeriod,
              buyRequested: loanData.buyRequested
            })  
          }    

        }
      }
      Array.prototype.push.apply(newLoanData, newLoanDataExceptCurrentAccount)
      setLoanRequestData(Object.assign(newLoanData))
      setSelectedAccount(account)
      console.log(newLoanData)
    }
  }

  const handleConnectWallet =  async (e) => {
    e.preventDefault()    
    window.ethereum.on('accountsChanged', accounts => {
      console.log("account changed")
      setAccount(accounts[0])
      // setSelectedAccount(accounts[0]) 
    });
    await loadWeb3();
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()    
    setAccount(accounts[0])
    setSelectedAccount(accounts[0]) 
    if(!metaFiLoanContract){
      const metaFiLoanContract =  await new web3.eth.Contract(MetaFi_ABI, META_ADDRESS)
      const metaFiMarketContract = await new web3.eth.Contract(MetaFiMarket_ABI, META_MARKET_ADDRESS)
      const NFTContract = await new web3.eth.Contract(NFT_ABI, nftContractAddress)
      const USDCContract = await new web3.eth.Contract(ERC20_ABI, USDC_ADDRESS)
      console.log(USDCContract)
      if(NFTContract){
        const tokenCount = await NFTContract.methods.tokenCounter().call()
        const tokenName = await NFTContract.methods.name().call()
        const dailyRate = await metaFiLoanContract.methods.getBaseInterestPercentage().call()
        setBaseDailyInterRate(dailyRate)
        setTokenCount(tokenCount)
        setTokenName(tokenName)
        console.log(metaFiLoanContract)
        console.log(metaFiMarketContract)
        // console.log(tokenCount, tokenName) 
      }
      setNFTContract(NFTContract)
      setMetaFiMarketContract(metaFiMarketContract)
      setMetaFiLoanContract(metaFiLoanContract)
      setUSDCContract(USDCContract)
    }
    

    // if(NFTContract){
    //   const tokenCount = await NFTContract.methods.tokenCounter().call()
    //   const tokenName = await NFTContract.methods.name().call()
    //   console.log(tokenCount, tokenName)      
    //   const newData = []
    //   for(let i = 0; i < tokenCount; i++){
    //     // const owner = await NFTContract.methods.ownerOf(i).call()
    //     // if(owner == META_MARKET_ADDRESS){
    //     //   const price = await metaFiMarketContract.methods.getTokenprice(i, nftContractAddress).call()
    //     //   newData.push({tokenID:i, name:tokenName, contractAddress:nftContractAddress, tokenStandard:"ERC-721", ownerAddress:META_MARKET_ADDRESS, currentPrice:(price*100)/1000000000000000000})          
    //     // }
    //     const saleData = await metaFiMarketContract.methods.tokenIdToSale(nftContractAddress, i).call()
    //     console.log("NFT")
    //     if(saleData.startTime > 0){
    //       newData.push({tokenID:i, name:tokenName, contractAddress:nftContractAddress, tokenStandard:"ERC-721", ownerAddress:saleData.seller, currentPrice:(saleData.salePrice * 100) / 1000000000000000000})          
    //     }
    //   }
    //   setNFTListData(newData)
    //   console.log(newData)

    //   if(metaFiLoanContract){
    //     const newLoanData = []

    //     //get base daily interest rate from contract
    //     const dailyRate = await metaFiLoanContract.methods.getBaseInterestPercentage().call()
    //     setBaseDailyInterRate(dailyRate)

    //     //fetch loan request data from contract
    //     for(let i = 0; i < tokenCount; i++){
    //       const loanData = await metaFiLoanContract.methods.loanRequests(nftContractAddress, i).call()
    //       if(loanData.loanPeriod > 0){           
    //         console.log("loan")
    //         newLoanData.push({
    //           tokenID: i, 
    //           name: tokenName, 
    //           borrowerAddress: loanData.loanBorrower, 
    //           currentPrice: loanData.NFTPrice * 100 / 1000000000000000000,
    //           borrowerDeposit: loanData.borrowerDeposit * 100 / 1000000000000000000,
    //           lenderDeposit: loanData.lenderDeposit * 100 / 1000000000000000000,
    //           period: loanData.loanPeriod / 86400,
    //           dailyInterest: loanData.loanInterestPercentage / 100 ,
    //           repayAmount: ((loanData.NFTPrice - loanData.borrowerDeposit) * (1 + loanData.loanInterestPercentage * (loanData.loanPeriod / 86400) / 10000)) * 100 / 1000000000000000000
    //         })            
    //       }
    //     }
    //     setLoanRequestData(newLoanData)
    //     console.log(newLoanData)
    //   }
    // }
    
  }
  
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1}}>
            MetaFi Borrow/Lending Protocol for NFT (Polygon Testnet)
          </Typography>
          <Button color="inherit" variant="outlined" sx={{width:200}} onClick={handleConnectWallet}>{account=="Connect Wallet" ? account : account.slice(0,15)} </Button>
        </Toolbar>
      </AppBar>
      <div style={{width:"90%", margin:"0 auto", paddingBottom:"16px"}}>      
        <div style={{marginTop:25}}>
          <span style={{fontWeight:"bold", fontSize:20 }}>NFT Marketplace - List</span>
        </div>
        <div>
          <NFTListTable 
            columnData={NFTlistColumn} 
            NFTList={NFTListData} 
            setTokenID = {setTokenID}
            setName = {setName}
            setCrrentPrice = {setCrrentPrice}
            setERC20Token = {setERC20Token}
          > 
          </NFTListTable>
        </div>
        <div style={{marginTop:25}}>
          <span style={{fontWeight:"bold", fontSize:20}}>Raise Borrow Request</span>
        </div>
        <div>
          <RaiseBorrowRequest
            nftAddress = {nftContractAddress}
            tokenID = {tokenID}
            name = {name}
            currentPrice = {currentPrice}
            erc20Token = {erc20Token}
            dailyInterest = {baseDailyInterRate}
            loanContract = {metaFiLoanContract}
            account = {account}
            updateLoanRequest = {getLoanRequest}
            updateNFTList = {getNFTList}
            USDCContract = {USDCContract}
          />
        </div>
        <div style={{marginTop:25}}>
          <span style={{fontWeight:"bold", fontSize:20 }}>Borrow Request</span>
          <a href={"https://mumbai.polygonscan.com/address/"+META_ADDRESS} style={{float:"right"}}>{META_ADDRESS}</a>
        </div>
        <div>
          <LoanRequestList
            nftAddress = {nftContractAddress}
            loanContract={metaFiLoanContract}
            selectedAccount={selectedAccount}
            columnData={LoanRequestColumn} 
            loanRequestList={LoanRequestData}
            isBorrowRequest={true}
            updateLoanRequest={getLoanRequest}
            updateNFTList={getNFTList}
            USDCContract = {USDCContract}
            erc20Token = {erc20Token}
            />
        </div> 
        <div style={{marginTop:25}}>
          <span style={{fontWeight:"bold", fontSize:20 }}>Loans Granted</span>
          <a href={"https://mumbai.polygonscan.com/address/"+META_ADDRESS} style={{float:"right"}}>{META_ADDRESS}</a>
        </div>
        <div>
          <LoanRequestList
            nftAddress = {nftContractAddress}
            loanContract={metaFiLoanContract}
            selectedAccount={selectedAccount}
            columnData={LoanRequestColumn} 
            loanRequestList={LoanRequestData}
            isBorrowRequest={false}
            updateLoanRequest={getLoanRequest}
            updateNFTList = {getNFTList}
            USDCContract = {USDCContract}
            metaFiMarketContract = {metaFiMarketContract}
            erc20Token = {erc20Token}
            NFTContract = {NFTContract}
          />
        </div>
      </div>     
    </div>
  )
}


