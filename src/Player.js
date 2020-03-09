import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import { CardHeader, Avatar, Grid } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Collapse from "@material-ui/core/Collapse";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import "./Player.css";
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: "Please select the song",
      artist: "",
      link: "",
      imageLink: "",
      duration: "120",
      Coll: true,
      fingerPrintIcon: {
        styles: {
          fill: "blue",
          fontSize: 40
        }
      },
      actionGrid: ["SkipPreviousIcon", "PlayArrowIcon", "SkipNextIcon"],
      progressBar: 0
    };
    this.progressBarTimeout = 0;
    this.selectTrack = this.selectTrack.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.handleColl = this.handleColl.bind(this);
    this.pause = this.pause.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }
  selectTrack(obj) {
    this.progressBarTimeout = 0;
    this.setState({
      actionGrid: ["SkipPreviousIcon", "CircularProgress", "SkipNextIcon"]
    });
    import(`./static/${obj.imageLink}`).then(image => {
      import(`${obj.link}`).then(track => {
        this.setState({
          selectedTrack: obj.name,
          artist: obj.artist,
          link: track,
          imageLink: image
        });
        let interval = obj.duration / 100;
        this.progressBarTimeout = setInterval(() => {
          this.setState({ progressBar: this.state.progressBar + interval });
        }, interval * 60 * 60);
        this.playTrack();
      });
    });
  }
  previous() {
    //
  }
  playTrack() {
    var playPromise = this.Player.play();
    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          let interval = this.state.progressBar / 100;
          this.progressBarTimeout = setInterval(() => {
            this.setState({ progressBar: this.state.progressBar + interval });
          }, interval * 60);
          this.setState({
            actionGrid: ["SkipPreviousIcon", "PauseIcon", "SkipNextIcon"]
          });
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.log(error);
        });
    }
  }
  next() {
    this.selectTrack();
  }
  handleColl() {
    let fill = this.state.fingerPrintIcon.styles.fill;
    if (fill === "blue") {
      fill = "black";
    } else if (fill === "black") {
      fill = "blue";
    }
    this.setState({
      Coll: !this.state.Coll,
      fingerPrintIcon: {
        styles: {
          fill: fill,
          fontSize: 40
        }
      }
    });
  }
  pause() {
    this.Player.pause();
    clearInterval(this.progressBarTimeout);
    this.setState({
      actionGrid: ["SkipPreviousIcon", "PlayArrowIcon", "SkipNextIcon"]
    });
  }
  handleSliderChange(e, val) {
    this.Player.volume = val / 10;
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar />}
            action={<IconButton aria-label="settings" onClick={this.openCol} />}
            title={this.state.selectedTrack}
            subheader={this.state.artist}
          />
          <CardMedia
            style={{ height: 0, paddingTop: "35%" }}
            className="card-media"
            image={this.state.imageLink}
            title="Paella dish"
            crossorigin="anonymous"
          />
          <CardContent>
            <LinearProgress
              variant="determinate"
              value={this.state.progressBar}
            />
            <Divider />
            <Grid container justify="center" className="controls-grid">
              {this.state.actionGrid.map(ele => {
                if (ele === "SkipPreviousIcon") {
                  return (
                    <Grid onClick={this.previous}>
                      <SkipPreviousIcon style={{ fontSize: 40 }} />
                    </Grid>
                  );
                } else if (ele === "PlayArrowIcon") {
                  return (
                    <Grid onClick={this.playTrack}>
                      <PlayArrowIcon style={{ fontSize: 40 }} />
                    </Grid>
                  );
                } else if (ele === "SkipNextIcon") {
                  return (
                    <Grid onClick={this.next}>
                      <SkipNextIcon style={{ fontSize: 40 }} />
                    </Grid>
                  );
                } else if (ele === "PauseIcon") {
                  return (
                    <Grid onClick={this.pause}>
                      <PauseIcon style={{ fontSize: 40 }} />
                    </Grid>
                  );
                } else if (ele === "CircularProgress") {
                  return (
                    <Grid>
                      <CircularProgress style={{ fontSize: 40 }} />
                    </Grid>
                  );
                }
              })}
              <Grid item style={{ marginLeft: "20%", paddingRight: "7px" }}>
                <VolumeUpIcon />
              </Grid>
              <Grid item sm>
                <Box width={50}>
                  <Slider
                    defaultValue={5}
                    aria-labelledby="discrete-slider-custom"
                    min={0}
                    max={10}
                    step={1}
                    valueLabelDisplay="auto"
                    onChange={this.handleSliderChange}
                  />
                </Box>
              </Grid>
              <Grid>
                <FingerprintIcon
                  style={this.state.fingerPrintIcon.styles}
                  onClick={this.handleColl}
                />
              </Grid>
            </Grid>
            <Collapse in={this.state.Coll} timeout="auto" unmountOnExit>
              <Divider />
              <List
                button
                style={{
                  height: "150px",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                    backgroundColor: "red",
                    borderRadius: "10px"
                  }
                }}
              >
                {this.props.songsList.map(ele => {
                  return (
                    <ListItem onClick={() => this.selectTrack(ele)}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary={ele.name} secondary={ele.artist} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </CardContent>
        </Card>
        <audio
          src={this.state.link}
          ref={ref => (this.Player = ref)}
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}
