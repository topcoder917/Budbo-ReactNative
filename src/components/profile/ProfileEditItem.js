import React from 'react';
import {StyleSheet, Image, TextInput, View} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function ProfileEditItem(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.imageIcon} source={props.icon} />
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 6,
    paddingVertical: 10,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
    marginBottom: 18,
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.sfProTextMedium,
    color: colors.soft,
    textAlign: 'left',
    marginLeft: 22,
  },
});
