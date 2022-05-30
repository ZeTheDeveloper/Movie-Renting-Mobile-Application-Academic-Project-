import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthNavigator';

export default function Home() {
  // add firebase sign-out and user info function later
  const user = useContext(AuthContext);

  async function logOut() {
    try {
      await auth()
        .signOut()
        .then(() => console.log('User Signed out!'));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${user.photoURL}`,
        }}
        style={styles.img}
      />
      <Text style={styles.title}>Welcome {user.displayName}</Text>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Sign out 🤷</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe2ff',
  },
  img: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500',
    color: '#7f78d2',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 160,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#481380',
  },
  buttonText: {
    color: '#ffe2ff',
    fontSize: 24,
    marginRight: 5,
  },
});
