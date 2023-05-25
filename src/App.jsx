import { useState, useEffect, createContext } from "react";
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
import { Router, BrowserRouter, Routes, Route } from "react-router-dom";
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
import UserContext from './Utils/UserContext';

let athleteName = "Scott";

const App = () => {
  // const UserContext = createContext()
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
    "Sonali",
  ];

  const [anchorAthlete, setAnchorAthlete] = useState(null);
  const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
  const [alignmentAthlete, setAlignmentAthlete] = useState(
    athletes[selectedIndexAthlete]
  );
  const openAthlete = Boolean(anchorAthlete);

  const dbRef = ref(db);
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // Athletes
  useEffect(() => {
    setAlignmentAthlete(athletes[selectedIndexAthlete]);
    console.log("update alignment athlete: ", alignmentAthlete);
  }, [selectedIndexAthlete]);

  useEffect(() => {
    handleChange(null, setAlignmentAthlete);
  }, [alignmentAthlete]);

  const handleClickAthlete = (event) => {
    setAnchorAthlete(event.currentTarget);
  };

  const handleMenuItemClickAthlete = (event, index) => {
    setSelectedIndexAthlete(index);
    setAnchorAthlete(null);
  };

  const handleClose = () => {
    setAnchorAthlete(null);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {
      null;
    } else {
      athleteName = athletes[selectedIndexAthlete];

      setAlignmentAthlete(newAlignment);
      console.log(athletes[selectedIndexAthlete]);
    }
  };

  return (
    <UserContext.Provider value={alignmentAthlete}>
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
                      <Button variant="contained" href="/register">
                        Register
                      </Button>
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
                      <Button variant="contained" href="/dashboard">
                        Continue
                      </Button>
                  </div>
                </div>
              }></Route>
            <Route
              path="/dashboard"
              element={
                <Dashboard athleteName={athleteName} context={UserContext} />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
    </UserContext.Provider>
  );
};

export default App;
