import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-community/async-storage';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

import {connect} from 'react-redux';
import {setCurrentAddress} from 'budboRedux/actions/homeActions';

const locationIcon = require('assets/icons/location.png');

function HeaderAddressBar(props) {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationButton}
        activeOpacity={0.8}
        onPress={() => setShowDialog(true)}>
        <Image style={styles.icon} source={locationIcon} />
        <Text style={styles.textLocation} numberOfLines={1}>
          {props.currentAddress}
        </Text>
      </TouchableOpacity>
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

HeaderAddressBar.defaultProps = {
  setCurrentAddress: () => {},
};

HeaderAddressBar.propTypes = {
  currentAddress: PropTypes.string.isRequired,
  setCurrentAddress: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentAddress: state.home.currentAddress,
});

const mapDispatchToProps = {
  setCurrentAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAddressBar);

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    paddingHorizontal: 20,
  },
  textLocation: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
    marginLeft: 6,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
