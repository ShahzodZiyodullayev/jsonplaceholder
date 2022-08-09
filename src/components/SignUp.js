import React, { useCallback, useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { setCurrentUser } from "./../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import login from "./../assets/image/login.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./../firebase-config";

function SignUp({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        dispatch(setCurrentUser(user));
        alert("Succesfully created!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // if (currentUser) {
  //   navigate("/");
  // }

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
              SignUp
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
              onClick={handleSignUp}
              variant="contained"
              sx={{ height: "56px", width: "100%" }}
            >
              SignUp
            </Button>
            <Link
              to="/login"
              style={{ textDecoration: "none", paddingTop: 20 }}
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignUp;
