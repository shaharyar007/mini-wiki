import React, { useEffect,useState } from 'react';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import {Box,Card,CardHeader,Typography,Toolbar,TextField,Grid,Button,CardContent,Snackbar } from '@mui/material';


const EditPage = () => {
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
      let current = new Date();
      let time = current.toLocaleTimeString();
      let curr_date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      let updated_date = time + curr_date;
      setID(localStorage.getItem('Id'))
      setName(localStorage.getItem('Name'));
      setContent(localStorage.getItem('Content'));
      setCreatedAt(updated_date);

  }, []);


  // Snackbar
  const [open, setOpen] = React.useState(false);
  const handleSnack = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

    const handleSubmit = (e) => {
      e.preventDefault();
        axios.put(`https://624f8b458c5bf4a1054c154e.mockapi.io/pages/${id}`, {
            name,
            content,
            createdAt
        }).then(() => {
          handleSnack(); 
          console.log('Data updated');
        })
    }

  return (
      <div>
      <Grid container>
      <Grid item sm={12}>
    <form validate onSubmit={handleSubmit} >
      <Card sx={{ p: 2 }}>
        <CardHeader
          subheader="This page can be updated later."
          title="Edit"
        />
      
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}
            >
              <TextField
                 id="name"
                 name="name"
                 required
                 fullWidth
                 type="text"
                 label="name"
                 color="secondary"
                 variant="outlined"
                 value={name} 
                 onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12} md={6} 
            >
              
               <Typography sx={{ py: 3 }} color='secondary' component='h5' variant="h5" >Page Content</Typography>
              <TextField
                fullWidth
                aria-label="empty textarea"
                id="content"
                name="content"
                multiline
                required
                minRows={25}
                style={{ width: '100%' }}
                label="Enter Your Content Here"
                color='secondary'
                variant="outlined"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} >
            <Toolbar sx={{justifyContent: 'space-between' , alignItems: 'center'}}>
            <Typography sx={{ py: 3 }} color='secondary' component='h5' variant="h5" >Preview</Typography>
            <Typography sx={{ py: 3 }} color='text.primary' component='span' variant="span" >Words: {content.length}</Typography>
            </Toolbar>
              <Box component="div"  sx={{ p:2, backgroundColor: 'primary' , border: '1px solid #c1c1c1' , borderRadius: '4px' }}>
              <ReactMarkdown className="markdown__preview" >{content}</ReactMarkdown>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
   
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="secondary" variant="contained"  type="submit">
            Submit
          </Button>
        </Box>
      </Card>
    </form>
    </Grid>
    </Grid>
    <Snackbar 
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Date has been updated.Go to Dashboard."
        bgColor='secondary'
      />
      </div>
  );
};

export default EditPage;
