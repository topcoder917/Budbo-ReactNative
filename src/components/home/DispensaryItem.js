import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

const selectStarImage = require('assets/icons/star_purple.png');
const unselectedStarImage = require('assets/icons/star_white.png');

export default function DispensaryItem({item, onPress, style}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.textMile}>
            {!isNaN(item.mi) && `${item.mi.toFixed(1)}mi`}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textDescription}>{item.address}</Text>
          <View style={styles.rowContainer}>
            <Image
              style={styles.imageStar}
              source={item.rate > 0 ? selectStarImage : unselectedStarImage}
            />
            <Text style={[styles.textDescription, styles.textRate]}>
              {item.rate > 0
                ? item.rate.toFixed(1) + ` (${item.review_count})`
                : 'Not yet rated'}
            </Text>
          </View>
        </View>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textMile: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textDescription: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  imageStar: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  textRate: {
    marginLeft: 2,
  },
});
