import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

export default function ViewBrandItem({item, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: colors.secondaryBackgroundColor},
        ]}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.content} numberOfLines={1}>
          {item.content}
        </Text>
      </View>
      <FastImage style={styles.image} source={{uri: item.image}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: constants.screenWidth - 48,
    height: ((constants.screenWidth - 96) * 112) / 204 + 98,
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
  image: {
    width: constants.screenWidth - 96,
    height: ((constants.screenWidth - 96) * 112) / 204,
    position: 'absolute',
    borderRadius: 6,
  },
  contentContainer: {
    width: '100%',
    height: 176,
    marginTop: ((constants.screenWidth - 96) * 112) / 204 - 78,
    paddingTop: 90,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    marginTop: 16,
  },
  content: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  mi: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightBlue,
    marginTop: 4,
  },
  address: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  starStyle: {
    width: 13,
    height: 12,
  },
  rateText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
});
