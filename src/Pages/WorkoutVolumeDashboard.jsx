import data_volume from "../../data_volume.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import CreateGraphFriend from "../Utils/CreateGraphFriend";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import new_data_volume from "../../new_data_volume.json";
import { calculatePriorDate, parseDate } from "../Utils/DateUtils";

function WorkoutVolumeDashboard({ athlete_name, athlete_list }) {
    const options = [
        'Push 1',
        'Pull 1',
        'Legs 1',
        'Push 2',
        'Pull 2',
        'Legs 2'
    ];
    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [alignment, setAlignment] = useState(options[selectedIndex]);
    const [dateAlignment, setDateAlignment] = useState('all');
    const [startDate, setStartDate] = useState('00/00/0000');
    
    const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
    const [anchorAthlete, setAnchorAthlete] = useState(null);
    const [alignmentAthlete, updateAlignmentAthlete] = useState(athlete_list[0]);
    const [checked, setChecked] = useState(false);
    const openAthlete = Boolean(anchorAthlete);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!checked) updateAlignmentAthlete(null);
        updateAlignmentAthlete(alignmentAthlete);
        handleChange(null, alignment)
      }, [alignmentAthlete, checked]);

    useEffect(() => {
        handleDateChange(null, dateAlignment)
    }, [startDate]);

    useEffect(() => {
        setAlignment(options[selectedIndex]);
    }, [selectedIndex]);

    useEffect(() => {
        handleChange(null, alignment);
    }, [alignment]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
            let data = new_data_volume[athlete_name];
            setAlignment(newAlignment);
            let newDataPoints = [];
            data[newAlignment].forEach(item => {
                if (item !== null && item["E 1RM"] !== "" && item["Weight"] !== "#VALUE!") {
                    let point = new Object();
                    point.weight = parseFloat(item["Volume"]);
                    point.date = parseDate(item["Date"]);
                    point.date_string = item["Date"];
                    newDataPoints.push(point);
                }
            })
            
            /// Friend's data:
            if (checked) {
                let friend_data = new_data_volume[alignmentAthlete];
                friend_data[newAlignment].forEach(item => {
                    if (item !== null && item["E 1RM"] !== "" && item["Weight"] !== "#VALUE!") {
                        let point = new Object();
                        point.weight_friend = parseFloat(item["Volume"]);
                        point.date = parseDate(item["Date"]);
                        point.date_string = item["Date"];
                        newDataPoints.push(point);
                    }
                })
            }

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
                    } else {
                        if(!maxDataPoints[maxDataPoints.length - 1].weight_friend){
                            maxDataPoints[maxDataPoints.length - 1].weight += item.weight;
                        }
                        else {
                            maxDataPoints[maxDataPoints.length - 1].weight_friend += item.weight_friend;
                        }
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
            <br></br>
            <br></br>
            <div>
                <Button
                    id="demo-customized-button"
                    data-testid = "split-options"
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
                    anchorEl={anchorEl}
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
                            data-testid={"split-options-"+option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                
            </div>
            <div>
                <h3>This is your estimated workout volume progress for {alignment}: </h3>
                <div id="graph">
                    {checked 
                    ? <CreateGraphFriend points={pointsToGraph} dashboardType="Volume" compareBool={checked}/>
                    : <CreateGraph points={pointsToGraph} dashboardType="Volume" compareBool={checked}/>}         
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
                <h4 style={{ "display": "inline", "padding-right": "1px" }}> Compare with: </h4>
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
export default WorkoutVolumeDashboard