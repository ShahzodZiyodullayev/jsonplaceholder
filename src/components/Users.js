import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { color } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

function Users({ creacteData, deleteData, users }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);

  const profileAvatar = async () => {
    await axios.get("https://randomuser.me/api/?results=30").then((res) => {
      setImages(res.data.results);
    });
  };
  console.dir(users);
  useEffect(() => {
    profileAvatar();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid
      sx={{
        mt: "8vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          InputProps={{
            type: "text",
          }}
          required={true}
          label="Name"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "250px" }}
        />
        <TextField
          InputProps={{
            type: "email",
          }}
          required={true}
          label="Email"
          onChange={(e) => setBody(e.target.value)}
          sx={{ mx: 5, width: "250px" }}
        />
        <TextField
          InputProps={{
            type: "url",
          }}
          required={true}
          label="Website"
          onChange={(e) => setWebsite(e.target.value)}
          sx={{ width: "250px" }}
        />
        <TextField
          InputProps={{
            type: "tel",
          }}
          required={true}
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mx: 5, width: "250px" }}
        />
        <TextField
          InputProps={{
            type: "submit",
            onClick: () => {
              let randId = Math.floor(Math.random() * 20);
              creacteData(title, body, website, phone, randId);
            },
          }}
          sx={{ height: "56px", width: "250px", cursor: "pointer" }}
        >
          Create User
        </TextField>
      </form>
      <Grid sx={{ width: "65%", py: 4 }}>
        <Grid
          container
          wrap="wrap"
          rowSpacing={8}
          columnSpacing={{ xs: 1, sm: 2, md: 8 }}
        >
          {users &&
            users.map((item, index) => (
              <Grid key={index} item xs={6} xl={6} lg={12} md={12}>
                <Item
                  sx={{
                    position: "relative",
                    p: 0,
                    background: "white",
                    color: "white",
                    textAlign: "left",
                    minHeight: "100px",
                    minWidth: "500px",
                    height: "330px",
                    // cursor: "pointer",
                    boxShadow:
                      "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    "&:hover": {
                      boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                    },
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "30px",
                      color: "#000",
                      position: "absolute",
                      right: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      deleteData(item.id);
                      profileAvatar();
                    }}
                  />
                  {/* <NavLink
                    to={`edit/${item.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                  > */}
                  <Grid container height="100%">
                    <Grid
                      item
                      md={4.5}
                      sx={{
                        flexDirection: "column",
                        display: "flex",
                        background: "#0293D6",
                        height: "100%",
                      }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50%",
                        }}
                      >
                        {images && images.length > 0 ? (
                          <Avatar
                            alt="Remy Sharp"
                            src={images[index].picture.large}
                            sx={{ width: 150, height: 150, mt: 6 }}
                          />
                        ) : (
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                          />
                        )}
                      </Grid>
                      <Grid
                        sx={{
                          display: "grid",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          height: "50%",
                          py: 4,
                          px: 1,
                        }}
                      >
                        <EmailIcon />
                        <LanguageIcon />
                        <LocalPhoneIcon />
                      </Grid>
                    </Grid>
                    <Grid item md={7.5}>
                      <Grid
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          height: "50%",
                        }}
                      >
                        <Typography
                          variant="h4"
                          fontFamily="sans-serif"
                          color="#0293D6"
                          sx={{ letterSpacing: "-2px" }}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{
                          display: "grid",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          height: "50%",
                          py: 4,
                          px: 1,
                        }}
                      >
                        <Typography fontFamily="sans-serif" color="#000000">
                          {item.email}
                        </Typography>
                        <Typography fontFamily="sans-serif" color="#000000">
                          {item.website}
                        </Typography>
                        <Typography fontFamily="sans-serif" color="#000000">
                          {item.phone}
                        </Typography>
                      </Grid>
                      {/* <Typography variant="caption" fontSize={18} color="#000">
                        {item.email}
                      </Typography> */}
                      {/* <Button variant="contained" sx={{ width: "100px" }}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ width: "100px", ml: 1 }}
                        color="error"
                        onClick={() => deleteData(item.id)}
                      >
                        Delete
                      </Button> */}
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Users;
