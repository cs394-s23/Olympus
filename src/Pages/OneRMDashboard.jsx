import data_1RM from "../../data_1RM.json";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { set } from "firebase/database";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function OneRMDashboard() {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [alignment, setAlignment] = useState(options[selectedIndex]);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setAlignment(options[selectedIndex]);
    }, [selectedIndex]);

    useEffect(() => {
        handleChange(null, alignment);
    }, [alignment]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  

    const handleChange = (event, newAlignment) => {
        if(newAlignment === null){
            null;
        } else{
            setAlignment(newAlignment);
            let newDataPoints = [];
            data_1RM[newAlignment].forEach(item => {
                if(item !== null && item["E 1RM"] !== ""){
                    let point = new Object();
                    point.e1rm = parseInt(item["E 1RM"], 10);
                    point.weight = parseInt(item["Weight"], 10);
                    point.reps = parseInt(item["Reps"], 10);
                    point.date = item["Date"];
                    newDataPoints.push(point);
                }
            })
            let maxDataPoints = [];
            newDataPoints.forEach(item => {
                if(maxDataPoints.length === 0){
                    maxDataPoints.push(item);
                } else if(maxDataPoints[maxDataPoints.length - 1].date !== item.date){
                    maxDataPoints.push(item);
                } else if (maxDataPoints[maxDataPoints.length - 1].e1rm < item.e1rm){
                    maxDataPoints[maxDataPoints.length - 1] = item;
                }
            })
            setPointsToGraph(maxDataPoints);
        }
      };

    return (
        <div>
            <button id="switch-dashboard" onClick={()=>navigate("/WorkoutVolumeDashboard")}>Go to Workout Volume Dashboard</button>
            <br></br>
            <h2>This is your progress for your estimated 1 rep maxes</h2>
            <h3>Select your exercise here:</h3>
            <br></br>
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
                        >
                            {option}
                        </MenuItem>
                        ))}
                    </Menu>
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