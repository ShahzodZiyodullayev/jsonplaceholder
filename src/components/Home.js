import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  setJsonplaceholderData,
} from "./../redux/actions/userAction";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./../firebase-config";
import axios from "axios";
import Users from "./Users";
import { Grid, Typography, Button } from "@mui/material";

function Home() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("❤️", user);
        dispatch(setCurrentUser(user));
      } else {
        navigate("/login");
      }
    });
    getData();
  }, []);

  const signOutAction = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const deleteData = async (id) => {
    console.log(id);
    await axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((data) => {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          }),
        );
      });
  };

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        setUsers(data.data);
      });
  };

  const creacteData = async (name, email, website, phone, userId) => {
    await axios({
      method: "post",
      url: `https://jsonplaceholder.typicode.com/users`,
      data: JSON.stringify({
        name,
        email,
        website,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => setUsers((users) => [...users, response.data]));
  };

  return (
    <Grid sx={{ background: "#ECECEC" }}>
      <Grid
        sx={{
          width: "100%",
          height: "7vh",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "space-between",
          p: "10px 30px",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h4">Home</Typography>
        <Button variant="contained" onClick={signOutAction}>
          Sign Out
        </Button>
      </Grid>
      <Users creacteData={creacteData} deleteData={deleteData} users={users} />
    </Grid>
  );
}

export default Home;
