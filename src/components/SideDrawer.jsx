import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import { People } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import EventIcon from "@mui/icons-material/Event";
import ListItemIcon from "@mui/material/ListItemIcon"
import Toolbar from "@mui/material/Toolbar"
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom'


export default function SideDrawer() {
  let Navigate=useNavigate()
  let path=useLocation().pathname
  let selected=path.substring(path.lastIndexOf('/') + 1)
  let selectedItem;

  if(selected){
    selectedItem=selected
  }else{
    selectedItem="Dashboard"
  }

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Dashboard", "Leave Request", "History", "Holidays", "Employees"].map(
          (text, index) => (
<<<<<<< HEAD

            <ListItem key={text} disablePadding sx={{backgroundColor : text.split(" ").join("")===selectedItem ? "#E0E0E0" : "white"}}>
=======
            <ListItem key={text} disablePadding onClick={()=>onSelect(index)} sx={{backgroundColor : selectedItem===index ? "#E0E0E0" : "white"}}>
>>>>>>> c9ec6371c1e4107d3321f52f320843b04c841a00
              <ListItemButton
              onClick={index === 0 ? () => Navigate('/Employee/Dashboard') : 
              index=== 1 ? ()=> Navigate('/Employee/LeaveRequest') : 
              index===2 ? ()=> Navigate('/Employee/History'):
              index===3 ? ()=> Navigate('/Employee/Holidays'):
              ()=>Navigate('/Employee/Employees')

            }
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <SendIcon />
                  ) : index === 2 ? (
                    <HistoryIcon />
                  ) : index === 3 ? (
                    <EventIcon />
                  ) : (
                    <People />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
}
