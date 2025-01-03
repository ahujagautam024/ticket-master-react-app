import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./App.css";

function Navigation() {
  const navItems = [
    { label: "Home", path: "/ticket-master-react-app", exact: true },
    { label: "Events", path: "/events" },
    { label: "Attractions", path: "/attractions" },
    { label: "Venues", path: "/venues" },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ticket Master
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.path}
              end={item.exact}
              sx={{
                color: "white",
                "&.active": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                mx: 1,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
