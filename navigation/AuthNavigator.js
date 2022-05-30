import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';

export const AuthContext = createContext(null);

export function AuthNavigator() {
  /*
  The initializing state variable is going to be true by default,
  and it keeps track of the changes in the authentication state.
  It will be false when the user's authentication state changes
   */
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result);
    console.log(result);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <SignInStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
