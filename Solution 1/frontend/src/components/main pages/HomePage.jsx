import React, { useEffect } from "react";
import  useAuth  from "../../context/auth.jsx";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { api, auth } = useAuth();
  const [services,setServices] = useState();
  const navigate = useNavigate();
  const fetchServices = async () => {
    try {
      const res = await axios?.get(`${api}/service/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });

      setServices(res.data.services);
    } catch (err) {
      console.error('Failed to fetch Services:', err);
    }
  };
  const GoToSubscription = async(id)=>{
    navigate(`/subscription?serviceId=${id}`)
  }

  const [activePlans, setActivePlans] = React.useState([]);
  const getActivePlan = async () => {
    try {
      const res = await axios.get(`${api}/subscription/get-plan`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      
      setActivePlans(res.data.subscriptions);
    } catch (e) {
      console.error(e);
    }
  };
 
  useEffect(() => {
    fetchServices();
 getActivePlan();
  }, [auth, api]); 
  const isServiceActive = (serviceId) => {
    return activePlans.some(plan => plan.serviceId._id === serviceId);
  };
  return (
    <div style={{width:"80vw",height:"80vh",padding:10}}>
      
    </div>
   
  );
};

export default HomePage;
