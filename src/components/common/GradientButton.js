import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function GradientButton(props) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      activeOpacity={0.8}
      onPress={() => props.onPress()}>
      <LinearGradient
        style={[
          styles.backgroundContainer,
          {
            borderRadius:
              props.style.borderRadius ||
              styles.backgroundContainer.borderRadius,
          },
        ]}
        colors={[
          colors.firstGradientColor,
          colors.secondGradientColor,
          colors.thirdGradientColor,
        ]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <Text style={[styles.textTitle, props.textStyle]}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

GradientButton.defaultProps = {
  style: {},
  textStyle: {},
  onPress: () => {},
};

GradientButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'stretch',
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: colors.soft,
    fontFamily: fonts.sfProTextRegular,
    fontSize: 17,
  },
});
