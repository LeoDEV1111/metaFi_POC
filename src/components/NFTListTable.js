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
import TableRow, {tableRowClasses} from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

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
    [`&.${tableRowClasses.selected}`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.3) !important',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function NFTListTable({columnData, NFTList, setTokenID, setName, setCrrentPrice , setERC20Token}){
    
    const [selected, setSelected] = useState([]);

    const onClick = (index) => {
        var arr = [];
        NFTList.map((row, i) => {
            arr[i] = false;
            if(i == index) arr[i] = true;
        });

        setSelected(arr)
        console.log(NFTList[index])
        setTokenID(NFTList[index].tokenID)
        setName(NFTList[index].name)
        setCrrentPrice(NFTList[index].currentPrice)
        setERC20Token(NFTList[index].erc20Token)
    }

    return (
        <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 275, minHeight:275}}>
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
                        {NFTList.length > 0 && NFTList.map((row, index) => (
                            <StyledTableRow
                                key={row.tokenID}
                                hover
                                onClick={e => onClick(index)}
                                selected={selected[index]}
                            >
                                <StyledTableCell><input type="radio" name="select_NFT" checked={selected[index]}/></StyledTableCell>
                                <StyledTableCell component="th" scope="row">{row.tokenID}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                {/* <StyledTableCell>{row.contractAddress}</StyledTableCell> */}
                                <StyledTableCell><a href={"https://mumbai.polygonscan.com/address/"+row.contractAddress}>{row.contractAddress.slice(0,10)}...</a></StyledTableCell>
                                <StyledTableCell>{row.tokenStandard}</StyledTableCell>
                                <StyledTableCell>{row.ownerAddress.slice(0,10)}...</StyledTableCell>
                                <StyledTableCell>${row.currentPrice}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>                
        </Paper>
        </div>
    )
}