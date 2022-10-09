import React, { useState } from "react";
import logo from "../assets/buslala.jpeg";
import axios from "axios";
import { setUserSession } from "../utils/Common";

const Container =
  "bg-slate-200 w-72 h-12 flex justify-center items-center rounded-md";
const InputContainer = "h-8 w-64 outline-none p-2 bg-transparent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://coral-app-5v83l.ondigitalocean.app/api/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "access-control-allow-origin": "*",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setUserSession(res.data.token, res.data.user);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Something went wrong");
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  return (
    <form
      className="flex items-center justify-evenly h-screen flex-col bg-[#969557]"
      onSubmit={handleFormSubmit}
    >
      <img src={logo} height="200px" width="200px" />
      <div className="h-[460px] w-[400px] bg-white rounded-xl flex items-center justify-evenly flex-col p-6">
        <div>
          <h1 className="text-3xl mb-2">Username</h1>
          <div className={Container}>
            <input
              type="text"
              placeholder="Enter Username"
              className={InputContainer}
              onChange={handleEmailChange}
              value={email}
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl mb-2">Password</h1>
          <div className={Container}>
            <input
              type="password"
              placeholder="Enter your Password"
              className={InputContainer}
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
        </div>
        <button className="bg-slate-400 w-24 h-10 rounded-md">Login</button>
      </div>
    </form>
  );
};

export default Login;
