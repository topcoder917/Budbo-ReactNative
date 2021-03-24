import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';

import GradientButton from 'components/common/GradientButton';
import LoadingIndicator from 'components/common/LoadingIndicator';
import KeyboardAvoidingView from 'components/common/KeyboardAvoidingView';
import TextField from 'components/common/TextField';

import {colors, constants, fonts} from 'config';
import {showError} from 'config/utils';

const lockIcon = require('assets/icons/lock.png');

export default function ForgotPasswordNew({navigation, route}) {
  const username = route.params && route.params.username;
  const code = route.params && route.params.code;

  const confirmPasswordRef = useRef(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);

  const handleChangePassoword = (value) => {
    setPassword(value);
  };

  const handleChangeConfirmPassoword = (value) => {
    setConfirmPassword(value);
  };

  const handleSavePassword = () => {
    if (!password) {
      showError('Password is required.');
      return;
    } else if (!confirmPassword) {
      showError('Confirm password is required.');
      return;
    } else if (password !== confirmPassword) {
      showError('Passwords do not match.');
      return;
    }

    setIsShowLoading(true);
    Auth.forgotPasswordSubmit(username, code, password)
      .then((response) => {
        console.log('Auth.forgotPasswordSubmit response: ', response);
        setIsShowLoading(false);
        navigation.navigate('ForgotPasswordComplete');
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError((err && err.message) || "The password can't be saved.");
      });
  };

  const marginBottom = 20 + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isShowLoading} />
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        <View style={styles.mainContentContainer}>
          <Text style={styles.textTitle}>Create new passowrd</Text>
          <TextField
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
            onSubmitEditing={() => handleSavePassword()}
          />
        </View>
        <GradientButton
          style={{marginBottom}}
          title="Save password"
          onPress={handleSavePassword}
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
    marginBottom: 20,
  },
});
