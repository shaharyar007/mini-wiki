import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField} from '@mui/material';

export const EditProfile = (props) => {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('Id'))
        setName(localStorage.getItem('Name'))
        setEmail(localStorage.getItem('Email'));
        setPhone(localStorage.getItem('Phone'));
    }, []);


    // Data storing to api
    const updateAPIData = (e) => {
        e.preventDefault();
          axios.put(`https://624f8b458c5bf4a1054c154e.mockapi.io/users/${id}`, {
              name,
              email,
              phone
          }).then(() => { 
            console.log('Data updated');
            navigate('/user-profile');
          })
      }

  return (
      <Grid container spacing={4} sx={{ p: 2 }}>
      <Grid item sm={12}>
    <form
      autoComplete="off"
      Validate
      onSubmit={updateAPIData}
    >
     
      <Card>
        <CardHeader
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
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                color="secondary"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
           
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                color="secondary"
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                value={phone}
                variant="outlined"
              />
            </Grid>
        

          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            type='submit'
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    </Grid>
    </Grid>
  );
};