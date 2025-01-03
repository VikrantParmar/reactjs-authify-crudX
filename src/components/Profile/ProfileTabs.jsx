import React, { useState, useEffect } from "react";
import { Box, AppBar, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileForm from "@/components/Profile/ProfileForm";
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  // Determine if the screen is small (smaller than 'md' breakpoint)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const path = newValue === 0 ? "/my-profile" : "/update-password";
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/my-profile") {
      setActiveTab(0);
    } else if (location.pathname === "/update-password") {
      setActiveTab(1);
    }
  }, [location.pathname]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          my: 5,
        }}
      >
        {/* Left-side Vertical Tabs */}
        <Box
          sx={{
            minWidth: isSmallScreen ? "100%" : 200, // Adjust width for small screens
            height: isSmallScreen ? "auto" : "300px", // Adjust height for small screens
            mr: isSmallScreen ? 0 : 3, // Remove margin for small screens
            mb: isSmallScreen ? 2 : 0, // Add margin-bottom for small screens
          }}
        >
          <AppBar position="sticky" color="inherit">
            <Tabs
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Profile settings tabs"
              sx={{
                borderRight: !isSmallScreen ? 2 : 0,
                borderColor: "divider",
              }}
            >
              <Tab
                label="Update Profile"
                className={activeTab === 0 ? "activeTab" : ""}
              />
              <Tab
                label="Change Password"
                className={activeTab === 1 ? "activeTab" : ""}
              />
            </Tabs>
          </AppBar>
        </Box>

        {/* Right-side Content (Form) */}
        <Box sx={{ flexGrow: 1 }}>
          {activeTab === 0 && <ProfileForm />}
          {activeTab === 1 && <ChangePasswordForm />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
