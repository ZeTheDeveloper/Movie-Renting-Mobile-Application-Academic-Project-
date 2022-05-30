import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
// import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class MovieDescription extends Component<Props> {
  state = {
    color: 'black',
    pressed: false,
  };

  changeColor() {
    if (!this.state.pressed) {
      this.setState({pressed: true, color: 'orange'});
    } else {
      this.setState({pressed: false, color: 'orange'});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<View style={styles.trailerVideo}>*/}
        {/*<Video*/}
        {/*  source={{uri: 'https://www.youtube.com/embed/qAwureQaDIU'}}*/}
        {/*  ref={ref => {*/}
        {/*    this.player = ref;*/}
        {/*  }}*/}
        {/*  controls={true}*/}
        {/*  onBuffer={this.onBuffer}*/}
        {/*  onError={this.videoError}*/}
        {/*  style={styles.backgroundVideo}*/}
        {/*/>*/}
        {/*</View>*/}
        <View style={styles.content}>
          <Text style={styles.title}>Hospital Playlist</Text>
          <TouchableOpacity style={styles.rentBtn}>
            <Text style={styles.rentText}>Rent</Text>
          </TouchableOpacity>
          <Text style={styles.title2}>Hospital Playlist</Text>
          <Text style={styles.description}>
            Hospital PlaylistHospital PlaylistHospital PlaylistHospital
            PlaylistHospital PlaylistHospital PlaylistHospital PlaylistHospital
            PlaylistHospital PlaylistHospital PlaylistHospital PlaylistHospital
            Playlist
          </Text>
        </View>
        <View style={styles.extraFunction}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.changeColor()}>
            <Entypo name="add-to-list" size={37} />
            <Text style={styles.btnText}>Add List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.like}>
            <FontAwesome name="thumbs-o-up" size={37} color="blue" />
            <Text style={styles.btnText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dislike}>
            <FontAwesome name="thumbs-o-down" size={37} color="red" />
            <Text style={styles.btnText}>Dislike</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.share}>
            <Entypo name="share" size={37} />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //to put the full screen
    backgroundColor: '#E7EBFE',
  },

  trailerVideo: {
    height: 250,
  },

  bacgroundVideo: {
    height: 250,
  },

  content: {},

  title: {
    marginLeft: 5,
    fontSize: 32,
    fontWeight: 'bold',
  },

  rentBtn: {
    backgroundColor: '#9CAEFC',
    marginTop: 10,
    marginLeft: 5, //set the space with the left of screen
    marginRight: 5,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },

  rentText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  title2: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  description: {
    marginLeft: 5,
    fontSize: 12,
  },

  extraFunction: {
    flexDirection: 'row', //let all the buttons at one row
  },

  btnText: {
    fontSize: 10,
    textAlign: 'center',
  },

  addList: {
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 75,
  },

  like: {
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 35,
  },

  dislike: {
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 35,
  },

  share: {
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 35,
  },
});
