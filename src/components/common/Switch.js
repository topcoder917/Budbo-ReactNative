import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const switchOn = require('assets/icons/switch_on.png');
const switchOff = require('assets/icons/switch_off.png');

export default function Switch(props) {
  const [value, setValue] = useState(props.value || false);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setValue(!value)}>
      <Image style={styles.iconSwitch} source={value ? switchOn : switchOff} />
    </TouchableOpacity>
  );
}

Switch.defaultProps = {
  value: false,
};

Switch.propTypes = {
  value: PropTypes.bool,
};

const styles = StyleSheet.create({
  iconSwitch: {
    width: 32,
    height: 16,
  },
});
