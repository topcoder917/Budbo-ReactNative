import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RoundedButton from '../common/RoundedButton';
import Collapse from '../common/Collapse';

import fonts from 'config/fonts';
import colors from 'config/colors';

const fullStarIcon = require('assets/icons/star_purple.png');
const emptyStarIcon = require('assets/icons/star_white.png');
const halfStarIcon = require('assets/icons/half_star.png');
const locationIcon = require('assets/icons/location-order.png');
const orderOutlineIcon = require('assets/icons/lock-order.png');
const shippingOutlineIcon = require('assets/icons/shipping-order.png');

const weekNames = {
  fri: 'Friday',
  mon: 'Monday',
  sat: 'Saturday',
  sun: 'Sunday',
  thu: 'Thursday',
  tue: 'Tuesday',
  wed: 'Wednesday',
};

export default function RetailerInfo(props) {
  const retailerData = props.data;
  const insets = useSafeAreaInsets();

  const handleShowAllReviews = () => {};

  const renderHours = () => {
    const components = [];
    const hours = retailerData.hours;
    Object.keys(hours).map((item, index) => {
      const value = hours[item].closed
        ? 'Closed'
        : `${hours[item].open_time || '9:00 AM'} - ${
            hours[item].closed_time || '5:00 PM'
          }`;

      components.push(
        <View key={index} style={styles.rowItemContainer}>
          <Text style={styles.textValue}>{weekNames[item]}</Text>
          <Text style={styles.textValue}>{value}</Text>
        </View>,
      );
    });
    return components;
  };

  console.log('Current Retailer: ', JSON.stringify(retailerData));
  return (
    <View style={[styles.container, {marginTop: 193 + insets.top}]}>
      <View style={styles.rateContainer}>
        <View style={styles.rowItemContainer}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={retailerData.rate}
            fullStar={fullStarIcon}
            emptyStar={emptyStarIcon}
            halfStar={halfStarIcon}
            starStyle={styles.starStyle}
            buttonStyle={styles.starButton}
            containerStyle={styles.starRateContainer}
            selectedStar={(rating) => console.log('select')}
          />
          <Text style={styles.textRate}>
            {retailerData.rate} ({retailerData.review_count})
          </Text>
        </View>
        <RoundedButton
          style={styles.reviewButton}
          title="Write a review"
          onPress={() => {
            props.onDismiss();
            props.navigation.navigate('RetailerReview', {
              userId: retailerData.id,
              retailerName: retailerData.name,
            });
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleShowAllReviews()}>
          <Text style={styles.textAllReviews}>All Reviews</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textReview}>Great smoke, this puts me at ease every time. My new favorite to help me relax. My wife says it helps relief …all the pain in her back from an old injury. </Text>
        <View style={styles.otherInfoContainer}>
          <View style={styles.rowItemContainer}>
            <Image style={styles.iconStatus} source={locationIcon} />
            <Text style={styles.textStaus}>{retailerData.address}</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Image style={styles.iconStatus} source={orderOutlineIcon} />
            <Text style={styles.textStaus}>Order from $10</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Image style={styles.iconStatus} source={shippingOutlineIcon} />
            <Text style={styles.textStaus}>Free Shipping</Text>
          </View>
        </View>
      </View>
      <Collapse title="Location and Contact" isOpen={true}>
        <View style={styles.columnContainer}>
          <Text style={styles.textValue}>{retailerData.address}</Text>
          <Text style={styles.textValue}>
            {retailerData.city} {retailerData.state} {retailerData.zip}
          </Text>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.textContact}>{retailerData.phone}</Text>
          <Text style={styles.textContact}>{retailerData.email}</Text>
        </View>
      </Collapse>
      <Collapse title="Shop Hours" isOpen={false}>
        <View style={styles.columnContainer}>{renderHours()}</View>
      </Collapse>
      <Collapse title="Delivery Hours" isOpen={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primaryBackgroundColor,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRateContainer: {
    width: 73,
    height: 12,
  },
  starButton: {
    width: 13,
    height: 12,
  },
  starStyle: {
    width: 13,
    height: 12,
    // tintColor: colors.soft,
  },
  textRate: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textAllReviews: {
    color: colors.soft,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  otherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  iconStatus: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  textStaus: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
  },
  textValue: {
    flex: 1,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  columnContainer: {
    flex: 1,
  },
  textContact: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightBlue,
  },
  reviewButton: {
    width: 104,
    borderRadius: 6,
    borderColor: colors.lightPurple
  },
  textReview: {
    fontSize: 14,
    color: colors.soft,
    letterSpacing: 0.5,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10
  }
});
