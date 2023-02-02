import React, { useState } from "react";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  //   const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /@gmail.com/.test(email);
  const history = useNavigate();

  const handleClick = () => {
    if (!email || !password || !isEmailValid) {
      toast.error("Complete the fields");
    } else {
      Axios.post("http://localhost:8004/login", {
        Email: email,
        Password: password,
      }).then((res) => {
        if (res.data.success === false) {
          history("/Login");
          // alert("Wrong Email or Password");
          toast("Wrong Email or Password");
        } else {
          toast("Successfully Login", { position: "top-center" });
          
          setTimeout(() => {
            history("/Dashboard");
          }, 2000);
        }
      });
    }
  };
  const Register = () => {
  history("/");
  }
  return (
    <>
      <ToastContainer />
      <div style={{ height: "100%", marginTop: "11%" }}>
      <div style={{
            marginTop: "13%",
            height: "350px",
            width: "800px",
            backgroundColor: "black",
            justifyContent: "center",
            margin: "auto",
            paddingTop: "20px",
            borderRadius: "20px",
            boxShadow: "10px 10px 20px 10px",
          }}>
        <form
          style={{
            backgroundColor: "gray",
            width: "50%",
            marginTop:'40px',
            justifyContent: "center",
            margin: "auto",
            borderTopLeftRadius: "100px",
          //   borderTopRightRadius:'20px',
            borderBottomRightRadius:'100px',
            boxShadow: "10px 10px 20px 0px",
          }}
        >
          <div style={{ fontSize: "25px", padding: "30px" }}>
            <b>Login</b>
          </div>
          <div style={{}}>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <br />
            {email && email.length <= 6 ? (
              <small style={{ color: "red", fontSize: "12px" }}>
                Enter valid mail
              </small>
            ) : (
              ""
            )}
            <br />
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <br />
            {password && password.length <= 5 ? (
              <small style={{ color: "red", fontSize: "12px" }}>
                This field is mandatory
              </small>
            ) : (
              ""
            )}
            <br />
            <Button
              style={{ marginBottom: "15px" }}
              onClick={handleClick}
              color="primary"
              variant="contained"
              // fullWidth
              type="button"
            >
              Submit
            </Button>
            <div  textAlign="center">
              <div variant="button" color="text">
                Don&apos;t have an account?{" "}
                <button
                  onClick={Register}
                  // component={Link}
                  // to="/authentication/sign-up"
                  variant="button"
                  style={{backgroundColor:"transparent" , outline:'none' , border:'none'}}
                  // fontWeight="medium"
                  // textGradient
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}
