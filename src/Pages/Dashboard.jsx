import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import OneRMDashboard from './OneRMDashboard';
import WorkoutVolumeDashboard from './WorkoutVolumeDashboard';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../Utils/UserContext';


export function Dashboard({athleteName, context}){
    const alignmentAthlete = useContext(UserContext)
    console.log("in user context", alignmentAthlete);
    // console.log("in dashboard", alignmentAthlete);
    const [graphAlignment, setGraphAlignment] = useState('1RM');
    const handleGraphChange = (event, newGraphAlignment) => {
        setGraphAlignment(newGraphAlignment);
     
  };
    return (
        <div>
            <List >
                <ListItem sx={{ width: "50%", marginLeft: "auto", marginRight:"auto" }}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={alignmentAthlete} secondary="Member since 4/13/2022" />
                </ListItem>
                </List>
                <ToggleButtonGroup
                      color="primary"
                      value={graphAlignment}
                      exclusive
                      onChange={handleGraphChange}
                      aria-label="Platform"
                      id="date-toggle"
                  >
                      <ToggleButton value="volume">Workout Volume Dashboard </ToggleButton>
                      <ToggleButton value="1RM">1 Rep Max Dashboard</ToggleButton>
                </ToggleButtonGroup>
                {
                  graphAlignment === "1RM" 
                  ? <OneRMDashboard athlete_name={alignmentAthlete} />
                  : <WorkoutVolumeDashboard athlete_name={alignmentAthlete} />
                }
        </div>
    )
}