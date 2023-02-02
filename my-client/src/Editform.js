import React, { useEffect, useState } from "react";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
// import Otp from "./Otp";

const initialState = {
  Username: "",
  Email: "",
  Password: "",
};

export default function Editform() {
  //   const [inputData, setInpuData] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();
  //   const [value, setValue] = useState([]);
  const history = useNavigate();
  const [state, setState] = useState(initialState);

  const { Username, Email, Password } = state;
  const isEmailValid = /@gmail.com/.test(Email);
  const [hidden, setHidden] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState('')

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:8004/getting/${id}`).then((res) => {
      if (res.data.success === false) {
        setState(res.data.message);
      } else {
        setState({ ...res.data.result[0] });
      }
    });
    console.log(setState);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError("")
    } else {
      setEmailError('Enter valid Email!')
    }

  };
  const handleClick = () => {
    // e.preventDefault();
    if (!state || !isEmailValid) {
      //   alert("Fill the data first");
      toast.error("Fill the data first", { position: "top-center" });
      // history("/Editform/:id")
    } else {
      Axios.post("http://localhost:8004/verification", {
        OTP: otp,
      }).then((res) => {
        console.log(res);
        // if (!inputData) {
        //   toast.error("Enter OTP");
        //   console.log(inputData);
        // } else {
        if (res.data.success === false) {
          // history("/Editform/:id");
          toast.error("OTP doesn't match");
        } else {
          toast(" OTP Verified");
          setTimeout(() => {
            history("/Dashboard");
          }, 2000);
          
          Axios.put(`http://localhost:8004/putting/${id}`, {
              Username,
              Email,
              Password,
            })
            .then((res) => {
                // setState({ Username: "", Email: "", Password: "" });
                console.log(res);
                setTimeout(() => {
                    toast.success("Updated successfully", { position: "top-center" });
                }, 2000);
            })
            .catch((err) => toast.error(err.response.data));
            //   history("/Dashboard");
        }
      });

    }
    setOtp(otp);
  };


  const Click = () => {
    setHidden(!hidden);

    Axios.post("http://localhost:8004/sender", {
      // OTP: inputData,
    }).then((res, err) => {
      console.log(res);
      if (err) {
        //   history("/authentication/Otp");
        console.log(err);
        //   alert("Wrong OTP Enter correct OTP");
        // toast("Wrong Email or Password");
      } else {
        //   history("/authentication/sign-in");
      }
    });
  };
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
              borderBottomRightRadius: "100px",
              boxShadow: "10px 10px 20px 0px",
            }}
          >
            <div style={{ fontSize: "25px", paddingTop: "20px" }}>
              {" "}
              <b>Update</b>
            </div>
            <div>
              <Input
                placeholder="Username"
                onChange={handleChange}
                value={Username || ""}
                name="Username"
                style={{ marginTop: "20px" }}
              />
              <br />
              {Username && Username.length < 5 ? (
                <small style={{ color: "red", fontSize: "12px" }}>
                  This field is mandatory
                </small>
              ) : (
                ""
              )}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input
                placeholder="Email"
                onChange={handleChange}
                value={Email || ""}
                name="Email"
                style={{ marginTop: "0px" }}
              />
              <button
                type="button"
                onClick={Click}
                style={{
                  borderColor: "white",
                  borderRadius: "10px",
                  backgroundColor: "black",
                  color: "whitesmoke",
                }}
              >
                verify
              </button>
              <br />
              
              <small style={{ color: "red", fontSize: "12px" }}>
              {emailError}
                </small>
               {/* {Email && Email.length < 6 ? ( */}
              {/* {Email.length < 5 && Email !== /@gmail.com/ ?(
                <small style={{ color: "red", fontSize: "12px" }}>
                  Enter valid mail
                </small>
              ) : (
                ""
              )} */}
              <br/>
              
              {hidden && hidden ? (
                <Input
                  placeholder="Otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  // name="Password"
                  style={{ margin: "-10px 0px 20px 0px" }}
                />
              ) : null}
               
                { otp.length === 1 || otp.length === 2 || otp.length === 3 ||otp.length === 4 || otp.length > 5 ? (
                <small style={{ color: "red", fontSize: "12px",justifyContent:'right' , margin:'0px -57px 0px 0px' }}>
                  invalid otp
                </small>
              ) : (
                ""
              )}  

              {/* <br /> */}
              <Input
                placeholder="Password"
                onChange={handleChange}
                value={Password || ""}
                name="Password"
                style={{ marginTop: "0px" }}
              />
              <br />
              {Password && Password.length <= 5 ? (
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
              {/* <div  textAlign="center">
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
            </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
