import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux-store";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"

const STRIPE_PUBLISHABLE_KEY = "pk_test_51LzZlYGKRjZvsE4Yu0h395WR8Wa8T3mWtOB90T6XlgsqeRSoSee5KwEv8kNv0OShe6LmZegMQKPvkkuZzeYpGAzq00DZ1FWQMA";

function Balance() {
    const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const navigateTo = useNavigate();
  const Logout = async () => {
    navigateTo("/");
    await dispatch(authActions.logout());
  };

  const onToken = (amount, description) => (token) => {
    // debugger
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
    };
    axios.post("http://localhost:3080/api/payment",
        { description, token: token, amount: amount },
        { headers: headers }
      )
      .then((response) => {
        console.log("response: ", response);
        alert("payment success", response);
         onPayment();
        
      })
      .catch((err) => {
        console.log("error: ", err);
        alert("payment failure", err);
      });
  };
  const bb = 500+balance
   const onPayment = async() => {
    const body = {
        balance: bb
    }
    const resp = await axios.put(`http://localhost:3080/api/user/${user._id}`, body)
    if(resp) {
        setBalance(resp.data.data.balance)
        window.alert("Balance Updated Successfully!")

        // window.reload();  
    }
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


  // useEffect(() => {
  //     getCryptoList();
  // },[])
  // // https://api.binance.com/api/v1/exchangeInfo
  // const getCryptoList = async() => {
  //     await fetch('http://localhost:3080/api/user').then(res => res.json()).then((data) => {
  //       if (data) {
  //         setData(data);
  //       }
  //     });
  //   };

  // console.log(data)

  // setTimeout(getCryptoList, 2000)

  // console.log(typeof(user._id))

  return (
    <div>
      <h1 style={{ marginTop: "2%" }}>BINOXA</h1>
      <Grid container spacing={2} columns={12}>
        <Grid
          item
          xs={12}
          sm={12}
          md={2.3}
          style={{ width: "100%", height: "650px", background: "#F6FAFD" }}
        >
          <Button href="/home" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <DashboardIcon />
            Dashboard
          </Button>
          <br />
          <br />
          <Button href="/profile" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <PeopleIcon />
            Profile
          </Button>
          <br />
          <br />
          <Button href="/trades" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <StarBorderIcon />
            Trades
          </Button>
          <br />
          <br />
          <Button
            href="/balance"
            style={{ color: "black", background: "lightgrey" }}
          >
            {" "}
            <StarBorderIcon />
            Balance
          </Button>
          <br />
          <br />
          <Button href="/currency" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <StarBorderIcon />
            Currencies
          </Button>
          <br />
          <br />
          <Button href="/api" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <SettingsIcon />
            API Management
          </Button>
          <br />
          <br />
          <Button onClick={Logout} style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {" "}
            <LogoutIcon />
            Logout
          </Button>
          <br />
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={9} style={{}}>
          <strong>Balance</strong>
          <br />
          <div>
            <span>{balance}</span>
          </div>

          <div>
            <StripeCheckout
              className="App-link"
              label="Add Balance"
              name={"Hamza"}
              email={user?.email}
              cvc={100}
              description="Binoxa Exchange"
              amount={50000}
              // opened={onOpened()} // called when the checkout popin is opened (no IE6/7)
              // token={onToken(amount, description)}
              token={onToken(50000, "Binoxa Exchange")}
              stripeKey={STRIPE_PUBLISHABLE_KEY}
              style={{}}
              // submit_type="pay"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Balance;
