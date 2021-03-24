import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

import RoundedButton from '../common/RoundedButton';

export default function MatchItem({item, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{width: 80}} />
      <View style={[styles.contentContainer]}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.content} numberOfLines={5}>
          {item.content}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: `rgb(${(254 * item.percent) / 100}, 113, 154)`,
              fontSize: 15,
              fontFamily: fonts.sfProTextRegular,
            }}>
            {item.percent.toFixed(1)}%
          </Text>
          <RoundedButton
            style={styles.locationsButton}
            title="Locations"
            onPress={onPress}
          />
        </View>
      </View>
      <FastImage style={styles.image} source={item.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 186,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: 160,
    height: 154,
    position: 'absolute',
    left: 24,
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    paddingTop: 32,
    paddingBottom: 24,
    paddingLeft: 96,
    paddingRight: 16,
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
  },
  content: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  locationsButton: {
    width: 96,
  },
});
