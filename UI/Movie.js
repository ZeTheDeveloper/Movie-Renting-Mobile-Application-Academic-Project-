import React from 'react';

import {View, Image, StyleSheet, Text} from 'react-native';

let tmdb = require('../assets/api/TMDBApi');

let imgBaseUrl = tmdb.settings.imgBaseUrl;

const Movie = ({title, name, poster_path}) => (
  <View style={styles.moviePoster}>
    <Image
      source={{uri: imgBaseUrl + poster_path}}
      style={{width: 150, height: 215, borderRadius: 8, padding: 10}}
    />
    <Text style={styles.title}>
      {name}
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  moviePoster: {
    height: 300,
    width: 150,
    padding: 3,
    margin: 3,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    padding: 5,
  },

  modal: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'pink',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignContent: 'center',
    textAlign: 'center',
  },
});

export default Movie;
