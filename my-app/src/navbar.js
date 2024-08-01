import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Navbar.css"; // เพิ่มไฟล์ CSS

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);

    // นำทางตามค่า newValue
    if (newValue === 0) navigate("/scanner");
    if (newValue === 1) navigate("/");
    if (newValue === 2) navigate("/mapper");
  };

  return (
    <Box sx={{ width: "100%" }} className="bottom-navigation">
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction label="Scanner" icon={<QrCodeScannerIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="MAP" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
