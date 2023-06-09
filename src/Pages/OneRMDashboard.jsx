import { useState, useEffect } from "react";
import CreateGraph from "../Utils/CreateGraph";
import CreateGraphFriend from "../Utils/CreateGraphFriend";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import new_data_1RM from "../../new_data_1RM.json";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { calculatePriorDate } from "../Utils/DateUtils";
import { parseOneRMData, getMaxOneRMDataPoints } from "../Utils/DataUtils";

function OneRMDashboard({ athlete_name, athlete_list }) {

    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
    const [anchorAthlete, setAnchorAthlete] = useState(null);  
    const [alignmentAthlete, updateAlignmentAthlete] = useState(athlete_list[0]);
    const [checked, setChecked] = useState(false);
    const openAthlete = Boolean(anchorAthlete);

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
        if (!checked) updateAlignmentAthlete(null);
        updateAlignmentAthlete(alignmentAthlete);
        handleChange(null, alignment)
      }, [alignmentAthlete, checked]);

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

    const handleCheck = () => {
        setChecked(!checked);
    }

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

    const handleClickAthlete = (event) => {
        setAnchorAthlete(event.currentTarget);
    };

    const handleMenuItemClickAthlete = (event, index) => {
        setSelectedIndexAthlete(index);
        updateAlignmentAthlete(athlete_list[index])
        setAnchorAthlete(null);
    };

    const handleChange = (event, newAlignment) => {
        if (newAlignment === null) {
            null;
        } else {
            let data = new_data_1RM[athlete_name];
            setAlignment(newAlignment);
            let newDataPoints = parseOneRMData(data[newAlignment]);

            //Friend's data
            if (checked) {
                let friend_data = new_data_1RM[alignmentAthlete];
                let friendDataPoints = parseOneRMData(friend_data[newAlignment], true);
                newDataPoints = newDataPoints.concat(friendDataPoints);
            }

            let maxDataPoints = getMaxOneRMDataPoints(newDataPoints, startDate, checked);
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
            <div>
                <Button
                    id="demo-customized-button"
                    data-testid="workout-options"
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
                            data-testid={"workout-" + option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

            </div>
            <div>
                <h3>This is your estimated 1 rep max progress for {alignment}: </h3>
                <div id="graph">
                    {checked 
                    ? <CreateGraphFriend points={pointsToGraph} dashboardType="1RM" compareBool={checked}/>
                    : <CreateGraph points={pointsToGraph} dashboardType="1RM" compareBool={checked}/>}         
                </div>
            </div>
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
            <div>
                <Checkbox checked={checked} onChange={handleCheck} />
                <h4 style={{ "display": "inline", "paddingRight": "1px" }}> Compare with: </h4>
                <Button
                    id="compare-dropdown"
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
                    {athlete_list[selectedIndexAthlete]}
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
                    {athlete_list.map((option, index) => (
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
            </div>
        </div>
    );
}

export default OneRMDashboard;