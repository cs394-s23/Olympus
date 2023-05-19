import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from '../firebase';
import { getDatabase, ref, query, orderByChild, get, child } from "firebase/database";
import { Router, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Utils/Layout';
import OneRMDashboard from './Pages/OneRMDashboard';
import WorkoutVolumeDashboard from './Pages/WorkoutVolumeDashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Register } from './Pages/Register';
import './style.scss'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const App = () => {
  const [count, setCount] = useState(0);

  const athletes = [
    'Scott',
    'Kevin',
    'Kahlin',
    'Jake',
    'Mark',
    'Brent',
    'Cate',
    'Madi',
    'Leigh',
    'Chaitra',
    'Mariel',
    'Sonali'
  ];

  const [anchorAthlete, setAnchorAthlete] = useState(null);
  const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
  const [alignmentAthlete, setAlignmentAthlete] = useState(athletes[selectedIndexAthlete]);
  const openAthlete = Boolean(anchorAthlete);
  const [graphAlignment, setGraphAlignment] = useState('1RM');

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
      mode: 'dark',
    },
  });

  // Athletes
  useEffect(() => {
    setAlignmentAthlete(athletes[selectedIndexAthlete]);
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
    if(newAlignment === null){
        null;
    } else{
        setAlignmentAthlete(newAlignment);
    }
  };

  const handleGraphChange = (event, newGraphAlignment) => {
      setGraphAlignment(newGraphAlignment);
   
};

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
  
      <div>
        {/* <Button variant="contained" href="/register">Register</Button> */}
        <Button
            id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClickAthlete}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {athletes[selectedIndexAthlete]}
            </Button>
            <Menu
              id="lock-menu"
              anchorEl={anchorAthlete}
              open={openAthlete}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {athletes.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndexAthlete}
                  onClick={(event) => handleMenuItemClickAthlete(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
        </div>
        <BrowserRouter>
          
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<OneRMDashboard athlete_name={athletes[selectedIndexAthlete]} />} />
              <Route path="/WorkoutVolumeDashboard" element={<WorkoutVolumeDashboard athlete_name={athletes[selectedIndexAthlete]} />} >
              </Route> */}
              <ToggleButtonGroup
                    color="primary"
                    value={graphAlignment}
                    exclusive
                    onChange={handleGraphChange}
                    aria-label="Platform"
                    id="date-toggle"
                >
                    <ToggleButton value="volume">Workout Volume</ToggleButton>
                    <ToggleButton value="1RM">1 Rep Max</ToggleButton>
              </ToggleButtonGroup>
                <Route index element={
                  graphAlignment === "1RM" 
                  ? <OneRMDashboard athlete_name={athletes[selectedIndexAthlete]} />
                  : <WorkoutVolumeDashboard athlete_name={athletes[selectedIndexAthlete]} />
                }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
   
  );
};

export default App;
