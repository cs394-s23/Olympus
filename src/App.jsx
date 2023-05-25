import { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { db } from "../firebase";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  get,
  child,
} from "firebase/database";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Utils/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Register } from "./Pages/Register";
import "./style.scss";
import { Dashboard } from "./Pages/Dashboard";
import { UserContext } from "./Utils/UserProvider";


const App = () => {
  const [count, setCount] = useState(0);

  const athletes = [
    "Scott",
    "Kevin",
    "Kahlin",
    "Jake",
    "Mark",
    "Brent",
    "Cate",
    "Madi",
    "Leigh",
    "Chaitra",
    "Mariel",
    "Jordan",
  ];

  const [anchorAthlete, setAnchorAthlete] = useState(null);
  const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
  const {alignmentAthlete, updateAlignmentAthlete} = useContext(UserContext)

  const openAthlete = Boolean(anchorAthlete);

  const dbRef = ref(db);
  get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });


  const handleClickAthlete = (event) => {
    setAnchorAthlete(event.currentTarget);
  };

  const handleMenuItemClickAthlete = (event, index) => {
    setSelectedIndexAthlete(index);
    updateAlignmentAthlete(athletes[index])
    setAnchorAthlete(null);
  };

  const handleClose = () => {
    setAnchorAthlete(null);
  };

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <div></div>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <div>
                  <Layout />
                  <div>
                      {/* <Button variant="contained" href="/register">
                        Register
                      </Button> */}
                      <h1>Choose a user:</h1>
                      <Button
                        id="athelete-menu"
                        aria-controls={
                          open ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        variant="outlined"
                        disableElevation
                        onClick={handleClickAthlete}
                        endIcon={<KeyboardArrowDownIcon />}
                        data-testid="athelete-menu">
                        {athletes[selectedIndexAthlete]}
                      </Button>
                      <Menu
                        id="lock-menu"
                        anchorEl={anchorAthlete}
                        open={openAthlete}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "lock-button",
                          role: "listbox",
                        }}>
                        {athletes.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndexAthlete}
                            onClick={(event) =>
                              handleMenuItemClickAthlete(event, index)
                            }
                            data-testid={"athelete-menu-item-" + option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                      <br />
                      <br />
                      <Link to="/dashboard">
                      <Button variant="contained">
                        Continue
                      </Button>
                      </Link>
                  </div>
                </div>
              }></Route>
            <Route
              path="/dashboard"
              element={
                <Dashboard athleteName = {alignmentAthlete} athleteList = {athletes.filter(name => name !== alignmentAthlete)}/>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
