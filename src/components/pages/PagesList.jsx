import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

const PagesList = () => {

  const [pagesData, setpagesData] = useState([]);
  useEffect(() => {
      axios.get(`https://624f8b458c5bf4a1054c154e.mockapi.io/pages`)
          .then((response) => {
              console.log(response.data)
              setpagesData(response.data);
          })
  }, []);

  const sendData = (data) => {
    let { id, name, content,createdAt } = data;
    localStorage.setItem('Id', id);
    localStorage.setItem('Name', name);
    localStorage.setItem('Content', content);
    localStorage.setItem('CreatedAT', createdAt);
}

const handleGetData = () => {
    axios.get(`https://624f8b458c5bf4a1054c154e.mockapi.io/pages`)
        .then((handleGetData) => {
            setpagesData(handleGetData.data);
        })
}

const onHandleRemove = (id,e) => {
    axios.delete(`https://624f8b458c5bf4a1054c154e.mockapi.io/pages/${id}`)
    .then(() => {
        handleGetData();
    })
}
  
  return(
      <>
   <Grid container sx={{ mb: 2 }} alignItems="center"
  justifyContent="space-between">
    <Grid item xs={6}>
    <Typography variant="h5" component="h5" gutterBottom>
    All Pages
      </Typography>
    </Grid> 
    <Grid item xs={6} display="flex" justifyContent="flex-end">
    <Tooltip title="Add New Page">
        <IconButton aria-label="add" component={Link} to="/add-page">
        <AddCircleIcon color="secondary" sx={{ fontSize: 45 }} />
        </IconButton>
        </Tooltip>
    </Grid>   
    </Grid>

    {/* Pages list */}
    <Grid container spacing={2}>
    {pagesData.map((data) => {
  return (
  
  <Grid item sm={12} md={6}>
    <Card onClick={() => sendData(data)}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <CardActions>   
          {/* Detail Icon       */}
          <Link to='/detail-page'>
          <Tooltip title="See Details">
          <IconButton aria-label="detail" button onClick={() => sendData(data)} >
            <InfoIcon color='text.secondary' sx={{ pointerEvents: 'none' }} />
          </IconButton>
          </Tooltip> 
          </Link> 
          <Link to='/edit-page'>
          <Tooltip title="Edit Page">
          <IconButton aria-label="edit" button onClick={() => sendData(data)} >
            <EditRoundedIcon color='text.secondary' sx={{ pointerEvents: 'none' }} />
          </IconButton> 
          </Tooltip>
          </Link> 
          {/* Delete Icon */}
          <Tooltip title="Delete Page">
          <IconButton aria-label="delete" button onClick={() => onHandleRemove(data.id)} >
            <DeleteRoundedIcon color='secondary' sx={{ pointerEvents: 'none' }} />
          </IconButton>  
          </Tooltip>
        </CardActions>
        }
        title={data.name}
        subheader= {"Last Updated:" +data.createdAt}
      />  
    
    </Card>
  </Grid>
 
      )
    })}
 
</Grid>
</>
  )
}
export default PagesList;