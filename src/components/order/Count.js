import React from 'react';
import {
  Text,
  View,
  ViewPropTypes,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import colors from 'config/colors';

const minusIcon = require('assets/icons/minus.png');
const plusIcon = require('assets/icons/plus_purple.png');

function Count(props) {
  const onPressMinus = () => {
    if (props.value < 2) {
      return;
    }
    if (props.onPressMinus) {
      props.onPressMinus();
    }
  };

  const onPressPlus = () => {
    if (props.onPressPlus) {
      props.onPressPlus();
    }
  };

  return (
    <View
      style={[
        styles.container,
        props.enabled ? {} : styles.disabledContainer,
        props.style,
      ]}>
      {props.enabled ? (
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => onPressMinus()}>
          <Image style={styles.icon} source={minusIcon} />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.textValue}>{props.value}</Text>
      {props.enabled ? (
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => onPressPlus()}>
          <Image style={styles.icon} source={plusIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

Count.defaultProps = {
  style: {},
  value: 1,
  enabled: true,
};

Count.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.number,
  enabled: PropTypes.bool,
};

export default Count;

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryBackgroundColor,
  },
  disabledContainer: {
    width: 40,
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  textValue: {
    fontSize: 15,
    color: colors.primary,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
