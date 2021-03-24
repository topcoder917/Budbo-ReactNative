import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

export default function ViewRetailerItem({item, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: colors.secondaryBackgroundColor},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            // justifyContent: 'space-between',
          }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.mi}>
            {!isNaN(item.mi) && `${item.mi.toFixed(1)}mi`}
          </Text>
        </View>
        <Text style={styles.address}>{item.address}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {item.rate > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={item.rate}
                fullStar={require('assets/icons/star_purple.png')}
                emptyStar={require('assets/icons/star_white.png')}
                halfStar={require('assets/icons/half_star.png')}
                starStyle={styles.starStyle}
                buttonStyle={{width: 13, height: 12}}
                containerStyle={{width: 73, height: 12}}
                selectedStar={(rating) => console.log('select')}
              />
              <Text style={styles.rateText}>{item.rate.toFixed(1)}</Text>
            </View>
          )}
          <Text style={styles.time} />
        </View>
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
    flex: 1,
    paddingRight: 10,
  },
  mi: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
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
