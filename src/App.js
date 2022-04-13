import React from 'react';
import Navigation from './components/naviagtion/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import PagesList from './components/pages/PagesList';
import AddPage from './components/pages/AddPage';
import Box from '@mui/material/Box';
import Login from './components/login/Login';
import { Route,Routes } from 'react-router-dom';
import { UserProfile } from './components/profile/UserProfile';
import { EditProfile } from './components/profile/EditProfile';
import DetailPage from './components/pages/DetailPage';
import Breadcrumbs from './components/naviagtion/Breadcrumbs';
import useSessionToken from './components/login/useSessionToken';
import EditPage from './components/pages/EditPage';
  
  const App = () => {

    const { sessionToken, setSessionToken } = useSessionToken();

    if(!sessionToken) {
      return <Login setSessionToken ={setSessionToken} /> 
    } 
   

  return (    
    <Box sx={{ display: 'flex'}}>
     <Navigation setSessionToken={setSessionToken}/>
     <Box sx={{ pt:12 , px:5 , width: '100%' , height: '100vh' }} bgcolor="primary">
     <Box  sx={{ pb: 3 }}><Breadcrumbs/></Box>
     <Routes>
     <Route exact path="/" element={<Dashboard />} />
     <Route  path="/pages" element={<PagesList />} />
     <Route  path="/add-page" element={<AddPage />} />
     <Route  path="/user-profile" element={<UserProfile />} />
     <Route  path="/edit-profile" element={<EditProfile />} />
     <Route  path="/detail-page" element={<DetailPage />} />
     <Route  path="/edit-page" element={<EditPage />} />
     <Route  path="/login" element={<Login />} />
     </Routes>
     </Box>
    </Box>
  );
}

export default App;