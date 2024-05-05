import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Divider,
  ListItem,
  List,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetEmployeesByIdQuery,
  useUploadImageMutation,
} from "../Store/slice/apiEmployeeSlice";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import PeopleIcon from "@mui/icons-material/People";

export default function ViewProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const id = useSelector((state) => state.employees.userId);
  const { data: Emp, isLoading, isError } = useGetEmployeesByIdQuery(id);
  const logedInEmp = Emp || [];
  const [uploadImage] = useUploadImageMutation();
  const fileInputRef = useRef(null);

  const formatDate = (timestampString) => {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${day} ${monthNames[date.getMonth()]} ${year}`;

    return formattedDate;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        await uploadImage({ employeeId: id, imageData: file });
      } catch (error) {
        console.error("Error uploading profile picture: ", error);
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography>Error fetching data. Please try again later.</Typography>
    );
  }

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ padding: 1 }}>
      {/* Horizontal card for profile photo and basic details */}
      <Card elevation={3} sx={{ display: "flex", marginBottom: 1 }}>
        <CardContent>
          <Typography fontWeight="700" variant="h6" ml={20} textAlign={"left"}>
            {logedInEmp.name}
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                sx={{ width: 124, height: 124, mt: -3 }}
                src={
                  logedInEmp.image === null
                    ? ""
                    : URL.createObjectURL(
                        new Blob([new Uint8Array(logedInEmp.image.data)])
                      )
                }
                alt="Profile"
              />

              <EditIcon
                onClick={triggerFileInput}
                sx={{
                  height: "35px",
                  mt: -4,
                  ml: 3,
                  width: "35px",
                  p: 0.5,
                  color: "white",
                  backgroundColor: "blue",
                  border: "3px solid white",
                  borderRadius: "50%",
                  position: "absolute",
                }}
              />

              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item ml={2} textAlign={"left"}>
              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <MailIcon sx={{ height: "20px", mt: 0.2 }} />
                <Typography color="body2">{logedInEmp.email}</Typography>
              </Box>
              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <CallIcon sx={{ height: "20px" }} />
                <Typography variant="body2">
                  {logedInEmp.mobile_number}
                </Typography>
              </Box>
              <Box display={"flex"} gap={0.5} flexDirection={"row"}>
                <PeopleIcon />
                <Typography variant="body1">
                  {logedInEmp.department
                    ? logedInEmp.department.department_name
                    : "-"}
                </Typography>
              </Box>
              {logedInEmp.manager && (
                <Typography variant="body1">
                  Manager Name: {logedInEmp.manager.name}
                </Typography>
              )}
            </Grid>
            <Grid item textAlign={"left"} ml={2}>
              <Typography variant="body1">
                Gender: {logedInEmp.gender}
              </Typography>
              <Typography variant="body1">
                Date Of Birth: {formatDate(logedInEmp.dob)}
              </Typography>
              <Typography variant="body1">Role: {logedInEmp.role}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Individual cards for remaining details */}
      <Grid container spacing={1} height={"60vh"}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <Typography variant="h6" p={1}>
              Projects
            </Typography>
            <Divider />
            <List sx={{ overflowY: "auto", maxHeight: "400px" }}>
              {logedInEmp.project &&
                logedInEmp.project.map((Project, index) => (
                  <Box>
                    <ListItem key={index} variant="body1" sx={{ px: 2 ,py:1.3}}>
                      <ListItemText>{Project.name}</ListItemText>
                      <Box
                        sx={{
                          bgcolor:
                            Project.status === "active" ? "#CCFFCC" : "#D3D3D3",
                          color:
                            Project.status === "active" ? "008800" : "gray",
                          width: "60px",
                          p: "1px",
                          borderRadius: "6px",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                      >
                        {Project.status.charAt(0).toUpperCase() +
                          Project.status.slice(1)}
                      </Box>
                    </ListItem>
                    {index !== logedInEmp.project.length - 1 && <Divider />}
                  </Box>
                ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <Typography variant="h6" p={1}>
              Inventory
            </Typography>
            <Divider />
            <List sx={{ overflowY: "auto", maxHeight: "400px" }}>
              {logedInEmp.inventories &&
                logedInEmp.inventories.map((inventory, index) => (
                  <div key={index}>
                    <ListItem sx={{ px: 2 ,pb:0.5,pt:0.2}}>
                      <Box display={"flex"} flexDirection={"column"}>
                      <Typography variant="subtitle1">
                        {inventory.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Serial Number : {inventory.serial_number}
                      </Typography>
                      </Box>
                    </ListItem>
                    {index !== logedInEmp.inventories.length - 1 && <Divider />}
                  </div>
                ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
