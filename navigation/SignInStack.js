import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomTabNavigator from './BottomTabNavigator';
import StackContainer from './StackContainer';
import WatchListContainer from './WatchListContainer';
import showVidContainer from './showVidContainer';

const SignInStack = createStackNavigator(
  {
    BottomTabNavigator: {
      screen: BottomTabNavigator,
    },
    StackContainer: {
      screen: StackContainer,
    },
    WatchList: {
      screen: WatchListContainer,
    },
    showVid: {
      screen: showVidContainer,
    },
  },
  {
    initialRouteName: 'BottomTabNavigator',
    headerMode: 'none',
  },
);

export default createAppContainer(SignInStack);
