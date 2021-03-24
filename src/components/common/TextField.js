import React, {useState, forwardRef} from 'react';
import {
  View,
  ViewPropTypes,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'config/colors';
import fonts from 'config/fonts';

const TextField = forwardRef((props, ref) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(
    props.secureTextEntry,
  );

  const renderLeftIcon = () => {
    if (!props.icon) {
      return null;
    }

    return (
      <View style={[styles.iconContainer, styles.leftIconContainer]}>
        <Image style={[styles.icon, props.iconStyle]} source={props.icon} />
      </View>
    );
  };

  const renderRight = () => {
    if (props.secureTextEntry) {
      return (
        <TouchableOpacity
          style={[styles.iconContainer, styles.rightIconContainer]}
          activeOpacity={0.8}
          onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}>
          <Ionicons
            name={isSecureTextEntry ? 'eye-outline' : 'ios-eye-off-outline'}
            style={styles.iconEye}
          />
        </TouchableOpacity>
      );
    }
    if (props.isBudboDomain) {
      return (
        <View style={styles.domainContainer}>
          <Text style={styles.textValue}>.budbo.io</Text>
        </View>
      );
    }

    return;
  };

  return (
    <View style={[styles.container, props.style]}>
      {renderLeftIcon()}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.lightPurple}
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.textInput, styles.textValue, props.textStyle]}
        secureTextEntry={isSecureTextEntry}
      />
      {renderRight()}
    </View>
  );
});

TextField.defaultProps = {
  style: {},
  textStyle: {},
  iconStyle: {},
  secureTextEntry: false,
  isBudboDomain: false,
  icon: null,
};

TextField.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  iconStyle: ViewPropTypes.style,
  secureTextEntry: PropTypes.bool,
  isBudboDomain: PropTypes.bool,
  icon: PropTypes.number,
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.lightPurpleAlpha5,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  textValue: {
    fontSize: 16,
    letterSpacing: -0.39,
    color: colors.white,
    fontFamily: fonts.sfProTextRegular,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: 10,
  },
  rightIconContainer: {
    marginLeft: 10,
  },
  iconEye: {
    fontSize: 18,
    color: colors.lightPurpleAlpha5,
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    tintColor: colors.lightPurple,
  },
  domainContainer: {
    width: 108,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.lightPurpleAlpha5,
    backgroundColor: colors.lightPurpleAlpha1,
    marginLeft: 20,
    marginRight: -20,
  },
});
