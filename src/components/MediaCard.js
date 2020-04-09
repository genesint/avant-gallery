import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import Img from 'react-image';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from './Theme/'

const useStyles = makeStyles({
  root: {
    maxWidth: 840,
  },
  media: {
    maxHeight: 450,
    maxWidth: 800,
  },
  progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    height: 450,
    width: 800
  },
  indicator: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto"
  }
});
const ADLImg = (props) => {
  const classes = useStyles();
  return <Img
    src={props.url}
    className={classes.root}
    loader={<div className={classes.progress}><CircularProgress className={classes.indicator} /></div>}
  />
}

export default function MediaCard(props) {
  const classes = useStyles();
  const { media } = props;
  return (
    <React.Fragment>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          {(media.type === 'video' ? <ReactPlayer url={`${media.url}`} playing /> :
            <CardMedia
              component={ADLImg}
              alt={media.title}
              src={media.url}
              url={media.url}
              title={media.title}

            />)}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {media.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {media.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/*
        <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </CardActions>
        */}
      </Card>
    </React.Fragment>
  );
}
