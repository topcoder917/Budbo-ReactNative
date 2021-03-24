import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import validator from 'validator';
import LottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  GradientButton,
  KeyboardAvoidingView,
  LoadingIndicator,
  TextField,
} from 'components/common';

import {colors, constants, fonts} from 'config';
import {hp, showError} from 'config/utils';
const owlLottie = require('assets/lottie/owl_on_tree.json');

const userIcon = require('assets/icons/user.png');
const emailIcon = require('assets/icons/email.png');
const lockIcon = require('assets/icons/lock.png');

export default function SignUp({navigation}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const logoRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (logoRef) {
      logoRef.current.play();
    }
  }, []);
  
  const handleChangeUsername = (value) => {
    setUsername(value);
  };

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleChangePassoword = (value) => {
    setPassword(value);
  };

  const handleChangeConfirmPassoword = (value) => {
    setConfirmPassword(value);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleContinue = () => {
    if (!username) {
      showError('Username is required.');
      return;
    } else if (!email) {
      showError('Email is required.');
      return;
    } else if (!validator.isEmail(email)) {
      showError('The valid email is required.');
    } else if (!password) {
      showError('Password is required.');
      return;
    } else if (!confirmPassword) {
      showError('Confirm password is required.');
      return;
    } else if (password !== confirmPassword) {
      showError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    fetch(`${constants.baseApiUrl}api/valid_username`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log('valid_username response: ', response);
        if (response.valid !== 0) {
          setIsSubmitting(false);
          showError('This username is taken. Please input another username.');
          return;
        }

        fetch(`${constants.baseApiUrl}api/valid_email`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        })
          .then((response) => response.json())
          .then((response) => {
            // console.log('valid_email response: ', response);
            setIsSubmitting(false);
            if (response.valid !== 0) {
              showError('This email is taken. Please input another email.');
              return;
            }
            navigation.navigate('VerifyAccount', {
              user: {username, email, password},
            });
          })
          .catch((err) => {
            console.log(err);
            setIsSubmitting(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const paddingBottom =
    styles.mainContainer.paddingBottom + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isSubmitting} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAvoidingContainer}
        viewIsInsideTabBar={true}
        extraHeight={500}
      >

        <View style={styles.logoContainer}>
          <LottieView ref={logoRef} style={styles.lottieOwl} source={owlLottie} />
        </View>          
        <View style={[styles.mainContainer, {paddingBottom}]}>
          <TextField
            icon={userIcon}
            autoCapitalize="none"
            placeholder="Username"
            isBudboDomain
            returnKeyType="next"
            onChangeText={handleChangeUsername}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <TextField
            ref={emailRef}
            icon={emailIcon}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={handleChangeEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextField
            ref={passwordRef}
            icon={lockIcon}
            placeholder="Password"
            secureTextEntry
            returnKeyType="next"
            onChangeText={handleChangePassoword}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <TextField
            ref={confirmPasswordRef}
            icon={lockIcon}
            placeholder="Re-type Password"
            secureTextEntry
            returnKeyType="done"
            onChangeText={handleChangeConfirmPassoword}
            onSubmitEditing={() => handleContinue()}
          />
          <GradientButton
            style={styles.continueButton}
            title="Continue"
            onPress={handleContinue}
          />
          <TouchableOpacity
            style={styles.haveButton}
            activeOpacity={0.8}
            onPress={() => handleSignIn()}>
            <Text style={styles.textButton}>I have a account already</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

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
    justifyContent: 'center',
    height: constants.screenHeight / 2 - 60,
    //backgroundColor: 'black'
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
  continueButton: {
    marginTop: 6,
  },
  haveButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.39,
    fontFamily: fonts.sfProTextRegular,
    color: colors.gray,
  },
});
