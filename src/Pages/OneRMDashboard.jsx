import data_1RM from "../../data_1RM.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { set } from "firebase/database";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import new_data_1RM from "../../new_data_1RM.json";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { calculatePriorDate, parseDate } from "../Utils/DateUtils";

function OneRMDashboard({ athlete_name }) {
    let navigate = useNavigate();
    const [pointsToGraph, setPointsToGraph] = useState([]);

    const options = [
        'Bench Press',
        'Squat',
        'Deadlift',
        'Military Press',
        'Barbell Row',
        'Front Squat'
    ];

    const [anchorWorkout, setAnchorWorkout] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [alignment, setAlignment] = useState(options[selectedIndex]);
    const [dateAlignment, setDateAlignment] = useState('all');
    const [startDate, setStartDate] = useState('00/00/0000');
    const open = Boolean(anchorWorkout);

    useEffect(() => {
        handleChange(null, alignment)
    }, [athlete_name]);

    useEffect(() => {
        handleDateChange(null, dateAlignment)
    }, [startDate]);

    // Exercises
    useEffect(() => {
        setAlignment(options[selectedIndex]);
    }, [selectedIndex]);

    useEffect(() => {
        handleChange(null, alignment);
    }, [alignment]);

    const handleClick = (event) => {
        setAnchorWorkout(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorWorkout(null);
    };

    const handleClose = () => {
        setAnchorWorkout(null);
    };

    const handleChange = (event, newAlignment) => {
        if (newAlignment === null) {
            null;
        } else {
            let data = new_data_1RM[athlete_name];
            setAlignment(newAlignment);
            let newDataPoints = [];
            data[newAlignment].forEach(item => {
                if (item !== null && item["E 1RM"] !== "" && item["Weight"] !== "#VALUE!") {
                    let point = new Object();
                    point.e1rm = parseFloat(item["E 1RM"]);
                    point.weight = parseFloat(item["Weight"]);
                    point.reps = parseInt(item["Reps"], 10);
                    point.date = parseDate(item["Date"]);
                    point.date_string = item["Date"];
                    newDataPoints.push(point);
                }
            })

            let maxDataPoints = [];
            newDataPoints.forEach(item => {
                var itemDate = new Date(item.date_string)
                var minDate = new Date(startDate);
                if (itemDate < minDate) {
                    null;
                }
                else {
                    if (maxDataPoints.length === 0) {
                        maxDataPoints.push(item);
                    } else if (maxDataPoints[maxDataPoints.length - 1].date_string !== item.date_string) {
                        maxDataPoints.push(item);
                    } else if (maxDataPoints[maxDataPoints.length - 1].e1rm < item.e1rm) {
                        maxDataPoints[maxDataPoints.length - 1] = item;
                    }
                }
            })
            maxDataPoints.sort((a, b) => a.date - b.date)
            setPointsToGraph(maxDataPoints);
        }
    };

    const handleDateChange = (event, newDateAlignment) => {
        if (newDateAlignment === null) {
            null;
        } else {
            setDateAlignment(newDateAlignment);
            if (newDateAlignment === "all") {
                setStartDate("00/00/0000")
            }
            else if (newDateAlignment === "3 month") {
                setStartDate(calculatePriorDate(3));
            }
            else if (newDateAlignment === "6 month") {
                setStartDate(calculatePriorDate(6));
            }
        }
        handleChange(null, alignment);
    };

    return (
        <div>
            <button id="switch-dashboard" onClick={() => navigate("/WorkoutVolumeDashboard")}>Go to Workout Volume Dashboard</button>
            <br></br>
            <h2>This is your progress for your estimated 1 rep maxes</h2>
            <br></br>
            <h3>Select your exercise here:</h3>
            <div>
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {options[selectedIndex]}
                </Button>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorWorkout}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <ToggleButtonGroup
                    color="primary"
                    value={dateAlignment}
                    exclusive
                    onChange={handleDateChange}
                    aria-label="Platform"
                    id="date-toggle"
                >
                    <ToggleButton value="all">All time</ToggleButton>
                    <ToggleButton value="6 month">Last 6 months</ToggleButton>
                    <ToggleButton value="3 month">Last 3 months</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <h3>This is your estimated 1 rep max progress for {alignment}: </h3>
                <div id="graph">
                    <CreateGraph points={pointsToGraph} />
                </div>
            </div>
        </div>
    );
}

export default OneRMDashboard;