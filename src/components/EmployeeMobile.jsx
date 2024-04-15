import React from "react";
import {
  Card,
  Typography,
  Grid,
  Button,
  Divider,
  InputBase,
  Box,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EmployeeList() {
  const Navigate = useNavigate();
  const [searchText, setsearchText] = useState("");
  const Employees = useSelector((state) => state.employees.Employees);

  function handleSearchText(event) {
    setsearchText(event.target.value);
  }

  const FilterArray = Employees.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Paper sx={{ height: "100%", mt: "4%"}}>
      <Grid
        container
        sx={{
          width: "100%",
          top: "8%",
          zIndex: 1,
          height: "7vh",
        }}
        position={"sticky"}
      >
        <Grid item xs={10}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
              border: "2px solid rgba(204, 204, 204, 0.5)",
              borderRadius: "10px",
              mr: "1",
            }}
          >
            <InputBase
              sx={{ width: "98%", pl: 2 }}
              placeholder="Search for Employee..."
              onChange={handleSearchText}
            />
            <SearchIcon sx={{ my: "1%", mr: 1.5 }} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              color: "black",
            }}
            onClick={() => {
              Navigate("/Employee/Employees/NewRegistration");
            }}
          >
            <AddIcon />
          </Button>
        </Grid>
        {/* <Divider /> */}
      </Grid>

      <Grid
        container
        sx={{
          overflowY: "auto",
          mx: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          height: "90%",
          paddingTop:"0%",
          mt:"0%"

        }}
      >
        <Grid item xs={12}>
          <Grid
            sx={{
              height: "90%",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              pt: "2%",
              bgcolor: "white",
            }}
          >
            {FilterArray.map((contact) => (
              <Button fullWidth onClick={()=>{Navigate(`/Employee/${contact.id}`)}}>
              <Card
                sx={{ mb: 1, borderRadius: 2, mr: 1, bgcolor:"white", width:"100%"}}
                elevation={3}
                key={contact.id}             
              >              
                <ListItem alignItems="flex-start" mx={1}>           
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar
                          // src={contact.Profile}
                          alt={contact.name}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontWeight: "30",
                          }}
                        >
                          {contact.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ textTransform: "none", color: "black" }}
                        >
                          {contact.email}
                        </Typography>
                      </Grid>
                    </Grid>                 
                </ListItem>               
              </Card>
              </Button>
            ))}
             </Grid>
          </Grid>
      </Grid>
    </Paper>
  );
}