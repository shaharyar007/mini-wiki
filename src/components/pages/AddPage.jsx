import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import {Box,Card,CardHeader,Typography,Toolbar,TextField,Grid,Button,CardContent,Snackbar  } from '@mui/material';


// Component definition
const AddPage = () => {
  // Dummy content for initial value of markdown text
  const dummyContent = `A simple markdown editor with preview, implemented with React.js and TypeScript. 
  This React Component aims to provide a simple Markdown editor with syntax highlighting support. 
  This is based on textarea encapsulation, so it does not depend on any modern code editors such as Acs, 
  CodeMirror, Monaco etc.

  ### Features
  
  - 📑 Indent line or selected text by pressing tab key, with customizable indentation.
  - ♻️ Based on textarea encapsulation, does not depend on any modern code editors.
  - 🚧 Does not depend on the (https://github.com/uiwjs/uiw) component library.
  - 🚘 Automatic list on new lines.
  - 😻 GitHub flavored markdown support.
  - 🌒 Support dark-mode/night-mode **@v3.11.0+**.
  - 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).
  
  `;
  const [name, setName] = useState('');
  const [content, setContent] = useState(dummyContent);
   
  let current = new Date();
  let time = current.toLocaleTimeString();
  let curr_date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let createdAt = time + curr_date;
  // Snackbar
  const [open, setOpen] = React.useState(false);
  const handleSnack = () => {
    setOpen(true);
  };
  // Close event for snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Data storing to api
  const sendData = (e) => {
    e.preventDefault();
    axios.post(`https://624f8b458c5bf4a1054c154e.mockapi.io/pages`, {
      name,
      content,
      createdAt
    }).then(() => {
        handleSnack(); 
        console.log('added');
    })
  }
  

  return (
      <div>
      <Grid container>
      <Grid item sm={12}>
    <Box component="form" Validate onSubmit={sendData}>
      <Card sx={{ p: 2 }}>
        <CardHeader
          subheader="This page can be updated later."
          title="Add New Page"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}
            >
              <TextField
                 id="title"
                 name="title"
                 fullWidth
                 type="text"
                 label="Title"
                 color="secondary"
                 variant="outlined"
                 required
                 onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12} md={6} >
              
               <Typography sx={{ py: 3 }} color='secondary' component='h5' variant="h5" >Page Content</Typography>
              <TextField
                fullWidth
                required
                aria-label="empty textarea"
                id="markdown"
                name="markdown"
                multiline
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
          <Button type="submit"
                color="secondary"
                variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
   
    </Grid>
    </Grid>
    <Snackbar 
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message="A page has been added.Go to Dashboard."
        bgColor='secondary'
      />
      </div>
  );
};

export default AddPage;
