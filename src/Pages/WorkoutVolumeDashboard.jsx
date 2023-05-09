import data_volume from "../../data_volume.json";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CreateGraph from "../Utils/CreateGraph";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function WorkoutVolumeDashboard() {
    let navigate = useNavigate();
    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [alignment, setAlignment] = useState('');

    const handleChange = (event, newAlignment) => {
        if(newAlignment === null){
            null;
        } else{
            setAlignment(newAlignment);
            let newDataPoints = [];
            data_volume[newAlignment].forEach(item => {
                if(item !== null && item["Volume"] !== ""){
                    let point = new Object();
                    point.weight = parseInt(item["Volume"], 10);
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
            <ToggleButtonGroup 
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
            </ToggleButtonGroup>
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