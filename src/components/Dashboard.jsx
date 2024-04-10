import React from "react";
import { Grid } from "@mui/material";
import UseReponsive from "../hooks/UseResponsive";
import LeavePolicy from "./LeavePolicy";
import { LeaveBalanceMobile } from "./LeaveBalanceMobile";
import { LeaveBalanceDeskTop } from "./LeaveBalanceDeskTop";
import UpcomingHolidaysDesktop from "./UpcomingHolidaysDesktop";
import PendingReq from "./PendingReq";
import ApproverCard from "./ApproverCard";
import PendingReqMobile from "./PendingReqMobile";
import UpcomingHolidaysMobile from "./UpcomingHolidaysMobile";

export default function Dashboard({ role }) {
  const responsive = UseReponsive();

  return (
    <Grid container width="100%" px={1} height="89.5vh">
      <Grid container width="100%" >
        <Grid item xs={12}  >
          {responsive.isMobile ? (
            <LeaveBalanceMobile />
          ) : (
            <LeaveBalanceDeskTop />
          )}
        </Grid>

        {responsive.isMobile && (
          <UpcomingHolidaysMobile/>
        )}

        <Grid container columnSpacing={1}>
          {(role === "Admin" || role === "Manager") && (responsive.isDesktop||responsive.isLaptop||responsive.isTablet) ? (
            <Grid item sm={9} md={9} lg={9}>
              <PendingReq />
            </Grid>
          ) : (role === "Admin" || role === "Manager") &&(responsive.isMobile)&& (
            <Grid item xs={12}>
              <PendingReqMobile />
            </Grid>
          )}

          {(responsive.isDesktop || responsive.isLaptop || responsive.isTablet) && (role==="Admin" || role==="Manager")? (<Grid
            item
            sm={3}
            md={3}
            lg={3}
          >
            <UpcomingHolidaysDesktop />
          </Grid>) :
          (responsive.isDesktop || responsive.isLaptop || responsive.isTablet) && (role==="Employee")&&
          (
            <Grid item sm={5.5} md={5.5} lg={5.5}>
              <UpcomingHolidaysDesktop role={role}/>
            </Grid>
          )}

          {/* Approver Card-"For Employee"  */}
          {role !== "Admin" && role !== "Manager" && (
            <Grid
              item
              xs={12}
              sm={6.5}
              md={6.5}
              lg={6.5}
              mt={responsive.isMobile && 1}
              textAlign="left"
            >
              <ApproverCard />
              <Grid container>
                <LeavePolicy />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
