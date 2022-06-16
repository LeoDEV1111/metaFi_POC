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

export default function LoanRequestList({nftAddress, columnData, loanRequestList, isBorrowRequest, loanContract, selectedAccount, updateLoanRequest, updateNFTList, metaFiMarketContract, erc20Token, USDCContract, NFTContract}){
    useEffect(() => {
    }, [])
    
    const handleCancel = async (index) => {        
        console.log(loanRequestList[index])
        if(loanContract){
            let res = await loanContract.methods._resetLoanRequest(
                nftAddress,
                loanRequestList[index].tokenID
            ).send({from:selectedAccount, gas: 510000})  

            updateLoanRequest()
        }
    } 

    const handleGrantLoan = async (index) => {
        // console.log(loanRequestList[index])
        // console.log(selectedAccount)
        if(loanContract){
            if(erc20Token == addressZero) //native token pay
            {
                let res = await loanContract.methods.lenderDepositAndFulfillBuy(
                    nftAddress,
                    loanRequestList[index].tokenID,
                    addressZero,
                    0
                ).send({from:selectedAccount, gas: 510000, value:BigNumber.from((loanRequestList[index].loanAmount).toString())})  
                console.log(res)

            } 
            else //ERC20 pay
            {
                console.log("erc20")
                console.log(loanRequestList[index].loanAmount )
                console.log(META_ADDRESS)
                let res0 = await USDCContract.methods.approve(
                    META_ADDRESS,
                    BigNumber.from((loanRequestList[index].loanAmount).toString()) 
                  ).send({from:selectedAccount, gas: 500000})

                if(res0){
                    let res = await loanContract.methods.lenderDepositAndFulfillBuy(
                        nftAddress,
                        loanRequestList[index].tokenID,
                        erc20Token,
                        BigNumber.from((loanRequestList[index].loanAmount).toString())
                    ).send({from:selectedAccount, gas: 500000})  
                }
            }                

            updateNFTList()
            updateLoanRequest()
        }
    }
    const handleRepay = async (index) => {
        // console.log(loanRequestList[index])
        const currentDate = new Date()
        const currentTimeInSec = Math.round(currentDate.getTime() / 1000)
        console.log(currentTimeInSec)
        const _passedTimeInSec = (currentTimeInSec - loanRequestList[index].loanStartTime) > 0 ? currentTimeInSec - loanRequestList[index].loanStartTime: 0
        const _passedTimeInDay = Math.trunc(_passedTimeInSec / 86400)
        console.log("day", _passedTimeInDay)
        console.log("daily", loanRequestList[index].dailyInterest)
        console.log(("repay", loanRequestList[index].loanAmount * (1 + loanRequestList[index].dailyInterest * (_passedTimeInDay+ 1) / 100)))
        if(loanContract){
            if(erc20Token == addressZero) //native token pay
            {
                let res = await loanContract.methods.repayLoan(
                    nftAddress,
                    loanRequestList[index].tokenID,
                    addressZero,
                    0
                ).send({from:selectedAccount, gas: 510000, value:BigNumber.from(((loanRequestList[index].loanAmount * (1 + loanRequestList[index].dailyInterest * (_passedTimeInDay + 1) / 100))).toString())})  
            } 
            else //ERC20 pay
            {
                console.log(_passedTimeInSec)
                let res0 = await USDCContract.methods.approve(
                    META_ADDRESS,
                    BigNumber.from(((loanRequestList[index].loanAmount * (1 + loanRequestList[index].dailyInterest * (_passedTimeInDay + 1) / 100))).toString())
                  ).send({from:selectedAccount, gas: 500000})

                if(res0){
                    let res = await loanContract.methods.repayLoan(
                        nftAddress,
                        loanRequestList[index].tokenID,
                        erc20Token,
                        BigNumber.from(((loanRequestList[index].loanAmount * (1 + loanRequestList[index].dailyInterest * (_passedTimeInDay + 1) / 100))).toString())
                    ).send({from:selectedAccount, gas: 500000})  
                }
            } 
            updateLoanRequest()
        }
    }
    const handleLiquidate = async (index) => {
        console.log(loanRequestList[index])
        const currentDate = new Date()
        const currentTimeInSec = Math.round(currentDate.getTime() / 1000)
        console.log(currentTimeInSec)
        if(loanContract){
            if(NFTContract){
                let res0 = await NFTContract.methods.setApprovalForAll(
                    META_ADDRESS,
                    true
                ).send({from:selectedAccount, gas: 510000})
                if(res0){
                    let res = await loanContract.methods.fulfillCreateDirectSale(
                        nftAddress,
                        loanRequestList[index].tokenID,
                        BigNumber.from((loanRequestList[index].currentPrice * 10 ** 18).toString()),
                        loanRequestList[index].erc20Token,
                        currentTimeInSec,
                        currentTimeInSec + 86400 * 10                
                    ).send({from:selectedAccount, gas: 510000})  
                }
                updateNFTList()
                updateLoanRequest()
            }  
        }
    }
   
    return (
        <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 275, minHeight: 120}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columnData.map((column) => (
                            <StyledTableCell>                           
                            {column}
                            </StyledTableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>    
                        {loanRequestList.length >=0 && loanRequestList.map((row, index) => (
                            isBorrowRequest == true ? (
                                row.lenderDeposit == 0 ? (
                                    <StyledTableRow
                                        key={row.tokenID}
                                        hover
                                    >
                                        <StyledTableCell component="th" scope="row">{row.tokenID}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{row.borrowerAddress.slice(0,10)}...</StyledTableCell>
                                        <StyledTableCell>${row.currentPrice}</StyledTableCell>
                                        <StyledTableCell>${row.borrowerDeposit}</StyledTableCell>
                                        <StyledTableCell>${row.currentPrice - row.borrowerDeposit}</StyledTableCell>
                                        <StyledTableCell>{row.period}</StyledTableCell>
                                        <StyledTableCell>{row.dailyInterest}%</StyledTableCell>
                                        <StyledTableCell>{row.maxRepayAmount.toString().slice(0,6)}</StyledTableCell>                                        
                                        {
                                            selectedAccount.toLowerCase() == row.borrowerAddress.toLowerCase() ? (
                                                <StyledTableCell><Button color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleCancel(index)}>Cancel</Button></StyledTableCell>
                                            ) : (
                                                <StyledTableCell><Button  color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleGrantLoan(index)}>Grant Loan</Button></StyledTableCell>
                                            ) 
                                        }                                             
                                    </StyledTableRow>
                                ) : (
                                    <></>
                                )
                            ) : (
                                row.lenderDeposit > 0 ? (
                                    <StyledTableRow
                                        key={row.tokenID}
                                        hover
                                    >
                                        <StyledTableCell component="th" scope="row">{row.tokenID}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{row.borrowerAddress.slice(0,10)}...</StyledTableCell>
                                        <StyledTableCell>${row.currentPrice}</StyledTableCell>
                                        <StyledTableCell>${row.borrowerDeposit}</StyledTableCell>
                                        <StyledTableCell>${row.currentPrice - row.borrowerDeposit}</StyledTableCell>
                                        <StyledTableCell>{row.period}</StyledTableCell>
                                        <StyledTableCell>{row.dailyInterest}%</StyledTableCell>
                                        <StyledTableCell>{row.maxRepayAmount.toString().slice(0,6)}</StyledTableCell>
                                        {                                        
                                            selectedAccount.toLowerCase() == row.borrowerAddress.toLowerCase() ? (
                                                row.buyRequested == false ? (
                                                    <StyledTableCell><Button disabled color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleRepay(index)}>Repay</Button></StyledTableCell>
                                                ) : (
                                                    <StyledTableCell><Button color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleRepay(index)}>Repay</Button></StyledTableCell>
                                                )
                                            ) : (
                                                row.buyRequested == false ? (
                                                    <StyledTableCell><Button color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleLiquidate(index)}>Liquidate</Button></StyledTableCell>
                                                ) : (
                                                    <StyledTableCell><Button disabled color="primary" variant="contained" size="small" sx={{ width:120 }} onClick={e => handleLiquidate(index)}>Liquidate</Button></StyledTableCell>
                                                )
                                            )
                                        }
                                    </StyledTableRow>
                                ) : (
                                    <></>
                                )
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>                
        </Paper>
        </div>
    )
}