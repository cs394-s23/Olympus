import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [alignmentAthlete, setAlignmentAthlete] = useState('Scott'); // Initial value

  const updateAlignmentAthlete = (newAlignmentAthlete) => {
    setAlignmentAthlete(newAlignmentAthlete);
  };

  return (
    <UserContext.Provider value={{ alignmentAthlete, updateAlignmentAthlete }}>
      {children}
    </UserContext.Provider>
  );
};