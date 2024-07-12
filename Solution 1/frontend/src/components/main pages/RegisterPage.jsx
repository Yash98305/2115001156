import img from "../../assets/Mobile login-pana.png";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../context/auth.jsx";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { IconButton, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyName] = useState("");
  const [ownerName, setownerName] = useState("");
  const [ownerEmail, setownerEmail] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [accessCode, setaccessCode] = useState("");
  const { api, auth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://20.244.56.144/test/register`, {
      companyName,
        ownerName,
        ownerEmail,
        rollNo,accessCode
      });
      if (res) {
       console.log(res);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth.token) {
      toast.success("You are already logged in");
      navigate("/home");
    }
  }, [navigate, auth]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70%" }}>
        <img
          src={img}
          style={{ width: "88%", height: "100%", mixBlendMode: "multiply" }}
          alt="Register"
        />
      </div>
      <div style={{ width: "50%" }}>
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h1 style={{ textAlign: "center", padding: "40px" }}>
            Register Yourself
          </h1>
          <TextField
          
            label="companyName"
            value={companyName}
            required
            onChange={(e) => setcompanyName(e.target.value)}
            style={{ width: "100%", marginBottom: "30px" }}
            autoComplete="companyName"
          />
          <TextField

            label="ownerEmail"
            value={ownerEmail}
            
            required
            onChange={(e) => setownerEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "30px" }}
            autoComplete="ownerEmail"
          />
          <TextField
            
            label="ownerName"
            value={ownerName}
            required
            onChange={(e) => setownerName(e.target.value)}
            style={{ width: "100%", marginBottom: "30px" }}
            autoComplete="ownerName"
          />
         
          <TextField
            
            label="rollNo"
            value={rollNo}
            required
            onChange={(e) => setrollNo(e.target.value)}
            style={{ width: "100%", marginBottom: "30px" }}
            autoComplete="rollNo"
          />
          <TextField
            
            label="accessCode"
            value={accessCode}
            required
            onChange={(e) => setaccessCode(e.target.value)}
            style={{ width: "100%", marginBottom: "30px" }}
            autoComplete="accessCode"
          />
         
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "17px",
              backgroundColor: "black",
              color: "white",
              fontSize: "15px",
              borderRadius: "7px",
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
