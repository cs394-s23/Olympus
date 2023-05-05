import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from '../firebase';
import { getDatabase, ref, query, orderByChild, get, child } from "firebase/database";
import  {Example} from './exampleChart.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
      <h1>hi</h1>
      <Example />
    </div>
  );
};

export default App;
