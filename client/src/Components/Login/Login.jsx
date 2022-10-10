import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";

function Login(props) {
  const [logToggle, setLogToggle] = useState("");

  useEffect(() => {
    setLogToggle(true);
  }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [suError, setSUError] = useState(false);
  const [suSucess, setSUSuccess] = useState(false);
  const [suMsg, setSUMsg] = useState("");
  const [logError, setLogError] = useState(false);
  const [logSucess, setLogSuccess] = useState(false);
  const [logMsg, setLogMsg] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  function funcLog() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        setLogMsg("Logged in Sucessfully");
        resolve();
      });
    });
  }

  function funcSig() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        setSUMsg("Signed up successfully");
        resolve();
      });
    });
  }

  function func2() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        // props.setSide(false);
        resolve();
      }, 2000);
    });
  }

  const url = "https://cn-back1.herokuapp.com";
  // Can replace this url of wherever backend deployed so that dont have
  // to replace it everywhere

  function handleLogin() {
    const data = {
      email,
      password,
    };
    console.log(data);
    axios
      .post(url + "/api/auth/login", data)
      .then((res) =>
        res.data.status === "email error"
          ? (console.log(res.data.error),
            setLogMsg(res.data.error),
            setEmailErr(true),
            setPassErr(false))
          : res.data.status === "pass error"
          ? (console.log(res.data.error),
            setLogMsg(res.data.error),
            setEmailErr(false),
            setPassErr(true))
          : res.data.status === "success"
          ? (funcLog().then(func2),
            console.log(res.data.data.id),

            setLogError(false),
            setEmailErr(false),
            setPassErr(false),
            setLogSuccess(true),
            props.setCookie('userid',res.data.data.id),

            window.location.href='/home'
            
            )
          : null
      )
      .catch((err) => console.log(err.message));
  }
  function handleSignup() {
    const data = {
      name,
      email,
      password,
    };
    axios
      .post(url + "/api/auth/signup", data)
      .then((res) =>
        res.data.status === "name error"
          ? (setSUMsg(res.data.error),
            setNameErr(true),
            setEmailErr(false),
            setPassErr(false))
          : res.data.status === "email error"
          ? (setSUMsg(res.data.error),
            setEmailErr(true),
            setNameErr(false),
            setPassErr(false))
          : res.data.status === "pass error"
          ? (setSUMsg(res.data.error),
            setPassErr(true),
            setNameErr(false),
            setEmailErr(false))
          : res.data.status === "success"
          ? (funcSig().then(func2),
            setSUError(false),
            setPassErr(false),
            setNameErr(false),
            setEmailErr(false),
            setSUSuccess(true))
            // props.setCookie("user", res.data.data))
          : null
      )
      .catch((err) => console.log(err.message));
  }
  const [expanded, setExpanded] = useState(false);

  return (
    <>

          <div className="madeBy">
            Made By:
            <br/>
            Suryaansh Rathinam. (Reg. No: 200905288)<br/>
            CSE Section A. Roll No: 51<br/>
            For CN Lab Project
          </div>
          {logToggle ? (
            <div class="modal-content">
              <h5 class="modal-title2" id="exampleModalLongTitle">
                Login
              </h5>

              <div class="modal-body">
                {logSucess && logMsg != "" ? (
                  <div className="success">{logMsg}</div>
                ) : null}

                <form className="form-contact" method="POST" name="myForm">
                  <div className="input-div">
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    {emailErr && logMsg != "" ? (
                      <div className="error">{logMsg}</div>
                    ) : null}
                  </div>

                  <div className="input-div">
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {passErr && logMsg != "" ? (
                      <div className="error">{logMsg}</div>
                    ) : null}
                  </div>
                  <div className="submit-c">
                    <button
                      className="submit-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                      }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="modal-link-c">
                  New here?{" "}
                  <a className="" onClick={() => setLogToggle(false)}>
                    <span className="modal-link">Register Now!</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div class="modal-content">
              <h5 class="modal-title2" id="exampleModalLongTitle">
                Sign Up
              </h5>

              <div class="modal-body">
                {suSucess && suMsg != "" ? (
                  <div className="success">{suMsg}</div>
                ) : null}

                <form className="form-contact" method="POST">
                  <div className="input-div">
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    {nameErr && suMsg != "" ? (
                      <div className="error">{suMsg}</div>
                    ) : null}
                  </div>

                  <div className="input-div">
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    {emailErr && suMsg != "" ? (
                      <div className="error">{suMsg}</div>
                    ) : null}
                  </div>

                  <div className="input-div">
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {passErr && suMsg != "" ? (
                      <div className="error">{suMsg}</div>
                    ) : null}
                  </div>
                  <div className="submit-c">
                    <button
                      className="submit-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignup();
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="modal-link-c">
                  Already a user?{" "}
                  <a className="" onClick={() => setLogToggle(true)}>
                    <span className="modal-link">Login Now!</span>
                  </a>
                </div>
              </div>
            </div>
          )}
    </>
  );
}

export default Login;
