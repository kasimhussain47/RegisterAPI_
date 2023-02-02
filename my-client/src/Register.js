import React, { useState } from "react";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /@gmail.com/.test(email);
  const history = useNavigate();

  const handleClick = (e) => {
    if (!username || !email || !password || !isEmailValid) {
      toast.error("Invalid inputs");
    } else {
      //   history("/Login");

      Axios.post("http://localhost:8004/login", {
        Email: email,
        Password: password,
      }).then((res) => {
        if (res.data.success === true) {
          history("/");
          //   alert("Already registered user");
          toast.warn("Already registered user");
        } else {
          Axios.post("http://localhost:8004/register", {
            Username: username,
            Email: email,
            Password: password,
          }).then((res) => {
            console.log(res);
          });
          toast.success("Successfully Registered", { position: "top-center" });
          //   alert("Successfully Login");
          setTimeout(() => {            
            history("/Login");
          }, 2000);
        }
      });
    }
  };

  const Signin = ()=> {
    history("/Login");
  }

  return (
    <>
      <ToastContainer />
      <div style={{ height: "100%", marginTop: "11%" }}>
        <div
          style={{
            marginTop: "13%",
            height: "350px",
            width: "800px",
            backgroundColor: "black",
            justifyContent: "center",
            margin: "auto",
            paddingTop: "30px",
            borderRadius: "20px",
            boxShadow: "10px 10px 20px 10px",
          }}
        >
          <form
            style={{
              backgroundColor: "gray",
              width: "50%",
              justifyContent: "center",
              margin: "auto",
              borderTopLeftRadius: "100px",
            //   borderTopRightRadius:'20px',
              borderBottomRightRadius:'100px',
              boxShadow: "10px 10px 20px 0px",
            }}
          >
            <div style={{ fontSize: "25px", paddingTop: "20px" }}>
              {" "}
              <b>Register</b>
            </div>
            <div>
              <Input
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginTop: "20px" }}
              />
              <br />
              {username && username.length <= 4 ? (
                <small style={{ color: "red", fontSize: "12px" }}>
                  This field is mandatory
                </small>
              ) : (
                ""
              )}
              <br />
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: "10px" }}
              />
              <br />
              {/* {email.length >=1 || email !== /@gmail.com/ ?( */}
              {email && email.length < 6 ? (
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
                style={{ margin: "20px" }}
                onClick={handleClick}
                type="button"
                variant="contained"
                color="primary"
                // fullWidth
              >
                Submit
              </Button>
              <div  textAlign="center">
              <div variant="button" color="text">
                Don&apos;t have an account?{" "}
                <button
                  onClick={Signin}
                  // component={Link}
                  // to="/authentication/sign-up"
                  variant="button"
                  style={{backgroundColor:"transparent" , outline:'none' , border:'none'}}
                  // fontWeight="medium"
                  // textGradient
                >
                  SignIn
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
