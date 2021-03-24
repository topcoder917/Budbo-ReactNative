import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

const facebookIcon = require('assets/icons/facebook.png');
const twitterIcon = require('assets/icons/twitter.png');

export default function NewsItem({item, onPress, style}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.textLink}>
            {item.link}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textDescription}>Recent Press</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => console.log('Facebook')}>
              <Image style={styles.imageSocial} source={facebookIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => console.log('Twitter')}>
              <Image style={styles.imageSocial} source={twitterIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.coverImageContainer}>
        <FastImage
          style={styles.imageCover}
          source={{
            uri: item.photo,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 302,
    height: 227,
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
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    height: 153,
    paddingTop: 69,
    paddingBottom: 8,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
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
  textLink: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
    fontFamily: fonts.sfProTextRegular,
    color: colors.blue,
  },
  socialButton: {
    marginLeft: 10,
  },
  imageSocial: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
