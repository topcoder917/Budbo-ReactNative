import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import fonts from 'config/fonts';
import colors from 'config/colors';
import {wp} from 'config/utils';

export default function MyDrawerItem(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={props.onPress}>
      <Image style={[styles.icon, props.iconStyle]} source={props.icon} />
      <Text style={[styles.textLabel, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(16),
  },
  textLabel: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.sfProDisplaySemibold,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16.5,
    resizeMode: 'contain',
  },
});
