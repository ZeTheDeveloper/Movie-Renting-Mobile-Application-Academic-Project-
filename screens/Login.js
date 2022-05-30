import React from 'react';
import {View, StyleSheet, Image, Linking, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import SocialButton from '../UI/SocialButton';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export default function Login() {
  // firebase google login function
  async function googlesignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      //gt user ID token
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => console.log('Signed in with Google'));
    } catch (e) {
      switch (e.code) {
        case 'auth/operation-not-allowed':
          console.log('Enable Google login in your firebase console.');
          break;
        default:
          if (e.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('Google sign in cancelled');
          } else if (e.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('Google Sign in in progress');
          }
          break;
      }
    }
  }

  async function fblogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
      .then(() => console.log('Signed in with FB'));
  }

  return (
    <ImageBackground
      style={styles.viewContainer}
      source={require('../assets/img/loginpopcorn.png')}>
      <Image style={styles.img} source={require('../assets/img/mcologo.jpg')} />
      <View>
        <SocialButton
          btnType="google"
          buttonTitle="Sign in with Google"
          color="#FFFFFF"
          backgroundColor="#FBBC05"
          onPress={googlesignIn}
        />
        <SocialButton
          btnType="facebook"
          buttonTitle="Sign In with Facebook"
          color="#FFFFFF"
          backgroundColor="#3B5998"
          onPress={fblogin}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2B1EE',
    padding: 20,
  },
  img: {
    flex: 1,
    borderRadius: 20,
    resizeMode: 'center',
  },
});
