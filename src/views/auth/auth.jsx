import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  Tab, Tabs , Grid} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { makeStyles } from "@material-ui/core";

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux-store'
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import backend from '../../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'transparent',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
    uploadbtn: {
        backgroundColor: "white",
        color: "#0081F9",
        boxSizing: 'border-box',
        boxShadow: " 0px 2px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: '3px',
        width: "100%",
        borderColor: "transparent",
    }

}))


function Auth({history}) {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)


  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentState, setCurrentState] = useState(0);

  const[fullname, setfullname] = useState();
  const[phone, setPhone] = useState();
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();
  const [cv, setCV] = useState("");
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState("");


  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };


  const navigateTo = useNavigate();

  if(user) {
    navigateTo("/home")
  }
  
  //   if (user) {
  //     user.role !== 'admin'?
  //     history.push(`/dashboard`)
  //     : history.push(`/`)
  // }

  
 const loginSubmitHandler = async (e) => {
    e.preventDefault()
    const isLogin = await dispatch(authActions.login(email, password))
    // console.log(dispatch(authActions.login(email, password)))

    if (isLogin) {
      setOpen(false)
      navigateTo("/home")
    }
  }

  const role="customer"

  const SignUpHandler = async(e) => {
    e.preventDefault()

    const identitydoc = cv;
    const isSignUp = await dispatch(authActions.signUp(email, password,fullname,phone, identitydoc, role))
    if(isSignUp) {
      setCurrentState(3)
    }
  }

  const ForgotHandler = async(e) => {
    e.preventDefault()
    const isforgot = await dispatch(authActions.forgotPassword(email))
    if(isforgot) {
      setCurrentState(2)
    }
  }

  const Uploadfile = async (formdata, setCV, setLoading) => {
    try {
      // const config = {
      //   headers: {
      //     accept: "application/json",
      //     "Accept-Language": "en-US,en;q=0.8",
      //     "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
      //   },
      // };
      setLoading(true);
      const res = await backend.post("/api/upload", formdata);
      setLoading(false);
      setCV(res.data.data[0].imgurl);
      console.log(res.data.data[0].imgurl);
    } catch (error) {
      window.alert(error);
    }
  };

  const UPLOAD_DOCUMENT= async () => {

    setUserID(user._id)
    try {
      const config = {};
      const uploadedCV = [];

      // {
      //   cv.map((e) => uploadedCV.push(e?.imgurl));
      // }
      const body = {
        identitydoc: cv,
      };
      const _id = user._id;
      const resp = await backend.put(`/api/user/${_id}`, body);
      console.log(resp.data);
      if(resp) {
        setCurrentState(4)
      }
 
    } catch (e) {
      window.alert("File is already uploaded");
    }
  };

  
  const UploadFileDoc = async (e, i) => {
    e.preventDefault();

    const fileObj = e.target.files[0];

    const name = e.target.name;
    const formdata = new FormData();
    if (name == "document") {
        const element = fileObj
        formdata.append("files", element);
        const resp = await Uploadfile(formdata, setCV, setLoading);
      
    }
    // UPLOAD_DOCUMENT();

  };

  // const GetPostedFiles = (index, name) => {
  //   // debugger;
  //   const value = name;

  //   if (value === "document") {
  //     const FilterValue = cv.filter((e, s) => s !== index);
  //     setCV(FilterValue);
  //   }
  // };

  // useEffect(() => {
  //   backend.get("/api/job/").then((response) => {
  //     //   console.log(response.data);
  //     setData(response.data.data);
  //   });
  // }, []);
  // // console.log(data);


  return (
    <div>

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    {currentState==0?
<Box sx={style}>
<CloseIcon style={{position: "absolute", top: "10", left: "430", pointer: "cursor"}} onClick={()=> setOpen(false)}/>

<Typography style={{textAlign: "center", fontWeight: "700",fontFamily: "Times New Roman"}} id="modal-modal-title" variant="h6" component="h2">
            BINOXA
          </Typography>
<Box>
        <Tabs  value={tabIndex} onChange={handleTabChange}>
          <Tab style={{width: "50%"}} label="Log in" />
          <Tab style={{width: "50%"}} label="Sign up" />
        </Tabs>
      </Box>
      <br/>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>

          <form style={{justifyContent: "center"}} onSubmit={loginSubmitHandler}>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Email</label><br/>
                            <input required onChange={(e)=>setEmail(e.target.value)} style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}} /><br/>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Password</label><br/>
                            <input type="password" required onChange={(e)=>setPassword(e.target.value)} style={{height: "40px", width: "100%", background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}} /><br/>
                            {/* <a style={{color: '#0081F9', textDecoration: "none"}} href="#" onClick={()=>setCurrentState(1)}>Forgot Password?</a> */}
                            <br/>
                            <br/>
                            <Button type='submit' style={{width: "100%", height: "50px", color: "white", background: "#0081F9", borderColor: "transparent", cursor: "pointer"}} >Log in</Button>
            </form>
      
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
           <form style={{justifyContent: "center"}} onSubmit={SignUpHandler}>
                            <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Full Name</label><br/>
                            <input onChange={(e)=>setfullname(e.target.value)} required style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}}/><br/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Phone No</label><br/>
                            <input onChange={(e)=>setPhone(e.target.value)}  required style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}} /><br/>
                            </Grid>
                            </Grid>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Email</label><br/>
                            <input onChange={(e)=>setEmail(e.target.value)}  required style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}}/><br/>
                            <label style={{fontWeight: "400", fontSize: "19px"}}>Password</label><br/>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)}  required style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}}/><br/>
                            <br/>
                            {/* <InputLabel htmlFor="document">
          <input
                    style={{ display: "none" }}
                    id="document"
                    name="document"
                    onChange={(e) => UploadFileDoc(e)}
                    accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, .png, .jpeg"
                    type="file"
                  />
          <Button  component="span"   style ={{width: '100%'}} variant="outlined"  className={classes.uploadbtn}>
                               <FileUploadIcon/> Choose photo to upload
                            </Button>
                            <br/>
                            <br/>
            </InputLabel> */}

                            <Button type='submit' style={{width: "100%", height: "50px", color: "white", background: "#0081F9", borderColor: "transparent", cursor: "pointer"}}  >Sign up</Button>

                             </form>
                    
                        <br/>
                        <p>I accept the <a style={{color: 'black', textDecoration: "underline", fontWeight: "500"}}>Terms of Use</a> & <a style={{color: 'black', textDecoration: "underline", fontWeight: "500"}}>Privacy Policy</a></p>
          </Box>
        )}
      </Box>
      </Box>  : currentState==1?
         <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
