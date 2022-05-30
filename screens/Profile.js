import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthNavigator';

export default function Home({navigation}) {
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
      <Text style={styles.username}>{user.displayName}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <View style={styles.divider} />
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.subbutton}
          onPress={() => {
            navigation.navigate('Library');
          }}>
          <Text style={styles.buttonText}>Library{'\n'}🎞</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subbutton}
          onPress={() => {
            navigation.navigate('WatchList');
          }}>
          <Text style={styles.buttonText}>Watch List{'\n'}📃</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Sign out 🖐</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  img: {
    marginTop: 40,
    width: 110,
    height: 110,
    alignItems: 'center',
    borderRadius: 120 / 2,
  },
  username: {
    margin: 20,
    fontSize: 28,
    color: '#7f78d2',
    fontFamily: 'geometria_bold',
  },
  email: {
    fontSize: 23,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'acherusgrotesque',
  },
  subContainer: {
    flexDirection: 'row',
  },
  subbutton: {
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 20,
    margin: 10,
    marginBottom: 50,
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D2541',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 170,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9585E',
  },
  buttonText: {
    color: '#ffe2ff',
    fontFamily: 'poppins',
    fontSize: 24,
    marginRight: 5,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 8,
    borderBottomColor: '#1D2541',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
});
