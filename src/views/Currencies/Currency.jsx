import React, { useEffect, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../redux-store'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';




function Currency() {
    const [data, setData] = useState();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const navigateTo = useNavigate();
    const Logout = async() => {
        navigateTo('/')
           await  dispatch(authActions.logout())
         
      }
    
    useEffect(() => {
        getCryptoList();
    },[])
    // https://api.binance.com/api/v1/exchangeInfo
    const getCryptoList = async() => {
        await fetch('https://api.binance.com/api/v3/ticker/price').then(res => res.json()).then((data) => {
          if (data) {
            setData(data);
          }
        });
      };

    console.log(data)
    
    setTimeout(getCryptoList, 2000)

    // console.log(typeof(user._id))

    return (
        <div>
            <h1 style={{ marginTop: "2%"}}>
                BINOXA
            </h1>
            <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={12} md={2.3} style={{ width: "100%", height: "650px", background: "#F6FAFD" }}>
                <Button href="/home" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <DashboardIcon />Dashboard</Button><br /><br />
                <Button href="/profile" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <PeopleIcon />Profile</Button><br /><br />
                <Button href="/trades" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Trades</Button><br /><br />
                <Button href="/balance" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Balance</Button><br /><br />
                <Button href="/currency" style={{  color: "black", background:"lightgrey" }}> <StarBorderIcon />Currencies</Button><br /><br />
                <Button href="/api" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <SettingsIcon />API Management</Button><br /><br />
               <Button onClick={Logout} style={{ color: "rgba(0, 0, 0, 0.5)" }}> <LogoutIcon />Logout</Button><br /><br />
                </Grid>
                <Grid item xs={12} sm={12} md={9} style={{ }}>
                    <strong style={{marginRight:"8rem"}}>COIN</strong>
                    <strong>PRICE</strong>
                    <br/>
                    {data?.map((item)=> (
                        <div >
                          <span >{item.symbol}</span>
                          <span style={{marginLeft:"7rem"}}>{item.price}</span>
                          </div>
                    ))}
                  
            </Grid>
            
            </Grid>
        </div>
    )
}

export default Currency;