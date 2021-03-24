import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function BrandItem({item, onPress, style}) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.textDescription} numberOfLines={1}>
          {item.content}
        </Text>
      </View>
      <View style={styles.coverImageContainer}>
        <FastImage style={styles.imageCover} source={{uri: item.image}} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 236,
    height: 176,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 16,
    marginVertical: 17,
  },
  coverImageContainer: {
    width: 204,
    height: 112,
    position: 'absolute',
    top: 0,
    borderRadius: 10,
    backgroundColor: colors.secondaryBackgroundColor,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  imageCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: 112,
    paddingTop: 64,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: colors.secondaryBackgroundColor,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textDescription: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
});
