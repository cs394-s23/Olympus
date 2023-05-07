import data from "../../data.json";
import { useState , useEffect} from "react";
import React from 'react';
import CreateGraph from "../Utils/CreateGraph";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function OneRMDashboard() {
    const [exerciseInfo, setExerciseInfo] = useState([]);
    const [pointsToGraph, setPointsToGraph] = useState([]);
    const [alignment, setAlignment] = useState('');
    const oneRMSArray = [];
    const dataPoints = [];

    // Get all exercises
    var exercises;
    Object.entries(data).forEach(item => {
        if (item[0] === "Exercise Name") {
            exercises = item[1];
        }
    });

    //Get all estimated 1 rep maxes (for all exercises)
    var estimated1rm;
    Object.entries(data).forEach(item => {
        if (item[0] === "E 1RM") {
            estimated1rm = item[1];
        }
    });

    function filterForExercise(name) {
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});

        var filtered = Object.filter(exercises, ex => ex === name);
        setExerciseInfo(filtered);

        Object.keys(filtered).forEach(key => {
            oneRMSArray.push(estimated1rm[key]);
        })

        getDataPoints();
    }

    function getDataPoints() {
        oneRMSArray.forEach(item => {
            if(item === null){
                null;
            }
            else {
            let point = new Object();
            point.pv = item;
            dataPoints.push(point);
            }
        })
        setPointsToGraph(dataPoints);
    }
    const handleChange = (event, newAlignment) => {
        if(newAlignment === null){
            null;
        } else{
            console.log(newAlignment);
            setAlignment(newAlignment);
            filterForExercise(newAlignment);
        }
      };

    return (
        <div>
            <h2>Select your exercise here:</h2>
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
                <ToggleButton value="Military Press">Military Press</ToggleButton>
                <ToggleButton value="Front Squat">Front Squat</ToggleButton>
            </ToggleButtonGroup>
            {Object.keys(exerciseInfo).length > 0 ? 
            <div>
                <h3>This is your estimated 1 rep max progress for {alignment}: </h3>
                <CreateGraph points={pointsToGraph} id="graph"/>
            </div>
            : null} 
        </div>
    );
}

export default OneRMDashboard;