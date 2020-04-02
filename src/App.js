import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import MediaGrid from './components/MediaGrid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Loader />
      </React.Fragment>
    );
  }
}

export default App;





const LoadingFrontPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}

const Loader = () => {
  const { data, error } = useSWR('path', fetchConfig);
  if (error) return <div>failed to load</div>;
  if (!data) return <LoadingFrontPage />;
  return <MediaGrid assets={data.assets} />
}

const fetchConfig = async (path) => {
  const response = await fetch("https://dl.dropboxusercontent.com/s/td356ojeav7quo3/assets.json?dl=1")
  const data = await response.json();
  return { assets: data.assets }
}