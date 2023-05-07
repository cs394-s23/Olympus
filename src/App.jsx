import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from '../firebase';
import { getDatabase, ref, query, orderByChild, get, child } from "firebase/database";
import { Router, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Utils/Layout';
import OneRMDashboard from './Pages/OneRMDashboard';
import WorkoutVolumeDashboard from './Pages/WorkoutVolumeDashboard';


const App = () => {
  const [count, setCount] = useState(0);

  const dbRef = ref(db);
  get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return (
    <div className="App">
      {/* <OneRMDashboard /> */}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<OneRMDashboard />}/>
            <Route path="/WorkoutVolumeDashboard" element={<WorkoutVolumeDashboard />} >
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
