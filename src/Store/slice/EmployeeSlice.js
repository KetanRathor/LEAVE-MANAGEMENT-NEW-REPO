import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Employees: [
    {
      id: 3,
      name: "Pruthviraj Suryawanshi",
      mobile_no: "7890789067",
      email: "pruthvi@gmail.com",
      role: "Employee",
      gender: "Male",
      dob: "2003-06-27",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 1,
      name: "Pratiksha Nimbalkar",
      mobile_no: "7899089087",
      email: "pratiksha@gmail.com",
      role: "Admin",
      gender: "Female",
      dob: "2003-08-17",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 2,
      name: "Trupti Jadhav",
      mobile_no: "6798978458",
      // mobile_no:"8899088967",
      email: "trupti@gmail.com",
      role: "Manager",
      gender: "Female",
      dob: "2003-06-17",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 4,
      name: "Ketan Rathod",
      mobile_no: "6890895679",
      email: "ketan@gmail.com",
      role: "Manager",
      gender: "Male",
      dob: "2000-08-06",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 5,
      name: "Yogesh Patel",
      mobile_no: "6798957898",
      email: "yogesh@gmail.com",
      role: "Admin",
      gender: "Male",
      dob: "2001-01-06",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 6,
      name: "Nupur Tyagi",
      mobile_no: "7845956798",
      email: "nupur@gmail.com",
      role: "Employee",
      gender: "Female",
      dob: "2001-10-01",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 7,
      name: "Mehvish Shaikh",
      mobile_no: "6790676798",
      email: "mehvish@gmail.com",
      role: "Employee",
      gender: "Female",
      dob: "2000-08-06",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 8,
      name: "Abhinandan Ambekar",
      mobile_no: "6798967588",
      email: "abhi@gmail.com",
      role: "Employee",
      gender: "Male",
      dob: "1997-08-06",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 9,
      name: "Shruti Bagde",
      mobile_no: "6797834798",
      email: "shruti@gmail.com",
      role: "Employee",
      gender: "Female",
      dob: "1997-08-02",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 10,
      name: "Prerana Divekar",
      mobile_no: "6798957890",
      email: "prerana@gmail.com",
      role: "Employee",
      gender: "Female",
      dob: "1998-02-06",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 11,
      name: "Abhishek Shinde",
      mobile_no: "6798676798",
      email: "abhi123@gmail.com",
      role: "Employee",
      dob: "1997-08-06",
      gender: "Male",
      manager: "Yogesh Patel",
      department: "HR",
    },
    {
      id: 12,
      name: "Shital Theware",
      mobile_no: "6798956798",
      email: "shital@gmail.com",
      role: "Employee",
      gender: "Female",
      manager: "Yogesh Patel",
      department: "HR",
    },
  ],
  logedInEmp:{},
  userRole:""
};

const employeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState,
  reducers: {
    addEmp:(state,action)=>{
      state.Employees=action.payload;
    },
    getLogedInEmp:(state,action)=>{
      state.logedInEmp=action.payload
    },
    ediEmp:(state,action)=>{
      state.Employees=action.payload
    },
    getRole:(state,action)=>{
      console.log("actionrole",action.payload)
      state.userRole=action.payload
    }
  }
});

// export const {onSelectContact,onMsg,onSearch}=contactSlice.actions
export const {addEmp,editEmp,getRole,getLogedInEmp}=employeeSlice.actions
export default employeeSlice.reducer;
