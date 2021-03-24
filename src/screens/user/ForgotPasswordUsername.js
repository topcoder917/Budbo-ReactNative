import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';

import GradientButton from 'components/common/GradientButton';
import LoadingIndicator from 'components/common/LoadingIndicator';
import KeyboardAvoidingView from 'components/common/KeyboardAvoidingView';
import TextField from 'components/common/TextField';

import {colors, constants, fonts} from 'config';
import {showError} from 'config/utils';

const userIcon = require('assets/icons/user.png');

export default function ForgotPasswordUsername({navigation}) {
  const [username, setUsername] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);

  const handleChangeUsername = (value) => {
    setUsername(value);
  };

  const handleSendCode = () => {
    if (!username) {
      showError('Username is required.');
      return;
    }

    setIsShowLoading(true);

    Auth.forgotPassword(username)
      .then((response) => {
        console.log('Auth.forgotPassword response: ', response);
        setIsShowLoading(false);
        navigation.navigate('ForgotPasswordCode', {
          username,
        });
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError((err && err.message) || "The account doesn't exist.");
      });
  };

  const marginBottom = 20 + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isShowLoading} />
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        <View style={styles.mainContentContainer}>
          <Text style={styles.textTitle}>Username</Text>
          <Text style={styles.textDescription}>
            Enter your username and we will send you 6 digits code for
            verification to your phone number.
          </Text>
          <TextField
            icon={userIcon}
            autoCapitalize="none"
            placeholder="Username"
            isBudboDomain
            returnKeyType="next"
            onChangeText={handleChangeUsername}
          />
        </View>
        <GradientButton
          style={{marginBottom}}
          title="Send code"
          onPress={handleSendCode}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiaryBackgroundColor,
  },
  keyboardAvoidingContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  mainContentContainer: {
    marginVertical: 20,
  },
  textTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: fonts.sfProDisplayRegular,
    color: colors.white,
  },
  textDescription: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.34,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
    marginVertical: 10,
  },
});
