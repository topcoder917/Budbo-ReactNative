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

export default function ForgotPasswordCode({navigation, route}) {
  const username = route.params && route.params.username;

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

  const handleConfirmCode = () => {
    if (!value || value.length < 6) {
      return;
    }

    setIsShowLoading(true);
    navigation.navigate('ForgotPasswordNew', {
      username,
      code: value,
    });
  };

  const handleResend = () => {
    setIsShowLoading(true);

    Auth.forgotPassword(username)
      .then((response) => {
        console.log('Auth.forgotPassword response: ', response);
        setIsShowLoading(false);
      })
      .catch((err) => {
        console.log('err: ', err);
        setIsShowLoading(false);
        showError((err && err.message) || "The account doesn't exist.");
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
          <Text style={styles.textTitle}>Confirmation Code</Text>
          <Text style={styles.textDescription}>
            We sent a code to your phone number. Please write down.
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
          title="Confirm code"
          onPress={handleConfirmCode}
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
