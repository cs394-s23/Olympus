import data from "../../data.json";
import { useState , useEffect} from "react";
import CreateGraph from "../Utils/CreateGraph";

function OneRMDashboard() {
    const [exerciseInfo, setExerciseInfo] = useState([]);
    const [pointsToGraph, setPointsToGraph] = useState([]);
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

    function filterForExercise() {
        const name = document.getElementById("exercise-name").value;
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});

        var filtered = Object.filter(exercises, ex => ex === name);
        console.log(filtered);
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

    return (
        <div>
            <h2>Enter your exercise name here (case sensitive):</h2>
            <input type="text" name="exercise name" id="exercise-name" placeholder="Ex. Bench Press, Squat, etc" /> <br></br><br></br>
            <button id="button" onClick={() => filterForExercise()}>Go</button>
            <br></br>
            {Object.keys(exerciseInfo).length > 0 ? 
            <div>
                <h3>This is your estimated 1 rep max progress for {document.getElementById("exercise-name").value}: </h3>
                <CreateGraph points={pointsToGraph} />
            </div>
            : null} 
        </div>
    );
}

export default OneRMDashboard;