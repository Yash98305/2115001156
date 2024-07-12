import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import useAuth from "../context/auth.jsx";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
const VerticalNav = ({ handleLogout }) => {
  const location = useLocation();
  const { so, auth } = useAuth();
  const lpath = location.pathname;
  useEffect(() => {}, [location]);
  return (
    <>
      <ul onClick={() => so?.(false)}>
        <NavLink to="/home">
          <li style={{ backgroundColor: `${lpath == "/home" ? "#ccc" : ""}` }}>
            <HomeRoundedIcon color="#2E335B" />
            <span style={{ paddingLeft: "10px" }}>Overview</span>
          </li>
        </NavLink>
        <NavLink to="/active-plans">
          <li
            style={{
              backgroundColor: `${lpath == "/active-plans" ? "#ccc" : ""}`,
            }}
          >
            <InventoryRoundedIcon color="#2E335B" />
            <span style={{ paddingLeft: "10px" }}>Active Plan</span>
          </li>
        </NavLink>
      </ul>
      <ul onClick={() => so?.(false)}>
        {auth?.token ? (
          <NavLink to="/login" onClick={handleLogout}>
            <li>
              <LogoutRoundedIcon color="#2E335B" />
              <span>Log Out</span>
            </li>
          </NavLink>
        ) : (
          <>
            <NavLink to="/login">
              <li>
                <LoginRoundedIcon color="#2E335B" />
                <span>Login</span>
              </li>
            </NavLink>
            <NavLink to="/register">
              <li>
                <HowToRegRoundedIcon color="#2E335B" />
                <span>Register</span>
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </>
  );
};

export default VerticalNav;
