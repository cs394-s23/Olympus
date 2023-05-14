import data_volume from "../../data_volume.json";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import new_data_volume from "../../new_data_volume.json";


function WorkoutVolumeDashboard({athlete_name}) {
    const options = [
        'Push 1',
        'Pull 1',
        'Legs 1',
        'Push 2',
        'Pull 2',
        'Legs 2'
      ];
    let navigate = useNavigate();
    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [alignment, setAlignment] = useState(options[selectedIndex]);
    const open = Boolean(anchorEl);

    useEffect(() => {
        handleChange(null, alignment)
        // let newDataPoints = new_data_1RM[athlete_name];
        // setDataPoints(newDataPoints);
    }, [athlete_name]);

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
            let data = new_data_volume[athlete_name];
            setAlignment(newAlignment);
            let newDataPoints = [];
            data[newAlignment].forEach(item => {
                if(item !== null && item["Volume"] !== "" && item["Volume"] !== "#VALUE!"){
                    let point = new Object();
                    point.weight = parseFloat(item["Volume"]);
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
                } else {
                    maxDataPoints[maxDataPoints.length - 1].weight += item.weight;
                }
            })
            setPointsToGraph(maxDataPoints);
        }
      };


    return(
        <div>
            <button id="switch-dashboard" onClick={()=> navigate("/")}>Go to One Rep Max Dashboard</button>
            <br></br>
            <h2>This is your progress for your workout volume</h2>
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
            {/* <ToggleButtonGroup 
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="Push 1" >Push 1</ToggleButton>
                <ToggleButton value="Pull 1">Pull 1</ToggleButton>
                <ToggleButton value="Legs 1">Legs 1</ToggleButton>
                <ToggleButton value="Push 2">Push 2</ToggleButton>
                <ToggleButton value="Pull 2">Pull 2</ToggleButton>
                <ToggleButton value="Legs 2">Legs 2</ToggleButton>
            </ToggleButtonGroup> */}
            <div>
                <h3>This is your estimated workout volume progress for {alignment}: </h3>
                <div id="graph">
                    <CreateGraph points={pointsToGraph} />
                </div>
            </div>
        </div>
    );
}
export default WorkoutVolumeDashboard