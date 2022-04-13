import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CardActions,Box,IconButton,Typography,Tooltip, Card, CardContent, CardHeader, Divider, Grid, TextField} from '@mui/material';

export const UserProfile = (props) => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios.get(`https://624f8b458c5bf4a1054c154e.mockapi.io/users`)
        .then((response) => {
            console.log(response.data)
            setValues(response.data);
        })
}, []);

const setUserData = (data) => {
  let { id,name, email, phone } = data;
    localStorage.setItem('Id', id);
    localStorage.setItem('Name', name);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone', phone);
}


  return (
      <Grid container spacing={4} sx={{ pt: 3 }}>
      <Grid item sm={12}>
    <Box >
      {values.map((data) => {
  return (
      <Card sx={{ p: 2 }}>
        <CardHeader
       action={ 
       <CardActions>       
         <Link to='/edit-profile'>
            <Tooltip title="Edit Page">
            <IconButton aria-label="edit" button onClick={() => setUserData(data)} >
              <EditRoundedIcon color='text.secondary' sx={{ pointerEvents: 'none' }} />
            </IconButton> 
            </Tooltip>
            </Link>
            </CardActions>
       }
       subheader="The information can be edited"
          title="Profile"
            />
        <Divider />
       
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography color='secondary'  variant="h6" component="h6">Name</Typography>
             <Typography>{data.name}</Typography>
            </Grid>
           
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography color='secondary'  variant="h6" component="h6">Email</Typography>
             <Typography>{data.email}</Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography color='secondary'  variant="h6" component="h6">Phone</Typography>
              <Typography>{data.phone}</Typography>
            </Grid>
        

          </Grid>
        </CardContent>

      </Card>
  )})
        }
    </Box>
    </Grid>
    </Grid>
  );
};