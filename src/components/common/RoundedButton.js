import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function RoundedButton(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      activeOpacity={0.8}
      onPress={() => props.onPress()}>
      <Text style={[styles.textTitle, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

RoundedButton.defaultProps = {
  style: {},
  textStyle: {},
  onPress: () => {},
};

RoundedButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    borderRadius: 12,
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: colors.primary,
    fontFamily: fonts.sfProTextRegular,
    fontSize: 12,
  },
});
