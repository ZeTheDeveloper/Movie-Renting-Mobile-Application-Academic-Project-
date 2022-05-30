import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';

import MovieHomeScreen from '../screens/MovieHomeScreen';
import CartScreen from '../screens/CartScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/Profile';

class WatchlistScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Watchlist</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: MovieHomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#9ac6a2'},
      },
    },
    Library: {
      screen: LibraryScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-library'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#957dad'},
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#ffb6c1'},
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#9CAEFC'},
    navigationOptions: {
      headerMode: 'none',
    },
  },
);

export default createAppContainer(BottomTabNavigator);
