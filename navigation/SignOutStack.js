import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';

const SignInStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(SignInStack);
