/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';
import colors from 'config/colors';

import fonts from 'config/fonts';
import HeaderBar from 'components/common/HeaderBar';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import GradientButton from 'components/common/GradientButton';

function AddLocation(props) {

  const navigation = props.navigation;
  const [withFlag, setWithFlag] = React.useState(true);
  const [country, setCountry] = React.useState(null);
  const [countryCode, setCountryCode] = React.useState('US');
  const [withFilter, setWithFilter] = React.useState(true);
  const [withCountryNameButton, setWithCountryNameButton] = React.useState(true);


  useEffect(() => {});

  const savelocation = () =>{
    navigation.pop();
  }
  const onSelect = (country) => {
    setCountry(country);
    setCountryCode(country.cca2);
    setWithCountryNameButton(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        leftButton="back"
        rightButton="none"
        onLeftPress={() => navigation.pop()}
      />
      <Text style={styles.texTitle}>Add Address</Text>
      <View style={styles.contentContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.textInputTitle}>Address</Text>
          <View style={styles.addressNameInputContainer}>
            <TextInput style={styles.textInputAddress}></TextInput>
          </View>
        </View>
        <View style={styles.cityStateContainer}>
          <View style={{width: '48%'}}>
            <Text style={styles.textInputTitle}>City</Text>
            <View style={styles.cityInputContainer}>
              <TextInput style={styles.textInputCity}></TextInput>
            </View>
          </View>
          <View style={{width: '48%'}}>
            <Text style={styles.textInputTitle}>State</Text>
            <View style={styles.cityInputContainer}>
              <TextInput style={styles.textInputCity}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.cityStateContainer}>
          <View style={{width: '48%'}}>
            <Text style={styles.textInputTitle}>Zip Code</Text>
            <View style={styles.cityInputContainer}>
              <TextInput style={styles.textInputCity}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.cityStateContainer}>
          <View style={{width: '100%'}}>
            <Text style={styles.textInputTitle}>Country</Text>
            <TouchableOpacity style={styles.countryContainer}>
              <CountryPicker
                theme={DARK_THEME}
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCountryNameButton,
                  onSelect,
                }}
                containerButtonStyle={{width: 300}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.savelocationButtonContainer}>
          <GradientButton
            title="Save location"
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.primaryBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  texTitle: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginVertical: 15,
    marginLeft: 37,
  },
  addressContainer: {
    paddingBottom: 16,
  },
  addressNameInputContainer: {
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.itemBackgroundColor,
  },
  cityStateContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },

  cityInputContainer: {
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.itemBackgroundColor,
  },
  textInputTitle: {
    fontSize: 16,
    color: colors.inputNameColor,
  },
  textInputAddress: {
    width: '100%',
    height: 55,
    fontSize: 16,
    color: colors.soft,
    paddingHorizontal: 10,
  },
  textInputCity: {
    width: '100%',
    height: 55,
    fontSize: 16,
    color: colors.soft,
    paddingHorizontal: 10,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.itemBackgroundColor,
    paddingHorizontal: 16,
  },
  savelocationButtonContainer: {
    marginTop: 24,
    marginBottom: 12, 
    borderRadius: 12
  },
});
