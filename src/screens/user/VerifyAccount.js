import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import PhoneInput from 'react-native-phone-input';

import {
  GradientButton,
  KeyboardAvoidingView,
  LoadingIndicator,
} from 'components/common';

import {colors, constants, fonts} from 'config';
import {showError} from 'config/utils';

export default function VerifyAccount({navigation, route}) {
  const user = (route.params && route.params.user) || {};

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);

  const handleChangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const handleVerifyPhone = () => {
    if (!phoneNumber) {
      showError('Phone number is required.');
      return;
    }

    setIsShowLoading(true);

    Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        email: user.email,
        phone_number: phoneNumber,
      },
    })
      .then((response) => {
        console.log('Auth.signUp response: ', response);
        setIsShowLoading(false);
        navigation.navigate('VerifyAccountCode', {
          user: {...user, phone: phoneNumber},
        });
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError((err && err.message) || 'The account create was failed.');
      });
  };

  const marginBottom = 20 + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isShowLoading} />
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        <View style={styles.mainContentContainer}>
          <Text style={styles.textTitle}>Phone Number</Text>
          <Text style={styles.textDescription}>
            We need your phone number to verify your account and notify you of
            any important or suspicious activity.
          </Text>
          <PhoneInput
            style={styles.phoneNumberContainer}
            textStyle={styles.textInputPhoneNumber}
            onChangePhoneNumber={handleChangePhoneNumber}
          />
        </View>
        <GradientButton
          style={{marginBottom}}
          title="Verify Phone"
          onPress={handleVerifyPhone}
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
  phoneNumberContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: colors.lightPurpleAlpha5,
    borderWidth: 1,
  },
  textInputPhoneNumber: {
    fontSize: 16,
    letterSpacing: -0.39,
    fontFamily: fonts.sfProTextRegular,
    color: colors.white,
  },
});
