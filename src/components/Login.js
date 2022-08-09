import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./../redux/actions/userAction";
import { useDispatch } from "react-redux";
import login from "./../assets/image/login.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import app from "./../firebase-config";

function Login({ history }) {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setCurrentUser(user));
        alert("Succesfully Signed In!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Grid container>
      <Grid
        item
        md={6}
        sx={{
          height: "100vh",
          background: "#195159",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={login} alt="login" width="500px" height="500px" />
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          height: "100vh",
          background: "#FFBA32",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            width: "500px",
            background: "white",
            borderRadius: "30px",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 10,
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ mb: 5 }}>
              Login
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 5, width: "100%" }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 5, width: "100%" }}
            />
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{ height: "56px", width: "100%" }}
            >
              Login
            </Button>
            <Link
              to="/signup"
              style={{ textDecoration: "none", paddingTop: 20 }}
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
