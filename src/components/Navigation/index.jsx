import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { AiOutlineTeam, AiOutlineAppstore } from "react-icons/ai";
import { FaUserShield, FaSignOutAlt, FaUser, FaBuilding } from "react-icons/fa";
// import { BsBuilding, BsBezier } from 'react-icons/bs'
// import { FaUserShield, FaRegCalendarAlt, FaRegCalendarCheck, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";
import logo from "../../assets/logowhite.png";
// import { getMyCompany } from '../../redux/actions/companyActions'
// import { CircularProgress } from '@chakra-ui/react'

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getMyCompany())
  }, [dispatch]);
  const logout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <Link to="/app/dashboard">
              <AiOutlineAppstore />
              Home
            </Link>
          </li>
          <li>
            <Link to="/app/companies">
              <FaBuilding />
              Companies
            </Link>
          </li>
          <li>
            <Link to="/app/users/company">
              <FaUser />
              Users
            </Link>
          </li>
          <li>
            <Link to="/app/admin">
              <FaUserShield />
              Admin
            </Link>
          </li>
          <li>
            <Link to="/app/demo">
              <AiOutlineTeam />
              Request for Demo
            </Link>
          </li>
          <li>
            <Link to="/app/trial">
              <AiOutlineTeam />
              Trial Account
            </Link>
          </li>
          <li>
            <span onClick={logout}>
              <FaSignOutAlt />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
