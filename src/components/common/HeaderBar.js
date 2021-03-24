// TODO: Remove this component later
import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-community/async-storage';
import {Badge} from 'react-native-elements';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

import {connect} from 'react-redux';
import {showCart} from 'budboRedux/actions/cartActions';
import {setCurrentAddress} from 'budboRedux/actions/homeActions';

const hamburgerIcon = require('assets/icons/hamburger.png');
const darkBackIcon = require('assets/icons/back_dark.png');
const backIcon = require('assets/icons/back.png');
const locationIcon = require('assets/icons/location.png');
const darkCartIcon = require('assets/icons/cart_dark.png');
const cartIcon = require('assets/icons/cart.png');
const logoutIcon = require('assets/icons/logout.png');

function HeaderBar(props) {
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (inputText) => {
    AsyncStorage.setItem(constants.currentAddress, inputText)
      .then(() => {
        props.setCurrentAddress(inputText);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowDialog(false);
  };

  const renderLeft = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={props.onLeftPress}>
        {renderLeftIcon()}
      </TouchableOpacity>
    );
  };

  const renderLeftIcon = () => {
    let icon = null;
    if (props.leftButton === 'hamburger') {
      icon = hamburgerIcon;
    } else if (props.leftButton === 'back') {
      icon = props.mode === 'dark' ? darkBackIcon : backIcon;
    }
    return <Image style={styles.icon} source={icon} />;
  };

  const renderCenter = () => {
    if (props.midButton !== 'none') {
      if (props.kind === 'review') {
        return <Text style={styles.textWriteReview}>Write a Review</Text>;
      }
      return (
        <TouchableOpacity
          style={styles.locationButton}
          activeOpacity={0.8}
          onPress={() => setShowDialog(true)}>
          <Image style={styles.icon} source={locationIcon} />
          <Text style={styles.locationText} numberOfLines={1}>
            {props.currentAddress}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderRight = () => {
    if (props.rightButton === 'none') {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={props.onRightPress}
        />
      );
    } else if (props.rightButton === 'logout') {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={props.onRightPress}>
          <Image style={styles.icon} source={logoutIcon} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.showCart(true);
          console.log(props.cartProducts);
        }}>
        <Image
          style={styles.icon}
          source={props.mode === 'dark' ? darkCartIcon : cartIcon}
        />
        {props.cartProducts.length > 0 && (
          <Badge
            value={props.cartProducts.length}
            containerStyle={styles.badgeContainer}
            badgeStyle={{backgroundColor: colors.primary}}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
      <DialogInput
        isDialogVisible={showDialog}
        dialogStyle={{
          backgroundColor: colors.lightPurple,
        }}
        title={'Input Address'}
        message={'Please type your current Address.'}
        hintInput={'Current Address'}
        submitInput={handleSubmit}
        closeDialog={() => {
          setShowDialog(false);
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  cartFlag: state.cart.cartFlag,
  cartProducts: state.cart.cartProducts,
  currentAddress: state.home.currentAddress,
});

const mapDispatchToProps = {
  showCart,
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationButton: {
    width: 190,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.headerTitleBack,
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  locationText: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
    marginLeft: 6,
  },
  textWriteReview: {
    fontSize: 20,
    fontFamily: fonts.sfProDisplayRegular,
    color: colors.white,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