<Box sx={style}>
<CloseIcon style={{position: "absolute", top: "10", left: "430", pointer: "cursor"}} onClick={()=> setOpen(false)}/>

<Typography style={{textAlign: "center", fontWeight: "700",fontFamily: "Times New Roman"}} id="modal-modal-title" variant="h6" component="h2">
            {/* Forgot your Password? */}
          </Typography>
          <br/>
          <p>Enter your email address and we will send you a link to set your password.</p>
          <br/>
          <form>
          <label style={{fontWeight: "400", fontSize: "19px"}}>Email</label><br/>
          <input required type='email' onChange={(e)=>setEmail(e.target.value)} style={{height: "40px", width: "100%",background: "rgba(0, 0, 0, 0.04)", border: "1px solid #C4C4C4", borderRadius: "3px"}}/><br/>
          <br/>
          <Button type='submit' onClick={ForgotHandler} style={{width: "100%", height: "50px", color: "white", background: "#0081F9", borderColor: "transparent", cursor: "pointer"}} >Send</Button>
          {/* <Button onClick={()=>setCurrentState(2)} style={{width: "100%", height: "50px", color: "white", background: "#0081F9", borderColor: "transparent", cursor: "pointer"}} >Send</Button> */}
          </form>
          <br/>
          <p>Know your password?<a style={{color: "#0081F9", cursor: "pointer"}} onClick={()=>setCurrentState(0)}> Log in</a></p>   
</Box>

        </Modal>
      : currentState==2?
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
<Box sx={style}>
<CloseIcon style={{position: "absolute", top: "10", left: "430", pointer: "cursor"}} onClick={()=> setOpen(false)}/>

<Typography style={{textAlign: "center", fontWeight: "700",fontFamily: "Times New Roman"}} id="modal-modal-title" variant="h6" component="h4">
            Password reset link sent to your email!
          </Typography>
          <br/>
          <p style={{textAlign: "center"}}>If the email address has an account, an email will be sent with a link to reset your password.</p>
          <br/>
          <p style={{textAlign: "center"}}>Email sent to: <strong >{email}</strong></p>
          <br/>
          <hr></hr>
          <p style={{textAlign: "center"}}>Know your password?<a style={{color: "#0081F9", cursor: "pointer"}} onClick={()=>setCurrentState(0)}> Log in</a></p>   

</Box>
</Modal>

      : currentState==3?
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
<Box sx={style}>
<CloseIcon style={{position: "absolute", top: "10", left: "430", pointer: "cursor"}} onClick={()=> setOpen(false)}/>

      <Typography style={{textAlign: "center", fontWeight: "700",fontFamily: "Times New Roman"}} id="modal-modal-title" variant="h6" component="h2">
            Account Created Successfully
          </Typography>
          <br/>
          <br/>
          <p > You can upload your photo</p>
          <InputLabel htmlFor="document">
          <input
                    style={{ display: "none" }}
                    id="document"
                    name="document"
                    onChange={(e) => UploadFileDoc(e)}
                    accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, .png, .jpeg"
                    type="file"
                  />
          <Button  component="span"   style ={{width: '100%'}} variant="outlined"  className={classes.uploadbtn}>
                               <FileUploadIcon/> Choose photo to upload
                            </Button>
                            <br/>
                            <br/>
            <Button style={{width: "100%", height: "42px", color: "white", background: "#0081F9", borderColor: "transparent", cursor: "pointer"}} onClick={()=>UPLOAD_DOCUMENT()}>Upload Now</Button>
            </InputLabel>

           <br/>
           
           <div style={{textAlign: "center"}}>
            {/* <a style={{color: '#0081F9', textDecoration: "underline", textAlign: "center"}} href="/home">Later</a> */}
            </div>
          </Box>
          </Modal>
      :    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
<Box sx={style}>
<CloseIcon style={{position: "absolute", top: "10", left: "430", pointer: "cursor"}} onClick={()=> setOpen(false)}/>
<h1 >Thanks for creating your account</h1>
<div style={{textAlign: "center"}}>  
         
            <br/>
            <Button style={{border: "2px solid #0081F9", color: "#0081F9", width: '170px',height: '50px'}}    href="/home" variant="outlined" className={classes.continueBtn}>
                             Home
             </Button>
             </div>

</Box>
</Modal>
        }
      </Modal>
    </div>
  );
}


export default Auth;