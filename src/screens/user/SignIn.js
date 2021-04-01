/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import Amplify, {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Splash,
  Splash2,
  GradientButton,
  KeyboardAvoidingView,
  LoadingIndicator,
  TextField,
} from 'components/common';

import {awsconfig, colors, constants, fonts} from 'config';
import {hp, showError} from 'config/utils';

import {setUser} from 'budboRedux/actions/authActions';

const userIcon = require('assets/icons/user.png');
const lockIcon = require('assets/icons/lock.png');

const owlLottie = require('assets/lottie/owl_on_tree.json');


Amplify.configure(awsconfig);

function SignIn(props) {
  const {navigation, route} = props;

  let hideSplash = false;
  if (route.params) {
    hideSplash = props.route.params.hideSplash;
  }
  let hideSplash2 = false;

  const passwordRef = useRef(null);
  const logoRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHideSplash] = useState(hideSplash);
  const [isHideSplash2, setHideSplash2] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isHideSplash) {
      handleCompletedSplash();
    }
  }, []);

  const handleChangeUsername = (value) => {
    setUsername(value);
  };

  const handleChangePassoword = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (!username) {
      showError('Username is required.');
      return;
    } else if (!password) {
      showError('Password is required.');
      return;
    }

    setIsSubmitting(true);

    Auth.signIn(username, password)
      .then((authResponse) => {
        console.log('Auth.signIn response: ', JSON.stringify(authResponse));

        fetch(`${constants.baseApiUrl}api/get_auth`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('get_auth response: ', JSON.stringify(response));
            setIsSubmitting(false);

            props.setUser(response);
            AsyncStorage.setItem(
              constants.currentUser,
              JSON.stringify(response),
            )
              .then(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'DrawerScreens'}],
                  }),
                );
              })
              .catch((err) => {
                console.log(err);
                setIsSubmitting(false);
              });
          });
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsSubmitting(false);
        showError((err && err.message) || 'Incorrect username or password.');
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordUsername');
  };

  const handleCreateWallet = () => {
    navigation.navigate('Onboarding');
  };

  const handleCompletedSplash2 = () => {
    if (logoRef) {
      logoRef.current.play();
    }
  };
  const handleCompletedSplash = () => {
    setHideSplash2(false);
  };
  const paddingBottom =
    styles.mainContainer.paddingBottom + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <Splash
        isHideSplash={isHideSplash}
        onCompleted={() => handleCompletedSplash()}
      />
      <Splash2
        isHideSplash={isHideSplash2}
        onCompleted={() => handleCompletedSplash2()}
      />      
      <LoadingIndicator isLoading={isSubmitting} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAvoidingContainer}
        viewIsInsideTabBar={true}
        extraHeight={500}>
        <View style={styles.logoContainer}>
          <LottieView ref={logoRef} style={styles.lottieOwl} source={owlLottie} />
        </View>

        <View style={[styles.mainContainer, {paddingBottom}]}>
          <TextField
            icon={userIcon}
            autoCapitalize="none"
            placeholder="Username"
            returnKeyType="next"
            onChangeText={handleChangeUsername}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextField
            ref={passwordRef}
            icon={lockIcon}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            onChangeText={handleChangePassoword}
            onSubmitEditing={() => handleLogin()}
          />
          <GradientButton
            style={styles.loginButton}
            title="Login"
            onPress={handleLogin}
          />
          <View style={styles.bottomButtonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleForgotPassword()}>
                <Text style={styles.textButton}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleCreateWallet()}>
                <Text style={styles.textButton}>Create an Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  keyboardAvoidingContainer: {
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    //position: 'absolute',
    top: constants.screenSafeAreaTop,
    height: constants.screenHeight - 300,
    left: 0,
    right: 0,
  },
  lottieOwl: {
    width: Math.round(constants.screenWidth * 1.2),
    height: Math.round(constants.screenWidth * 1.2),
  },
  mainContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    backgroundColor: colors.tertiaryBackgroundColor,
  },
  loginButton: {
    marginVertical: 6,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.39,
    fontFamily: fonts.sfProTextRegular,
    color: colors.gray,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: colors.gray,
  },

});
