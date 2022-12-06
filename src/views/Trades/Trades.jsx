import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Card from '@mui/material/Card';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../redux-store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';

function createData(type, amount, date,coin, status) {
  return { type, amount, date,coin, status };
}

const rows = [
  createData('Strateg-1', "$150", "18 Aug 10:00 AM", "btc","Completed"),
  createData('Strateg-2', "$150", "18 Aug 10:00 AM", "btc","Running"),
  createData('Strateg-3', "$150", "18 Aug 10:00 AM", "btc","Completed"),

];

export default function TradesTable() {
    const [data, setData] = React.useState();
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const Logout = async() => {
        navigateTo('/')
           await  dispatch(authActions.logout())
         
      }
      useEffect(()=> {
        getCryptoList();
      },[])

      const getCryptoList = async() => {
        const resp = await axios.get("http://localhost:3080/api/orders");
        if (resp) {
            setData(resp.data.data);
            console.log(data)
          }
        };
    

  return (
    <div>
          <h1 style={{ marginTop: "2%"}}>
                BINOXA
            </h1>
            <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={12} md={2.3} style={{ width: "100%", height: "650px", background: "#F6FAFD" }}>
                <Button href="/home" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <DashboardIcon />Dashboard</Button><br /><br />
                <Button href="/profile" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <PeopleIcon />Profile</Button><br /><br />
                <Button href="/trades" style={{  color: "black", background:"lightgrey" }}> <StarBorderIcon />Trades</Button><br /><br />
                <Button href="/balance" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Balance</Button><br /><br />
                <Button href="/currency" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Currencies</Button><br /><br />
                <Button href="/api" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <SettingsIcon />API Management</Button><br /><br />
               <Button onClick={Logout} style={{ color: "rgba(0, 0, 0, 0.5)" }}> <LogoutIcon />Logout</Button><br /><br />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{background: "#0081F9"}}>
          <TableRow >
            <TableCell style={{color:"white"}}>Type</TableCell>
            <TableCell style={{color:"white"}} align="center">Action</TableCell>
            <TableCell style={{color:"white"}} align="center">Amount</TableCell>
            <TableCell style={{color:"white"}} align="center">Coin</TableCell>
            <TableCell style={{color:"white"}} align="center">Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.orderType}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.orderType}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.action}
              </TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.coin}</TableCell>
              <TableCell  align="center">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
    </div>
  );
}
