import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.movieContainer}>
          <View style={styles.btnContainer} />
          <View>
            <Image
              style={styles.movieImg}
              source={{uri: `${this.props.movieImage}`}}
            />
          </View>
          <View style={this.props.movieName ? styles.movieDesContainer : null}>
            <Text style={this.props.movieName ? styles.movieName : null}>
              {this.props.movieName ? this.props.movieName : null}
            </Text>
            <View style={styles.tag}>
            <Text style={this.props.movieType ? styles.language : null}>
              {this.props.movieType ? this.props.movieType : ''}
            </Text>
            <Text style={this.props.movieDuration ? styles.duration : null}>
              {this.props.movieDuration ? this.props.movieDuration : ''}
            </Text>
            <Text style={this.props.movieRating ? styles.rating : null}>
              {this.props.movieRating ? this.props.movieRating : ''}
            </Text>
            <Text style={this.props.moviePrice ? styles.year : null}>
              {this.props.moviePrice ? this.props.moviePrice : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={this.props.movieName ? styles.line : null} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  movieDesContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  movieImg: {
    flex: 1,
    height: 100,
    width: 70,
    marginRight: 10,
  },
  movieName: {
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  movieText: {
    flex: 1,
    fontSize: 15,
  },
  moviePrice:{
    textAlign:'right',
  },
  line: {
    flex: 1,
    borderTopColor: '#9c9c9c',
    borderTopWidth: 1,
    left: -100,
    width: 1000,
  },
  tag: {
    flexDirection: 'row',
  },
  rating: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#CAF1DE',
    textAlign: 'center',
  },

  language: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFDBDB',
    textAlign: 'center',
  },

  duration: {
    borderRadius: 8,
    margin: 5,
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#B39DDC',
  },
  year: {
    borderRadius: 8,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFE7C7',
    textAlign: 'center',
  },
});

export default MovieList;

/**
 *
         <TouchableOpacity style={styles.btnDelete}
          >
            <View>
              <Text style={styles.textDel}>-</Text>
            </View>
          </TouchableOpacity>
 *
 *
 *
 *
 */

// price to the right side