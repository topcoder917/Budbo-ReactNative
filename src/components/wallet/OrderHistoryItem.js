import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import {getOrderStatusText, getOrderStatusColor} from 'config/utils';

export default function OrderHistoryItem(props) {
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  const onDetail = () => {
    if (props.onDetail) {
      props.onDetail();
    }
  };

  const {style, logo, name, created_at, total_usd} = props;
  const imageUri = typeof logo === 'number' ? logo : {uri: logo};
  const price = total_usd;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.mainContainer}
        activeOpacity={0.8}
        onPress={onPress}>
        <View style={styles.imageContainer}>
          <FastImage
            source={imageUri}
            style={styles.imageCover}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.leftContentContainer}>
          <View>
            <Text style={styles.textDate}>
              {moment(created_at).format('MMM DD, h:mm a')}
            </Text>
            <Text style={styles.textTitle}>{name}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View
              style={[
                styles.mark,
                {backgroundColor: getOrderStatusColor(props.status)},
              ]}
            />
            <Text
              style={[
                styles.textStatus,
                {color: getOrderStatusColor(props.status)},
              ]}>
              {getOrderStatusText(props.status)}
            </Text>
          </View>
        </View>
        <View style={styles.rightContentContainer}>
          <Text style={styles.textPrice}>${price}</Text>
          <TouchableOpacity
            style={styles.detailsButton}
            activeOpacity={0.8}
            onPress={onDetail}>
            <Text style={styles.textDetails}>Details</Text>
          </TouchableOpacity>
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
  leftContentContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  textDate: {
    fontSize: 10,
    color: colors.soft,
    fontFamily: fonts.sfProDisplayRegular,
  },
  textTitle: {
    fontSize: 16,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
  },
  textStatus: {
    fontSize: 10,
    color: colors.soft,
    fontFamily: fonts.sfProDisplayRegular,
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
  rightContentContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsButton: {},
  textDetails: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.sfProDisplayRegular,
  },
  textPrice: {
    fontSize: 12,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
  },
});
