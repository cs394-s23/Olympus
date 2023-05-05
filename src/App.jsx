import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from '../firebase';
import { getDatabase, ref, query, orderByChild, get, child } from "firebase/database";


const App = () => {
  const [count, setCount] = useState(0);
  

  const databaseRef = ref(db, 'users');
  const dbUsers = query(databaseRef);
  console.log(dbUsers);
//   onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
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
    </div>
  );
};

export default App;
