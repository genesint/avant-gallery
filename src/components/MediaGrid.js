import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MediaCard from './MediaCard';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import ImageIcon from '@material-ui/icons/Image';

const renderSwitch = (param) => {
    switch (param) {
        case 'YouTubeIcon':
            return <YouTubeIcon></YouTubeIcon>;
        case 'ImageIcon':
            return <ImageIcon></ImageIcon>;
        case 'PersonalVideoIcon':
            return <PersonalVideoIcon></PersonalVideoIcon>;
        default:
            return <div></div>
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function MediaGrid(props) {
    const classes = useStyles();
    const assets = props.assets;
    const [media, setMedia] = React.useState(assets[0]);

    const handleUpdateMedia = event => {
        const nextMedia = JSON.parse(event.currentTarget.attributes["data-media"].value);
        setMedia(nextMedia);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper} elevation={0}>
                        <List>
                            {assets.map((asset) => (
                                <ListItem button key={asset.url} onClick={handleUpdateMedia} data-media={JSON.stringify(asset)}>
                                    <ListItemIcon>
                                        {
                                            renderSwitch(asset.icon)
                                        }

                                    </ListItemIcon>
                                    <ListItemText primary={asset.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper} elevation={0}>
                        {(media) ? <MediaCard media={media}></MediaCard> : <div></div>}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
