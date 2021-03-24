import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function MyWalletItem(props) {
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  const onGo = () => {
    if (props.onGo) {
      props.onGo();
    }
  };

  const {style, image, title, description, price} = props;
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.mainContainer}
        activeOpacity={0.8}
        onPress={onPress}>
        <View style={styles.imageContainer}>
          <FastImage
            source={image}
            style={styles.imageCover}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textTitle}>{description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textPrice}>{price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 96,
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: 6,
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 6,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 6,
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
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 16,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
  },
  priceContainer: {
    justifyContent: 'flex-end',
  },
  textPrice: {
    fontSize: 12,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
  },
});
