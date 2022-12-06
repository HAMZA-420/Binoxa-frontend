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
import SettingsIcon from '@mui/icons-material/Settings';
import StarBorderIcon from '@mui/icons-material/StarBorder';


function Users() {
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


    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const Logout = async() => {
        navigateTo('/')
           await  dispatch(authActions.logout())
         
      }



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
            <h1 style={{ marginTop: "2%" }}>
                My Account
            </h1>
            <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={12} md={2.3} style={{ width: "100%", height: "650px", background: "#F6FAFD" }}>
                <Button href="/home" style={{ color: "rgba(0, 0, 0, 0.5)" }} > <DashboardIcon />Dashboard</Button><br /><br />
                <Button href="/profile" style={{  color: "black", background:"lightgrey" }}> <PeopleIcon />Profile</Button><br /><br />
                <Button href="/trades" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <StarBorderIcon />Trades</Button><br /><br />
                <Button href="/balance" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <StarBorderIcon />Balance</Button><br /><br />
                <Button href="/currency" style={{ color: "rgba(0, 0, 0, 0.5)"}}> <StarBorderIcon />Currencies</Button><br /><br />
                <Button href="/api" style={{ color: "rgba(0, 0, 0, 0.5)" }}> <SettingsIcon />API Management</Button><br /><br />
               <Button onClick={Logout} style={{ color: "rgba(0, 0, 0, 0.5)" }}> <LogoutIcon />Logout</Button><br /><br />

                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <div style={{ display: "flex" }}>
                        {/* <img src={currentUser} style={{ height: "50px", width: "100px", color: "#D9D9D9" }} /> */}
                        <h3 >{user.fullname}</h3>
                    </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={3}>
                                    <label style={{ fontWeight: "400", fontSize: "19px" }}>Full Name</label><br />
                                    <input defaultValue={fullname} onChange={(e)=>setFullName(e.target.value)} style={{ height: "40px", width: "100%", border: "1px solid #C4C4C4", borderRadius: "3px" }} /><br />
                                </Grid>
                                <br />
                                <Grid item xs={12} sm={12} md={3}>
                                    <label style={{ fontWeight: "400", fontSize: "19px" }}>Phone No</label><br />
                                    <input defaultValue={mobileNumber} onChange={setMobileNumber} style={{ height: "40px", width: "100%", border: "1px solid #C4C4C4", borderRadius: "3px" }} /><br />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={12} md={5.9}>
                                <label style={{ fontWeight: "400", fontSize: "19px" }}>Email</label><br />
                                <input defaultValue={email} onChange={setEmail} style={{ height: "40px", width: "100%", border: "1px solid #C4C4C4", borderRadius: "3px" }} /><br />
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={12} md={5.9}>
                                <Grid container columns={12}>
                                    <Grid item xs={12} sm={12} md={10}>
                                        <label style={{ fontWeight: "400", fontSize: "19px" }}>Password</label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2}>
                                        <a style={{ textDecoration: "underline", color: "#0081F9", cursor: "pointer" }} onClick={value==0?() => setValue(1):value==1?() => setValue(0):null}>Change</a>
                                    </Grid>
                                </Grid>
                                <input onChange={(e)=>setPassword(e.target.value)} type="password" style={{ height: "40px", width: "100%", border: "1px solid #C4C4C4", borderRadius: "3px" }} /><br />
                            </Grid>
                            {value == 1?
                            <div>
                                  <br />
                            <Grid item xs={12} sm={12} md={5.9}>
                                <label style={{ fontWeight: "400", fontSize: "19px" }}>Current Password</label>
                                <input type='password' onChange={(e)=>setCurrentPassword(e.target.value)} style={{ height: "40px", width: "100%", border: "1px solid #C4C4C4", borderRadius: "3px" }} /><br />

                            </Grid>
                            <br />
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={12} sm={12} md={3.5}>
                                    <Button onClick={()=>updatePassword()} style={{ background: "#0081F9", color: "white", width: "100%" }}>Save Password</Button>
                                </Grid>
                                <br />
                                <Grid item xs={12} sm={12} md={2.55}>
                                    <Button style={{ background: "white", color: "#0081F9", width: "100%" }} variant="outlined">Cancel</Button>
                                </Grid>
                            </Grid>
                                </div>: 
                                <Grid container spacing={2} columns={12}>
                                <Grid item xs={12} sm={12} md={3.5}>
                                    <Button onClick={()=>updateUser()} style={{ background: "#0081F9", color: "white", width: "100%" }}>Save Profile</Button>
                                </Grid>
                                <br />
                                <Grid item xs={12} sm={12} md={2.55}>
                                    <Button style={{ background: "white", color: "#0081F9", width: "100%" }} variant="outlined">Cancel</Button>
                                </Grid>
                            </Grid>
                                }

                            <br />
                            


                </Grid>

            </Grid></div>}
        </div>

    )
}


export default Users;