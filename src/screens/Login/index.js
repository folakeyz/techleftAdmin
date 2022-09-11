import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Input, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaEyeSlash } from "react-icons/fa";
import { userAuth } from "../../redux/actions/userActions";
import { USER_AUTH_RESET } from "../../redux/constants/userConstants";

const Login = () => {
  // Helpers
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Fields OnChange
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Handler
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(userAuth(email, password));
  };
  // Login state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    dispatch({ type: USER_AUTH_RESET });
  }

  // redirect on userlogin success
  useEffect(() => {
    if (userInfo) {
      navigate("/app/dashboard");
    }
  }, [navigate, userInfo]);

  return (
    <div className="home">
      <div className="loginContainer">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={loginHandler}>
          <Input
            Icon={FaEnvelope}
            type="text"
            value={email}
            title="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            Icon={FaEyeSlash}
            type="password"
            value={password}
            title="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            title="Login"
            isFullWidth={true}
            loading={loading}
            color="color2"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
