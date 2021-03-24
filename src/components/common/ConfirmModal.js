import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import GradientButton from 'components/common/GradientButton';
import RoundedButton from 'components/common/RoundedButton';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {showConfirmModal} from 'budboRedux/actions/confirmActions';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

function ConfirmModal(props) {
  const navigation = props.navigation;
  //const tabBarHeight = Math.round(useBottomTabBarHeight());

  const confirm = (action) => {
    switch(action){
      case 'logout':
        logout();
        break;
    }
  }
  const logout = () => {
    console.log(props.navigation);
      // AsyncStorage.removeItem(constants.currentUser, () => {

      // props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       {
      //         name: 'AuthScreens',
      //         state: {
      //           routes: [
      //             {
      //               name: 'SignIn',
      //               params: {
      //                 hideSplash: true,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     ],
      //   }),
      // );
    // });
  }

  return (
    <Modal
      style={[
        styles.modalContainer,
        {marginBottom: 100 + constants.screenSafeAreaBottom},
      ]}
      // entry="bottom"
      // position="bottom"
      easing={null}
      animationDuration={300}
      isOpen={props.confirmModalFlag}
      onClosed={() => props.showConfirmModal(false)}>
      <View style={styles.modalContentContainer}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>{props.title}</Text>
          <Text style={styles.textMessage}>{props.message}</Text>

        </View>
        <View style={styles.buttonContainer}>
          <GradientButton
              style={styles.okButton}
              textStyle={styles.buttonText}
              title={props.okButtonText}
              onPress={() => confirm(props.okAction)}
            />
            <RoundedButton
              style={styles.cancelButton}
              textStyle={styles.buttonText}
              title="Cancel"
              onPress={() => props.showConfirmModal(false)}
            />            
        </View>
      </View>
    </Modal>
  );
}

ConfirmModal.defaultProps = {
  confirmModalFlag: false,
  showConfirmModal: () => {},
};

ConfirmModal.propTypes = {
  showConfirmModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  confirmModalFlag: state.confirmModal.confirmModalFlag,
});

const mapDispatchToProps = {
  showConfirmModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);

const styles = StyleSheet.create({
  modalContainer: {
    width: '80%',
    height: 250,
    borderRadius: 24,
    backgroundColor: colors.primaryBackgroundColor,
  },
  modalContentContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: fonts.soft,
    color: colors.soft,
  },
  textMessage: {
    fontSize: 14,
    fontFamily: fonts.soft,
    color: colors.soft,
    marginTop: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  okButton: {
    width: '100%',
    height: 50,
    borderRadius: 12
  },
  cancelButton: {
    marginTop: 20,
    width: '100%',
    height: 50,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fonts.soft,
    color: colors.soft,
  }
});
