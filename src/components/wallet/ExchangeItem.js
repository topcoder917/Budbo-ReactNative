import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

export default function ExchangeItem(props) {
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

  const {style, image, title, description} = props;
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
          <View style={styles.bottomContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.mark} />
              <Text style={styles.textDescription}>{description}</Text>
            </View>
            <TouchableOpacity
              style={styles.goButton}
              activeOpacity={0.8}
              onPress={onGo}>
              <Text style={styles.textGo}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 96,
    padding: 16,
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: 6,
    marginVertical: 6,
    marginHorizontal: 24,
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
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 16,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
  },
  bottomContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: colors.hybridColor,
  },
  textDescription: {
    fontSize: 12,
    color: colors.hybridColor,
    fontFamily: fonts.sfProDisplayRegular,
  },
  goButton: {},
  textGo: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.sfProDisplayRegular,
  },
});
