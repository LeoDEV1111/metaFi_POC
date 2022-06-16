import {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {META_ADDRESS, META_MARKET_ADDRESS, USDC_ADDRESS} from '../utils/constants.js';

const {BigNumber} = require("@ethersproject/bignumber");


const addressZero = "0x0000000000000000000000000000000000000000"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function RaiseBorrowRequest(props){
    
    const [depositAmount, setDepositAmount] = useState(0)
    const [period, setPeriod] = useState(0)
    const [loanAmount, setLoanAmount] = useState(0)
    const [repayAmount, setRepayAmount] = useState(0)
    const [depositError, setDepositError] = useState(false)
    const [minDeposit, setMinDeposit] = useState(false)

    useEffect(() => {
      setDepositError(false)
      setMinDeposit(props.currentPrice * 0.35)
    }, [props])

    const handleDepositChange = (event) => {
        // console.log(event.nativeEvent.data)
        const value = event.target.value
        if(value >= minDeposit) {
          setDepositError(false)
        } else {
          setDepositError(true)          
        }
        setDepositAmount(value)   
        const loan = props.currentPrice - value
        const realPeriod = period < 1 ? 1 : period
        const repay = loan * (1 + props.dailyInterest * period / 10000)
        setLoanAmount(loan)
        setRepayAmount(repay)
        console.log(value, loan, repay)
    }
    const handlePeriodChange = (event) => {
        const value = event.target.value
        const realPeriod = value < 1 ? 1 : value
        const repay = loanAmount * (1 + props.dailyInterest * realPeriod / 10000)
        setPeriod(value)
        setRepayAmount(repay)
    }   

    const handleSubmit = async () => {
      if(depositError)
        return
      if(props.loanContract){    
        if(props.erc20Token == addressZero) //native token pay
        {
          console.log("matic")
          let res = await props.loanContract.methods.loanRequestAndDepositAndBuyRequest(
            props.nftAddress,
            props.tokenID,
            props.erc20Token,                                             //pay token address
            BigNumber.from((props.currentPrice * 10 ** 18).toString()),   //NFT price
            period * 86400,                                               //period
            props.dailyInterest,                                          //daily interest
            BigNumber.from((loanAmount * 10 ** 18).toString()),           //loan amount
            0                                                             //borrower deposit
            ).send({from:props.account, gas: 5000000, value:BigNumber.from((depositAmount  * 10 ** 18).toString())})      
        } 
        else //ERC20 token pay
        {
          console.log("ERC20")
          console.log(period)
          console.log((depositAmount  * 10 ** 18))
          console.log(props.currentPrice * 10 ** 18)
          console.log((loanAmount * 10 ** 18))
          let res0 = await props.USDCContract.methods.approve(
            META_ADDRESS,
            BigNumber.from((depositAmount  * 10 ** 18).toString())  
          ).send({from:props.account, gas: 500000})
          console.log("---------")
          console.log(res0)
          let res = await props.loanContract.methods.loanRequestAndDepositAndBuyRequest(
            props.nftAddress,
            props.tokenID,
            // props.erc20Token,                                             //pay token address
            "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62",
            BigNumber.from((props.currentPrice * 10 ** 18).toString()),   //NFT price
            period * 86400,                                               //period
            props.dailyInterest,                                          //daily interest
            BigNumber.from((loanAmount * 10 ** 18).toString()),           //loan amount
            BigNumber.from((depositAmount  * 10 ** 18).toString())        //borrower deposit
            ).send({from:props.account, gas: 5000000})  
        }
        props.updateLoanRequest()
      }
    }   

    
    return (
        <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 200 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>                        
                            <StyledTableCell>Token ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Current Price</StyledTableCell>
                            <StyledTableCell>Deposit Amount</StyledTableCell>
                            <StyledTableCell>Loan Amount</StyledTableCell>
                            <StyledTableCell>Period(days)</StyledTableCell>
                            <StyledTableCell>Interest %(daily)</StyledTableCell>
                            <StyledTableCell>MaxRepaymentAmount</StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>  
                        <StyledTableRow key={props.tokenID}>
                            <StyledTableCell component="th" scope="row">{props.tokenID}</StyledTableCell>
                            <StyledTableCell>{props.name}</StyledTableCell>
                            <StyledTableCell>${props.currentPrice}</StyledTableCell>
                            <StyledTableCell>
                              <div>                                
                              <input type="number" min="10" style={{ width: 100, position:"relative" }} value={depositAmount} onChange={handleDepositChange}/>
                              {depositError && (
                                <>
                                  <br></br>
                                  <span style={{color:"red", fontSize:"12px", position:"absolute"}}>Can't be less than {minDeposit.toFixed(2)}</span>
                                </>
                              )} 
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>${loanAmount}</StyledTableCell>
                            <StyledTableCell><input type="number" value={period} style={{ width: 100 }} onChange={handlePeriodChange}/></StyledTableCell>
                            <StyledTableCell>{props.dailyInterest/100}%</StyledTableCell>
                            <StyledTableCell>${repayAmount.toString().slice(0,6)}</StyledTableCell>
                            <StyledTableCell><Button color="primary" variant="contained" size="small" sx={{ width:120 }}onClick={handleSubmit}>submit</Button></StyledTableCell>
                        </StyledTableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>                
        </Paper>
        </div>
    )
}