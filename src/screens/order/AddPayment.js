/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import colors from 'config/colors';
import constants from 'config/constants';
import {formatPrecision, showError} from 'config/utils';

import fonts from 'config/fonts';
import HeaderBar from 'components/common/HeaderBar';
import {TextInput} from 'react-native-gesture-handler';
import GradientButton from 'components/common/GradientButton';

const cardImage = require('assets/icons/card.png');
const mastercardImage = require('assets/icons/add_mastercard.png');
const checkImage = require('assets/icons/check.png');

function AddPayment(props) {

  const navigation = props.navigation;
  const orderSubTotal = props.route.params.subtotal;
  const [currentPaymentMethod, setCurrentPaymentMethod] = React.useState(
    constants.paymentDollar,
  );
  useEffect(() => {});

  const savelocation = () =>{
    navigation.pop();
  }

  const renderCharges = () => {
    if (!orderSubTotal.totals) {
      return null;
    }
    const basketCharge = orderSubTotal.totals[currentPaymentMethod];

    const deliveryDollar = 6.2858; // TODO: remove later
    const rate =
      orderSubTotal.totals[currentPaymentMethod] /
      orderSubTotal.totals[constants.paymentDollar];
    const deliveryCharge = deliveryDollar * rate;

    const total = basketCharge + deliveryCharge;

    const unit = constants.paymentCurrencyUnit[currentPaymentMethod];
    return (
      <>
        <View style={styles.chargeItem}>
          <Text style={styles.textAddNew}>Basket Charges</Text>
          <Text style={styles.textValue}>
            {`${unit} ${formatPrecision(basketCharge)}`}
          </Text>
        </View>
        <View style={styles.chargeItem}>
          <Text style={styles.textAddNew}>Delivery Charges</Text>
          <Text style={styles.textValue}>
            {`${unit} ${formatPrecision(deliveryCharge)}`}
          </Text>
        </View>
        <View style={[styles.chargeItem, styles.totalItem]}>
          <Text style={styles.textTotalName}>Total Amount</Text>
          <Text style={styles.textTotalValue}>
            {`${unit} ${formatPrecision(total)}`}
          </Text>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        leftButton="back"
        rightButton="none"
        onLeftPress={() => navigation.pop()}
      />
      <Text style={styles.texTitle}>Add New Card</Text>
      <View style={styles.contentContainer}>
        <View style={{paddingBottom: 16}}>
          <Text style={styles.textInputTitle}>Cardholder name</Text>
          <View style={styles.cardInputContainer}>
            <TextInput style={styles.textInputCard}></TextInput>
            <Image style={styles.checkImageStyle} source={checkImage} />
          </View>
        </View>
        <View style={{paddingBottom: 16}}>
          <Text style={styles.textInputTitle}>Card Number</Text>
          <View style={styles.cardInputContainer}>
            <Image style={styles.cardImageStyle} source={cardImage} />
            <TextInput style={[styles.textInputCard, {width: 300}]} placeholder="4242 4242 4242 4242 4242"></TextInput>
            <Image style={styles.cardImageStyle} source={mastercardImage} />
          </View>
        </View>        
        <View style={styles.cardInfoContainer}>
          <View>
            <Text style={styles.textInputTitle}>Expire date</Text>
            <View style={styles.cardInfoInputContainer}>
              <TextInput style={styles.textInputCardInfo} placeholder="mm/yyyy"></TextInput>
            </View>
          </View>
          <View>
            <Text style={styles.textInputTitle}>CVC</Text>
            <View style={styles.cardInfoInputContainer}>
              <TextInput style={styles.textInputCardInfo} placeholder="****"></TextInput>
            </View>
          </View>
        </View>
        {renderCharges()}
        <View style={styles.addButtonContainer}>
          <GradientButton
            title="Add & Make Payment"
            onPress={() => savelocation()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  //setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPayment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.primaryBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texTitle: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginVertical: 15,
    marginLeft: 37,
  },

  cardInputContainer: {
    width: 360,
    height: 55,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.itemBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  checkImageStyle: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  cardImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textInputCard: {
    width: 320,
    height: 55,
    fontSize: 16,
    color: colors.soft,
    paddingHorizontal: 10,
  },
  cardInfoContainer: {
    width: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },

  
  cardInfoInputContainer: {
    width: 160,
    height: 55,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.itemBackgroundColor,
    paddingLeft: 5
  },
  textInputTitle: {
    fontSize: 16,
    color: colors.inputNameColor,
  },

  textInputCardInfo: {
    width: 150,
    height: 55,
    fontSize: 16,
    color: colors.soft,
    paddingHorizontal: 10,
  },
  
  addButtonContainer: {
    marginTop: 24,
    marginBottom: 12, 
    borderRadius: 12,
    width: 360
  },
  chargeItem: {
    width: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 16
  },
  textValue: {
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  totalItem: {
    marginTop: 14,
  },
  textTotalName: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textTotalValue: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.primary,
  },  
  textAddNew: {
    fontSize: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
});
