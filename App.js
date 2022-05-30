// import React from 'react';
// import {AuthProvider} from './navigation/AuthProvider';
// import AppContainer from './navigation/AppStack';
//
// const App = () => {
//   return (
//     <AuthProvider>
//       <AppContainer />
//     </AuthProvider>
//   );
// };
//
// export default App;
//
import React, {useEffect} from 'react';
import {AuthNavigator} from './navigation/AuthNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    //initialise Google SDK
    GoogleSignin.configure({
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId:
        '64386637231-u42spnjt3oji40k239dsv9dqg12dk1ea.apps.googleusercontent.com',
      // if you want to access Google API on behalf of the user FROM YOUR SERVER
      offlineAccess: true,
    });
  }, []);

  return <AuthNavigator />;
};

export default App;
