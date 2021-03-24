import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

const fullStarImage = require('assets/icons/star_purple.png');
const emptyStarImage = require('assets/icons/star_white.png');
const halfStarImage = require('assets/icons/half_star.png');

export default function FeaturedItem({item, onPress, style}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text style={styles.textDescription}>
            {!isNaN(item.mi) && `${item.mi.toFixed(1)}mi`}
          </Text>
        </View>
        <Text style={[styles.textDescription, styles.textAddress]}>
          {item.address}
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.rowContainer}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.rate}
              fullStar={fullStarImage}
              emptyStar={emptyStarImage}
              halfStar={halfStarImage}
              starStyle={styles.imageStar}
              containerStyle={styles.starRatingContainer}
            />
            <Text style={[styles.textDescription, styles.textRate]}>
              {item.rate > 0 ? item.rate.toFixed(1) : 'Not yet rated'}
            </Text>
          </View>
          <Text
            style={
              styles.textDescription
            }>{`${item.startTime.toLowerCase()} - ${item.endTime.toLowerCase()}`}</Text>
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
    width: 302,
    height: 207,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 16,
    marginVertical: 17,
  },
  coverImageContainer: {
    width: 258,
    height: 133,
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
    resizeMode: 'cover',
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: 133,
    paddingTop: 69,
    paddingBottom: 5,
    paddingHorizontal: 22,
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
    fontSize: 18,
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
  textAddress: {
    marginTop: 2,
    marginBottom: 4,
  },
  imageStar: {
    width: 12,
    height: 12,
    marginRight: 2,
  },
  starRatingContainer: {
    height: 16,
  },
  textRate: {
    marginLeft: 5,
  },
});
