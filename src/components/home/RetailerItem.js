import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import RoundedButton from '../common/RoundedButton';

const selectedStarImage = require('assets/icons/star_purple.png');
const unselectedStarImage = require('assets/icons/star_white.png');

export default function RetailerItem({item, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{width: 80}} />
      <View style={[styles.contentContainer]}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row', aligmItems: 'center'}}>
          <Text style={styles.class1}>{item.class1}</Text>
          {item.class2.trim() != '' && <Text style={styles.class1}> | </Text>}
          <Text
            style={[
              styles.class2,
              {
                color: item.class2.toLowerCase().includes('indica')
                  ? colors.indicaColor
                  : item.class2.toLowerCase().includes('sativa')
                  ? colors.sativaColor
                  : colors.hybridColor,
              },
            ]}>
            {item.class2}
          </Text>
        </View>
        <View style={styles.rateContainer}>
          <Image
            style={styles.imageStar}
            source={item.rate > 0 ? selectedStarImage : unselectedStarImage}
          />
          <Text style={styles.textRate}>
            {item.rate > 0
              ? item.rate.toFixed(1) + ` (${item.review_count})`
              : 'Not yet rated'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 32,
          }}>
          <View>
            {item.price && <Text style={styles.price}>{`$${item.price}`}</Text>}
            {item.price && <Text style={styles.volumn}>{item.volumn}</Text>}
          </View>
          <RoundedButton
            style={styles.buyButton}
            title="Buy"
            onPress={onPress}
          />
        </View>
      </View>
      <View style={styles.imageWrapper}>
        <FastImage style={styles.image} source={item.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 6,
  },
  imageWrapper: {
    width: 128,
    height: 128,
    position: 'absolute',
    left: 24,
    borderRadius: 6,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    paddingTop: 32,
    paddingBottom: 28,
    paddingLeft: 64,
    paddingRight: 16,
    borderRadius: 6,
    justifyContent: 'space-between',
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.69,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  class1: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  class2: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  volumn: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  price: {
    fontSize: 12,
    fontFamily: fonts.sfProTextBold,
    color: colors.primary,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  imageStar: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  textRate: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  buyButton: {
    width: 46,
  },
});
