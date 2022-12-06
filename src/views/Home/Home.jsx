import React, { useState, useEffect } from "react";
import backend from "../../api";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../redux-store'
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TradingViewWidget from 'react-tradingview-widget';
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Card from '@mui/material/Card';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import EngineeringIcon from '@mui/icons-material/Engineering';
import axios from "axios";

function Profile() {
    const [value, setValue] = useState(0);
    const [mydata, setData] = useState();
    const { user } = useSelector((state) => state.auth)
    const[fullname, setFullName] = useState(user.fullname)
    const[mobileNumber, setMobileNumber] = useState(user.mobileNumber)
    const[email, setEmail] = useState(user.email)
    const[password, setPassword] = useState(null)
    const[currentPassword, setCurrentPassword] = useState("")
    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [ balance, setBalance] = useState(0);

    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const Logout = async() => {
        navigateTo('/')
           await  dispatch(authActions.logout())
         
      }

      const getBalance = async() => {
        const resp = await axios.put(`http://localhost:3080/api/user/${user._id}`)
        if(resp) {
            setBalance(resp.data.data.balance)
            // window.reload();  
        }
       }
    
       useEffect(() => {
        getBalance()
       })

    useEffect(() => {
        const fetchData = async() => {
        setLoading(true)
          try {
            const response = await backend.get('/api/user')
            // console.log(response)
           if(response) {
            response?.data?.data.map((item )=> {
                if(item._id === user._id) {
                    setCurrentUser(item?.identitydoc)
                    console.log(item.identitydoc)
                }   
           })
            setLoading(false)
            console.log(currentUser)

           }
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      },[])

      const _id = user._id
      const updateUser = async () => {
        const body={
           email: email,
           password: password ,
           fullname: fullname,
           mobileNumber: mobileNumber
        }
        try {
           
            const response = await backend.put(`/api/user/${_id}`, body)
            // console.log(response)
            window.alert("Profile updated successfully")
           
          } catch (error) {
            console.log(error)
          }
    }
    
    const updatePassword = async () => {
        const body= {
            curr_pass: currentPassword,
            confirm_pass: password,
            new_pass: password
        }
        try {
            const response = await backend.put(`/api/user/changepassword/${_id}`, body)
            window.alert("Password Updated Successfully")
        } catch (error) {
            console.log(error)
        }
    }
    //   console.log(currentUser?.identitydoc)
    return (
        
        <div >
            {loading?
        <CircularProgress />:    
        <div>
            <h1 style={{ marginTop: "2%"}}>
                BINOXA
            </h1>
            <Grid container spacing={2} columns={12}>

                <Grid item xs={12} sm={12} md={2.3} style={{ width: "100%", height: "650px", background: "#F6FAFD" }}>
                <Button href="/home" style={{  color: "black", background:"lightgrey" }}> <DashboardIcon />Dashboard</Button><br /><br />
                <Button href="/profile" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <PeopleIcon />Profile</Button><br /><br />
                <Button href="/trades" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <StarBorderIcon />Trades</Button><br /><br />
                <Button href="/balance" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Balance</Button><br /><br />
                <Button href="/currency" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Currencies</Button><br /><br />
                <Button href="/api" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <SettingsIcon />API Management</Button><br /><br />
               <Button onClick={Logout} style={{ color: "rgba(0, 0, 0, 0.5)" }}> <LogoutIcon />Logout</Button><br /><br />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                <div style={{display:"flex", flexDirection:"inline", justifyContent:"space-between"}}>
                <Card style={{width:"250px", height:"150px", background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,34,1) 36%, rgba(0,212,255,1) 100%)", color:"white"}}>
                    <AutoGraphIcon style={{color:"yellow", width:"100px", height:"100px"}}/>{balance}</Card>
                <Card style={{width:"250px", height:"150px", background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,34,1) 36%, rgba(0,212,255,1) 100%)", color:"white"}}>
                    <SsidChartIcon style={{color:"green", width:"100px", height:"100px"}}/>PNL</Card>
                <Card style={{width:"250px", height:"150px", background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,34,1) 36%, rgba(0,212,255,1) 100%)", color:"white"}}>
                    <EngineeringIcon style={{color:"lightblue", width:"100px", height:"100px"}}/>Go to Bot</Card>
                </div>
                <br/>
                <TradingViewWidget
      symbol={`BINANCE:adausdt`}
      autosize
    />
                            <br />
                            


                </Grid>

            </Grid></div>}
        </div>

    )
}


export default Profile;