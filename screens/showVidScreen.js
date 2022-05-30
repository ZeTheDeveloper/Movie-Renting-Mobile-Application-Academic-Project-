import React, {Component} from 'react';
import {View} from 'react-native';

import styles from '../UI/LibraryCSS';

import YoutubePlayer from 'react-native-youtube-iframe';

// Favourite Screen
class showVidScreen extends Component {
  //Drawer for Favourite, not working yet
  static navigationOptions = ({navigation}) => {
    return {
      title:"loolololololololololololololo",
    };
  };

  render() {
    return (
      <View>
        <YoutubePlayer
          style={styles.youtubePlayer}
          width={400}
          height={400}
          play={true}
          videoId={'kxG_Eq01zpg'}
        />
      </View>
    );
  }
}

export default showVidScreen;

// at the bottom need to proceed payment
// TypeError Problem
