import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import showVidScreen from '../screens/showVidScreen';

const stackContainer = createStackNavigator(
  {
    showVid: {
      screen: showVidScreen,
    },
  },
  {
    initialRouteName: 'showVid',
  },
);

export default createAppContainer(stackContainer);
