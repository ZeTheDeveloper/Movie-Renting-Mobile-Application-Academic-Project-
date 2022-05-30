import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import styles from '../UI/LibraryCSS';
//import DropdownGenre from '../component/dropdown';
import MovieList from '../UI/movieListView';
import {TouchableHighlight} from 'react-native';
import auth from '@react-native-firebase/auth';
const user = auth().currentUser;
//let SQLite = require('react-native-sqlite-storage');
let config = require('../assets/api/DatabaseConfig');

function HeaderImage(props) {
  return (
    <Image
      style={styles.headerImage}
      source={require('../assets/img/watchlist.png')}
    />
  );
}

// Favourite Screen
class FavouriteScreen extends Component {
  //Drawer for Favourite, not working yet
  static navigationOptions = {
    title: 'Watch List',
    headerStyle: {
      backgroundColor: '#071e54',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => <HeaderImage />,
  };

  //Super state on Search
  constructor(props) {
    super(props);

    this.state = {
      watchlist: [],
      isFetching: false,
      search: '',
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/watchlist/' + user.uid;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(watchlist => {
        this.setState({watchlist});
        this.setState({isFetching: false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchWatchlist(search) {
    let url = config.settings.serverPath + '/api/watchlist/' + user.uid + '/' + search;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(watchlist => {
        this.setState({watchlist});
        this.setState({isFetching: false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    //getting result from search
    const {search} = this.state;

    return (
      // rendering all elements within the boundary
      <SafeAreaProvider>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#d8e9f7',
          }}>
          <TextInput
            placeholder="Search in Watchlist"
            onChangeText={text => this.searchWatchlist(text)}
            style={styles.textSearch}
            placeholderTextColor="black"
          />
        </View>
        <ScrollView style={styles.filterContainer}>
          <View>
            <FlatList
              data={this.state.watchlist}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this._load}
              renderItem={({item}) => (
                <TouchableHighlight>
                  <View>
                    <MovieList
                        movieName={item[1]}
                        movieType={item[2]}
                        movieDuration={item[3]+ " min"} 
                        movieRating={item[4] + "/10"}
                        movieImage={'https://image.tmdb.org/t/p/w200/'+item[5]}
                    />
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default FavouriteScreen;

//element type is invalid: expected String or class/ function but got object
//              <DropdownGenre/>

/**
 *
 *
         <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#d8e9f7',
          }}>
          <TextInput
            placeholder="Search in Library"
            onChangeText={text => this.setState({search: text})} //doesnt work
            style={styles.textSearch}
            placeholderTextColor="black"
          />
          <TouchableOpacity
            onPress={() =>
              this.searchMovie(search)
            } //doesnt work
            style={styles.btnSearch}>
            <Text >Search</Text>
          </TouchableOpacity>
        </View>
 *
 *
 *
 *
 *
 */
