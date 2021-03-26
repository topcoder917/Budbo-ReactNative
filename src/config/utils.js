import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {Linking, Alert} from 'react-native';

import colors from './colors';
import constants from './constants';

export const wp = (percent) => {
  return Math.round((constants.screenWidth * percent) / 100);
};

export const hp = (percent) => {
  return Math.round((constants.screenHeight * percent) / 100);
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 0.621371;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const openLink = async (url) => {
  if (!url) {
    Alert.alert(
      'Warnning',
      'Invalid URL',
      [{text: 'Close', onPress: () => console.log('Close Pressed')}],
      {cancelable: true},
    );
    return;
  }

  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'close',
        preferredBarTintColor: colors.primaryBackgroundColor,
        preferredControlTintColor: colors.white,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'popover',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: false,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: colors.primaryBackgroundColor,
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      console.log(result);
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const getOrderStatusText = (status) => {
  switch (status) {
    case constants.orderPending:
    case constants.orderApproved:
      return 'Delivery in Progress';
    case constants.orderBeingDelivered:
      return 'Out for Delivery';
    case constants.orderDelivered:
      return 'Delivered';
    default:
      return '';
  }
};

export const getOrderStatusColor = (status) => {
  switch (status) {
    case constants.orderPending:
    case constants.orderApproved:
      return colors.lightBlue;
    case constants.orderBeingDelivered:
      return colors.hybridColor;
    case constants.orderDelivered:
      return colors.fireBrick;
    default:
      return colors.soft;
  }
};

export const convertPaymentPrice = (price, from, to, rates) => {
  // USD => USDT
  // if (from === constants.paymentDollar) {
  //   from += 'T';
  // }
  // if (to === constants.paymentDollar) {
  //   to += 'T';
  // }

  const rateName = `${from}_${to}`.toUpperCase();
  const rate = rates[rateName] || 1;
  return price * rate;
};

export const formatPrecision = (value, precision = 2) => {
  const precisionValue = value.toString().split('.')[1];
  if (precisionValue && precisionValue.length > precision) {
    value = value.toFixed(precision);
  }
  return value;
};

export const showError = (message) => {
  Alert.alert(
    'Budbo',
    message,
    [{text: 'Close', onPress: () => console.log('Close Pressed')}],
    {cancelable: true},
  );
};
