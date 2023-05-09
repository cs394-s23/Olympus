import data from "../../data.json";
import data_1RM from "../../data_1RM.json";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function OneRMDashboard() {
    let navigate = useNavigate();
    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [alignment, setAlignment] = useState('');

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
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="Bench Press">Bench Press</ToggleButton>
                <ToggleButton value="Squat">Squat</ToggleButton>
                <ToggleButton value="Deadlift">Deadlift</ToggleButton>
                <ToggleButton value="Military Press">Military Press</ToggleButton>
                <ToggleButton value="Barbell Row">Barbell Row</ToggleButton>
                <ToggleButton value="Front Squat">Front Squat</ToggleButton>
            </ToggleButtonGroup>
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