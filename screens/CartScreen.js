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
  TouchableHighlight,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import styles from '../UI/LibraryCSS';
//import DropdownGenre from '../component/dropdown';
import MovieList from '../UI/movieListView';

//let SQLite = require('react-native-sqlite-storage');
let config = require('../assets/api/DatabaseConfig');

import auth from '@react-native-firebase/auth';
const user = auth().currentUser;

// Favourite Screen
class FavouriteScreen extends Component {
  //Drawer for Favourite, not working yet
  static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: navigation.getParam('Cart'),
    };
  };

  //Super state on Search
  constructor(props) {
    super(props);

    this.state = {
      favourite: [],
      isFetching: false,
      isRefreshing: 1,
    };

    this._load = this._load.bind(this);
    this._delete = this._delete.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/cart/user/' + user.uid;

    this.setState({isFetching: true});

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(favourite => {
        console.log(favourite);
        this.setState({favourite});
        this.setState({isFetching: false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  _delete(item) {
    Alert.alert(
      'Remove from cart',
      'Do you want to remove ' + item[1] + '?',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            let url = config.settings.serverPath + '/api/cart/' + item[0];

            fetch(url, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: item[0],
              }),
            })
              .then(response => {
                if (!response.ok) {
                  Alert.alert('Error', response.status.toString());
                  throw Error('Error ' + response.status);
                }

                return response.json();
              })
              .then(responseJson => {
                if (responseJson.affected == 0) {
                  Alert.alert('Item cannot be removed from Cart');
                }
                Alert.alert('Sucessfully removed from your cart');
                this._load();
                // this.props.navigation.goBack();
              })
              .catch(error => {
                console.error(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
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
            backgroundColor: '#071e54',
            paddingVertical: 5,
          }}>
          <Image
            source={require('../assets/img/cart.png')}
            style={{height: 40, width: 40, top: 6, left: 20}}
          />
          <Text style={[styles.filterText, styles.header]}>Cart</Text>
        </View>
        <ScrollView style={styles.filterContainer}>
          <View style={styles.line} />
          <View>
            <FlatList
              data={this.state.favourite}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this._load}
              renderItem={({item}) => (
                <TouchableHighlight>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={() => this._delete(item)}>
                        <View>
                          <Text style={styles.textDel}>-</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                      <MovieList
                        movieName={item[1]}
                        movieType={item[2]}
                        movieDuration={item[3] + ' min'}
                        movieRating={item[4] + '/10'}
                        movieImage={
                          'https://image.tmdb.org/t/p/w200/' + item[5]
                        }
                        moviePrice={'RM 5.00'}
                      />
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            <MovieList />
          </View>
        </ScrollView>
        <View style={styles.btnContainerPayment}>
          <TouchableOpacity
            style={styles.btnPayment}
            onPress={() => this.props.navigation.navigate('StackContainer')}>
            <Text style={{fontSize: 25}}>Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

export default FavouriteScreen;

// at the bottom need to proceed payment
// TypeError Problem
