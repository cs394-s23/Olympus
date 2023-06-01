import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OneRMDashboard from './OneRMDashboard';
import WorkoutVolumeDashboard from './WorkoutVolumeDashboard';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Utils/UserProvider';
import { useNavigate } from 'react-router-dom';

export function Dashboard({ athleteName, athleteList }) {
  const [anchorAthlete, setAnchorAthlete] = useState(null);
  const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
  // const {alignmentAthlete} = useContext(UserContext);

  const [alignmentAthlete, updateAlignmentAthlete] = useState(athleteList[0]);
  const [checked, setChecked] = useState(false);
  const [friend, setFriend] = useState(null);

  const openAthlete = Boolean(anchorAthlete);
  const navigate = useNavigate();
  const [graphAlignment, setGraphAlignment] = useState('1RM');
  const handleGraphChange = (event, newGraphAlignment) => {
    setGraphAlignment(newGraphAlignment);

  };

  useEffect(() => {
    if (!checked) setFriend(null);
    setFriend(alignmentAthlete);
  }, [alignmentAthlete, checked]);

  const handleClickAthlete = (event) => {
    setAnchorAthlete(event.currentTarget);
  };

  const handleMenuItemClickAthlete = (event, index) => {
    setSelectedIndexAthlete(index);
    updateAlignmentAthlete(athleteList[index])
    setAnchorAthlete(null);
  };

  const handleClose = () => {
    setAnchorAthlete(null);
  };

  const handleCheck = () => {
    setChecked(!checked);
  }

  return (
    <div>
      {/* <Button onClick={() => navigate("/")}>
        Switch User

      </Button> */}
      <List >
        <ListItem sx={{ width: "50%", marginLeft: "auto", marginRight: "auto" , marginBottom: "-15px"}}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={athleteName} secondary="Member since 4/13/2022" />
          {/* <ListItem></ListItem> */}
        </ListItem>
        <ListItem sx={{ width: "50%", marginLeft: "25%", marginRight: "20%", paddingLeft: "60px"}}>
            <Button onClick={() => navigate("/")}>
              Switch User
            </Button>
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
        <ToggleButton value="volume" data-testid="dashboard-toggle-volume">Workout Volume Dashboard </ToggleButton>
        <ToggleButton value="1RM" data-testid="dashboard-toggle-e1rm">1 Rep Max Dashboard</ToggleButton>
      </ToggleButtonGroup>


      {
        graphAlignment === "1RM"
          ? <OneRMDashboard athlete_name={athleteName} athlete_list={athleteList} />
          : <WorkoutVolumeDashboard athlete_name={athleteName} athlete_list={athleteList} />
      }
    </div>
  )
}