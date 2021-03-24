import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Auth} from 'aws-amplify';

import {
  GradientButton,
  KeyboardAvoidingView,
  LoadingIndicator,
} from 'components/common';

import {colors, constants, fonts} from 'config';
import {showError} from 'config/utils';

export default function VerifyAccountCode({navigation, route}) {
  const user = (route.params && route.params.user) || {};

  const [value, setValue] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: constants.pinCodeCellCount});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleChangeCode = (text) => {
    setValue(text);
  };

  const handleVerify = () => {
    setIsShowLoading(true);

    Auth.confirmSignUp(user.username, value)
      .then((response) => {
        setIsShowLoading(false);
        console.log('Auth.confirmSignUp response: ', response);
        navigation.navigate('CompleteProfile', {user});
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError(
          (err && err.message) || 'The account verification was failed.',
        );
      });
  };

  const handleResend = () => {
    setIsShowLoading(true);

    Auth.resendSignUp(user.username)
      .then(() => {
        console.log('Auth.resendSignUp successfully');
        setIsShowLoading(false);
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError((err && err.message) || 'The code resend was failed.');
      });
  };

  const renderCodeCell = (index, symbol, isFocused) => (
    <View key={index} style={styles.cellItemContainer}>
      <Text style={styles.textCell} onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : '•')}
      </Text>
    </View>
  );

  const marginBottom = 20 + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isShowLoading} />
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Verification Code</Text>
          <Text style={styles.textDescription}>
            {`Please write down the verificatin code sent to your mobile ${
              user.phone || ''
            }`}
          </Text>
          <CodeField
            ref={ref}
            {...codeFieldProps}
            value={value}
            autoFocus={true}
            onChangeText={handleChangeCode}
            cellCount={constants.pinCodeCellCount}
            rootStyle={styles.codeFieldContainer}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) =>
              renderCodeCell(index, symbol, isFocused)
            }
          />
          <View style={styles.resendContainer}>
            <Text style={styles.textResendDescription}>
              Did you not receive your code?
            </Text>
            <TouchableOpacity
              style={styles.resendButton}
              activeOpacity={0.8}
              onPress={() => handleResend()}>
              <Text style={styles.textResend}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
        <GradientButton
          style={{marginBottom}}
          title="Verify"
          onPress={handleVerify}
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
  mainContainer: {
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
  codeFieldContainer: {
    marginVertical: 10,
  },
  cellItemContainer: {
    width: constants.pinCodeCellWidth,
    height: constants.pinCodeCellHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lightPurpleAlpha5,
    marginHorizontal: 4,
  },
  textCell: {
    fontSize: 16,
    letterSpacing: -0.39,
    fontFamily: fonts.sfProTextRegular,
    color: colors.white,
    textAlign: 'center',
  },
  resendContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textResendDescription: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.36,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
  },
  resendButton: {},
  textResend: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.36,
    fontFamily: fonts.sfProTextSemibold,
    color: colors.white,
  },
});
