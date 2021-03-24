import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {GradientButton, LoadingIndicator} from 'components/common';

import {colors, constants, fonts} from 'config';

const sccuessIcon = require('assets/icons/forgot_password_sccuess.png');

export default function ForgotPasswordComplete(props) {
  const {navigation} = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogIn = () => {
    navigation.navigate('SignIn');
  };

  const paddingBottom =
    styles.mainContainer.paddingBottom + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isSubmitting} />
      <View style={[styles.mainContainer, {paddingBottom}]}>
        <Image source={sccuessIcon} style={styles.iconSuccess} />
        <Text style={styles.textTitle}>Password changed!</Text>
        <Text style={styles.textDescription}>
          Your password has been changed successfully
        </Text>
        <GradientButton
          style={styles.loginButton}
          title="Login now"
          onPress={handleLogIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.primaryBackgroundColor,
  },
  mainContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 125,
    paddingBottom: 20,
    backgroundColor: colors.tertiaryBackgroundColor,
  },
  textTitle: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.36,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.34,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
    textAlign: 'center',
    marginTop: 10,
  },
  loginButton: {
    marginTop: 25,
  },
  iconSuccess: {
    width: 180,
    height: 200,
    alignSelf: 'center',
    position: 'absolute',
    top: -100,
  },
});
