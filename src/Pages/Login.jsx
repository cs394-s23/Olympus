// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import Button from '@mui/material/Button';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useState, useEffect } from 'react';

// export function Login(){
//     const athletes = [
//         'Scott',
//         'Kevin',
//         'Kahlin',
//         'Jake',
//         'Mark',
//         'Brent',
//         'Cate',
//         'Madi',
//         'Leigh',
//         'Chaitra',
//         'Mariel',
//         'Sonali'
//       ];

//     const [anchorAthlete, setAnchorAthlete] = useState(null);
//     const [selectedIndexAthlete, setSelectedIndexAthlete] = useState(0);
//     const [alignmentAthlete, setAlignmentAthlete] = useState(athletes[selectedIndexAthlete]);
//     const openAthlete = Boolean(anchorAthlete);

//         // Athletes
//     useEffect(() => {
//         setAlignmentAthlete(athletes[selectedIndexAthlete]);
//     }, [selectedIndexAthlete]);

//     useEffect(() => {
//         handleChange(null, setAlignmentAthlete);
//     }, [alignmentAthlete]);

//     const handleClickAthlete = (event) => {
//         setAnchorAthlete(event.currentTarget);
//     };

//     const handleMenuItemClickAthlete = (event, index) => {
//         setSelectedIndexAthlete(index);
//         setAnchorAthlete(null);
//     };

//     const handleClose = () => {
//         setAnchorAthlete(null);
//     };
//     return (


//     )
// }