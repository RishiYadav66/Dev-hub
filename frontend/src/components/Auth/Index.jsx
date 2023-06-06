import React, { useState } from "react";
import { Button } from "@mui/material";
import Google from "../Auth/Google.png";
import "./index.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [register, setregister] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [username, setusername] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleSigninGoogle = () => {
    setloading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setloading(false);
        navigate("/");
        console.log(res);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  };

  const handleRegister = () => {
    seterror("");
    setloading(false);
    if (email === "" || password === "" || username === "") {
      seterror("Required field is missing");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setloading(false);
          navigate("/");
          console.log(username);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          seterror(err.message);
          setloading(false);
        });
    }
  };

  const handleLogin = () => {
    seterror();
    setloading(true);
    if (email === "" || password === "") {
      seterror("Required Fields are missing");
      setloading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setloading(false);
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          seterror(err.code);
          setloading(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        {/* <p>Add another way to log in using any of the following services</p> */}
        <div className="sign-options">
          <div onClick={handleSigninGoogle} className="single-option">
            <img src={Google} alt="google" />
            <p>Login with google</p>
          </div>
          <div className="auth-logic">
            <div className="auth-login-container">
              {register ? (
                <>
                  {/* <div className="sign-option"> */}
                  <div className="input-field">
                    <p>UserName</p>
                    <input
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      props={setusername}
                      type="text"
                    />
                  </div>
                  <div className="input-field">
                    <p>Email</p>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div className="input-field">
                    <p>Password</p>
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <Button
                    onClick={handleRegister}
                    disabled={loading}
                    variant="contained"
                    style={{ marginTop: "8px" }}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                  {/* </div> */}
                </>
              ) : (
                <>
                  {/* <div className="single-option"> */}
                  <div className="input-field">
                    <p>Email</p>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div className="input-field">
                    <p>Password</p>
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <Button
                    onClick={handleLogin}
                    disabled={loading}
                    variant="contained"
                    style={{ marginTop: "8px" }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  {/* </div> */}
                </>
              )}
              <p
                onClick={() => setregister(!register)}
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  color: "#0095ff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {register ? "Login" : "Register"}
              </p>
            </div>
          </div>
          {error !== "" && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
