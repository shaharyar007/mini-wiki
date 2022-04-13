import React, { useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Bgimg  from "../../login.jpg";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { userContext } from './../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

// Post request for token
async function login(values) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(data => data.json())
 }


const Login = ({ setSessionToken }) => {
  const navigate = useNavigate();
  const userData = useContext(userContext);
  // console.log(userData);
  let username = userData.username;
  let password = userData.password;

  // form submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await login({
      username,
      password
    });
    setSessionToken(token);
    navigate('/');
  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={7}
          md={7}
          sx={{
            backgroundImage: `url(${Bgimg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={5} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                color='secondary'
                onChange={e => userData.setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                color='secondary'
                autoComplete="current-password"
                onChange={e => userData.setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 1 }}
              >
                Sign In
              </Button>
  
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

Login.propTypes = {
  setLoginToken: PropTypes.func.isRequired
}

export default Login;