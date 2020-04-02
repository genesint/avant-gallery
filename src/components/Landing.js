import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useSWR from 'swr';
import FrontCarousel from "./FrontCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    position: "fixed",
    top: "40%",
    left: "40%"


  },
}));



const LoadingFrontPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}
export default function Landing() {
  const classes = useStyles();
  const { data, error } = useSWR('path', fetchConfig);
  if (error) return <div>failed to load</div>
  if (!data) return <LoadingFrontPage />
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper} elevation={0}>
            <FrontCarousel slides={data.tiles} /></Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}



const fetchConfig = async (path) => {
  var targetUrl = 'https://dl.dropboxusercontent.com/s/u5as349xx3r18r5/tiles.json';
  let response = await fetch(targetUrl)
  let responseText = await response.text();
  let jsonData = JSON.parse(responseText)
  return { tiles: jsonData.tiles, main: jsonData.main }
}