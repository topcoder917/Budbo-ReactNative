import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const hamburgerIcon = require('assets/icons/hamburger.png');

function HeaderMenu(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={() => props.navigation.openDrawer()}>
      <Image style={styles.icon} source={hamburgerIcon} />
    </TouchableOpacity>
  );
}

export default HeaderMenu;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
