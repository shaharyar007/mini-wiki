import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from "@material-ui/core";
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import PropTypes from 'prop-types';
import {AppBar,Box,CssBaseline,Divider ,Drawer,Tooltip ,IconButton,ListItemIcon,Typography,Toolbar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import LightLogo  from "../../light-logo.svg";
import DarkLogo  from "../../dark-logo.svg";
import { ColorModeContext } from '../../ColorContext';
import { userContext } from '../../UserContext/UserContext';
import ProfileMenu from './ProfileMenu';



const sidebarWidth = 260;
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Navigation = (props) => {
  const userData = useContext(userContext);
  console.log(userData);
  const { mode, toggleMode } = useContext(ColorModeContext);
  // console.log(mode, "mode");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <Toolbar>
      <Box component="img" sx={{ height: '2.4rem', margin: 'auto' }} alt="Your logo."
            src={(mode == 'light') ? LightLogo: DarkLogo}
        />
      </Toolbar>
      <Divider />
      <List>
        
          <ListItem sx={{ px: 5  }} button aria-label="dashboard" component={Link} to="/">
               <ListItemIcon sx={{ justifyContent:'center' }}>
               <DashboardIcon color='secondary'  fontSize="medium"/>
              </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem sx={{ px: 5 }} button aria-label="all pages" component={Link} to="/pages">
               <ListItemIcon sx={{ justifyContent:'center' }}>
               <AutoStoriesRoundedIcon color='secondary' fontSize="medium"/>
              </ListItemIcon>
            <ListItemText  primary={"All Pages"} />
          </ListItem>
          <ListItem sx={{ px: 5 }} button aria-label="account" component={Link} to="/user-profile">
               <ListItemIcon sx={{ justifyContent:'center' }}>
               <PersonIcon color='secondary'  fontSize="medium"/>
              </ListItemIcon>
            <ListItemText  primary={"Account"} />
          </ListItem>
      </List>
      <Divider /> 
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
          // bgcolor: "#363740"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color='secondary' variant="h5" noWrap component="div">
            Mini Wiki
          </Typography> 
          <Typography color='secondary' variant="h5" noWrap component="div">
          </Typography> 
          <Tooltip title="Dark Mode">
          <IconButton sx={{ marginLeft: "auto" }}>
          <NightlightRoundedIcon color='warning' {...label} defaultUnChecked onClick={toggleMode}/>
          </IconButton>
          </Tooltip>
          <Typography></Typography>
          <ProfileMenu setSessionToken={props.setSessionToken} sx={{ marginLeft: "auto" }}/>
        </Toolbar>
       
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
       
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleSidebarToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
          }}
        >
        
          {drawer}
        </Drawer>
      
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth  },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    
    </Box>
  );
}

Navigation.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navigation;
