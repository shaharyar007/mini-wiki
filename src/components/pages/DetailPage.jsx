import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import {CardContent,CardActions} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReactMarkdown from "react-markdown";

const DetailPage = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    setId(localStorage.getItem('Id'))
    setName(localStorage.getItem('Name'));
    setContent(localStorage.getItem('Content'));
    setCreatedAt(localStorage.getItem('CreatedAT'));
}, []);

  return(
      <>
    <Grid container spacing={2}>
  
   <Grid item sm={12}>
    <Card sx={{ p: 2 }}>
      <CardHeader sx={{ flexWrap: 'wrap' }}
        action={
          <CardActions sx={{ px: 0 }}>   
         <Typography>Last Updated: {createdAt}</Typography>
        </CardActions>
        }
        titleTypographyProps={{variant:'h5' , color:'secondary' }}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <ReactMarkdown className="markdown__preview" >{content }</ReactMarkdown>
        
        </Typography>
      </CardContent>
    </Card>
  </Grid>
 
</Grid>
</>
  )
}
export default DetailPage;