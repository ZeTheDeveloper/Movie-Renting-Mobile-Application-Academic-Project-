import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WatchListScreen from '../screens/WatchlistScreen';

const stackContainer = createStackNavigator(
  {
    WatchList: {
      screen: WatchListScreen,
    },
  },
  {
    initialRouteName: 'WatchList',
  },
);

export default createAppContainer(stackContainer);
