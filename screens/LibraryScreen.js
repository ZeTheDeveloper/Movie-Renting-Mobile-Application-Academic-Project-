import React, {Component, useContext} from 'react';
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

//let SQLite = require('react-native-sqlite-storage');
let config = require('../assets/api/DatabaseConfig');
const user = auth().currentUser;

// Favourite Screen
class FavouriteScreen extends Component {
  //Drawer for Favourite, not working yet
  static navigationOptions = {
    drawerLabel: 'Library',
  };

  //Super state on Search
  constructor(props) {
    super(props);

    this.state = {
      library: [],
      isFetching: false,
      search: '',
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/library/' + user.uid;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(library => {
        this.setState({library});
        this.setState({isFetching: false});
        console.log(user.uid);
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchLibrary(search) {
    let url = config.settings.serverPath + '/api/library/' + user.uid + '/' + search;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(library => {
        this.setState({library});
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
            placeholder="Search in Library"
            onChangeText={text => this.searchLibrary(text)}
            style={styles.textSearch}
            placeholderTextColor="black"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#e5c9fb',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <Image
            source={require('../assets/img/favStar.png')}
            style={{height: 40, width: 40, top: 0, left: 20}}
          />
          <Text style={[styles.filterText, styles.header]}>Library</Text>
        </View>
        <ScrollView style={styles.filterContainer}>
          <View style={styles.line} />
          <View>
            <FlatList
              data={this.state.library}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this._load}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('showVid')}>
                  <View>
                    <MovieList
                        movieName={item[1]}
                        movieType={item[2]}
                        movieDuration={item[3]+ " min"} 
                        movieRating={item[4] + "/10"}
                        movieImage={'https://image.tmdb.org/t/p/w200/'+item[5]}
                    />
                  </View>
                </TouchableOpacity>
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
