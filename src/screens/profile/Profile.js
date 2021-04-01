import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {ModalContent, BottomModal, SlideAnimation} from 'react-native-modals';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modalbox';

import HeaderBar from 'components/common/HeaderBar';
import RoundedButton from 'components/common/RoundedButton';
import Switch from 'components/common/Switch';
import LoadingIndicator from 'components/common/LoadingIndicator';
import GradientImageButton from 'components/common/GradientImageButton';
import GradientButton from 'components/common/GradientButton';
import ConfirmModal from 'components/common/ConfirmModal';

import {setUser} from 'budboRedux/actions/authActions';
import {showConfirmModal} from 'budboRedux/actions/confirmActions';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {openLink} from 'config/utils';
import { color } from 'react-native-reanimated';

const checkIcon = require('assets/icons/check.png');
const cameraIcon = require('assets/icons/camera.png');
const removeIcon = require('assets/icons/remove.png');

const plusIcon = require('assets/icons/plus.png');
const whiteCardIcon = require('assets/icons/card_white.png');
const whiteLeafIcon = require('assets/icons/leaf.png');
const cardIcon = require('assets/icons/card.png');
const emailIcon = require('assets/icons/email_purple.png');
const phoneIcon = require('assets/icons/phone.png');
const pinIcon = require('assets/icons/pin.png');

const VerifyScanCard = {
  scanIdCard: 0,
  scanMedicalCard: 1,
};

function Profile(props) {
  const navigation = props.navigation;
  const user = props.user;
  const [showScanPopup, setShowScanPopup] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [verifycationScanType, setVerificationScanType] = React.useState(0);
  const [isShowConfirm, showConfirm] = React.useState(false);

  const [confirmContent, setConfirmContent] = React.useState({
    title: '',
    message: '',
    action: '',
    textConfirmButton: ''
  });

  const handleLogout = () => {
    const content = {
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
      action: 'logout',
      textConfirmButton: 'Log Out'
    }
    setConfirmContent(content);
    showConfirm(true);
  };

  const handle_deleteAccont = () => {
    const content = {
      title: 'Delete Account',
      message: 'Are you sure you want to remove account?',
      action: 'removeaccount',
      textConfirmButton: 'Remove'
    }
    setConfirmContent(content);
    showConfirm(true);

  }
  const confirm = (action) => {
    switch(action){
      case 'logout':
        logout();
        break;
      case 'removeaccount':
        removeAccount();
        break;        
    }

  }
  const logout = () =>{
    AsyncStorage.removeItem(constants.currentUser, () => {
      // navigation.navigate('BoardingScreens');
      // navigation.navigate('AuthScreens', {screen: 'SignIn'});
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'AuthScreens',
              state: {
                routes: [
                  {
                    name: 'SignIn',
                    params: {
                      hideSplash: true,
                      hideSplash2: true,
                    },
                  },
                ],
              },
            },
          ],
        }),
      );
    });
  }
  const removeAccount = ()=>{

  }

  const openVerifycationModal = (scanType) => {
    setShowScanPopup(true);
    setVerificationScanType(scanType);

  }
  const handleOpenSocial = (socialLink) => {
    openLink(socialLink);
  };

  const handleScan = (scanMode) => {
    setShowScanPopup(false);
    handleImagePicker(scanMode);
  };

  const handleImagePicker = (scanMode) => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Take Photo', 'Select Photo', 'Cancel'],
        cancelButtonIndex: 2,
        // destructiveButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Take Photo
          launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
            },
            (response) => {
              console.log('handleImagePicker - response: ', response);
              if (response.uri) {
                uploadCardPhoto(scanMode, response);
              }
            },
          );
        } else if (buttonIndex === 1) {
          // Select Photo
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
            },
            (response) => {
              console.log('handleImagePicker - response: ', response);
              if (response.uri) {
                uploadCardPhoto(scanMode, response);
              }
            },
          );
        }
      },
    );
  };

  const uploadCardPhoto = (scanMode, fileInfo) => {
    setIsSubmitting(true);

    const data = new FormData();
    data.append('userId', user.id);
    data.append('image', {
      uri: fileInfo.uri,
      name: fileInfo.fileName,
      type: fileInfo.type,
    });

    let apiUrl = '';
    if (scanMode === VerifyScanCard.scanIdCard) {
      apiUrl = 'api/edit_med_id_image';
    } else {
      apiUrl = 'api/edit_photo_id_image';
    }
    fetch(constants.baseApiUrl + apiUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsSubmitting(false);
        console.log('response: ', responseData);
        props.setUser(responseData);
        AsyncStorage.setItem(
          constants.currentUser,
          JSON.stringify(responseData),
        );
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.log(error);
      });
  };

  const renderProfile = () => (
    <View style={styles.profileContainer}>
      <View style={styles.avatarContainer}>
        <FastImage
          style={styles.imageProfile}
          source={{
            uri: props.user.image ? props.user.image : constants.maleAvatar,
          }}
        />
        <View style={styles.cameraButtonContainer}>
          <GradientImageButton
              style={styles.cameraButton}
              imageStyle={styles.cameraImageStyle}
              btnImage={cameraIcon}
              onPress={() => props.navigation.navigate('Profile')}
            />     
        </View>
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.textFullName}>
          {user.first_name} {user.last_name}
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textUsername}>@{user.username}</Text>
          <Image style={styles.iconCheck} source={checkIcon} />
        </View>
      </View>
    </View>
  );

  const renderAccount = () => {
    const accounts = [
      {
        name: user.email,
        icon: emailIcon,
        iconStyle: styles.iconEmail,
      },
      {
        name: user.phone,
        icon: phoneIcon,
        iconStyle: styles.iconPhone,
      },
      {
        name: 'Request Pin Change',
        icon: pinIcon,
        iconStyle: styles.iconPin,
      },
      {
        name: 'Wallet',
        icon: cardIcon,
        iconStyle: styles.iconWallet,
      },
    ];
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.textSectionTitle}>Account</Text>
          {accounts.map((account) => (
            <View style={styles.sectionItem}>
              <View style={styles.accountIconContainer}>
                <Image style={account.iconStyle} source={account.icon} />
              </View>
              <Text
                style={[styles.textSectionItem, styles.textAccountSectionItem]}>
                {account.name}
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  const renderVerifyIdCardButton = (photoUrl) => {
    if (photoUrl) {
      return <Image style={styles.iconCheck} source={checkIcon} />;
    }
    return <GradientButton 
              style={styles.verificationUploadButton}
              textStyle={styles.textUploadBtn}
              title="Upload"
              onPress={() => openVerifycationModal(0)}
            /> ;
  };

  const renderVerifyMedicalCardButton = (photoUrl) => {
    if (photoUrl) {
      return <Image style={styles.iconCheck} source={checkIcon} />;
    }
    return <GradientButton 
              style={styles.verificationUploadButton}
              textStyle={styles.textUploadBtn}
              title="Upload"
              onPress={() => openVerifycationModal(1)}
            /> ;
  };
  const renderVerification = () => (
    <>
      <View style={styles.sectionContainer}>
      <Text style={styles.textSectionTitle}>Verifications</Text>

        <View style={[styles.sectionItem, styles.verifySectionItem]}>
          <Text style={styles.textSectionItem}>ID Verification</Text>
          {renderVerifyIdCardButton(user.med_id)}
          {/* <Switch value={true} /> */}
        </View>
        <View style={[styles.sectionItem, styles.verifySectionItem]}>
          <Text style={styles.textSectionItem}>Medical Marijuana Card</Text>
          {renderVerifyMedicalCardButton(user.photo_id)}

        </View>
      </View>
    </>
  );
  const renderDeleteButton = () => (
    <>
      <TouchableOpacity onPress={() => handle_deleteAccont()}>
        <View style={styles.deleteButtonContainer}>
          <Image style={styles.iconRemove} source={removeIcon} />
          <Text style={styles.textDeleteButton}>  Delete Account</Text>
        </View>
      </TouchableOpacity>
    </>
  );


  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator isLoading={isSubmitting} />
      <View style={styles.contentContainer}>
        <HeaderBar
          leftButton="hamburger"
          onLeftPress={() => navigation.openDrawer()}
          midButton="none"
          rightButton="logout"
          onRightPress={handleLogout}
        />
        <Text style={styles.textTitle}>Profile</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderAccount()}
          {renderVerification()}
          {renderDeleteButton()}

        </ScrollView>
        <BottomModal
          propagateSwipe={true}
          visible={showScanPopup}
          onTouchOutside={() => {
            setShowScanPopup(false);
          }}
          modalAnimation={
            new SlideAnimation({
              initialValue: 0,
              animationDuration: 150,
            })
          }>
          <ModalContent style={styles.modalContentContainer}>
            <View style={styles.modalContentMainContainer}>
            {verifycationScanType == 0 ? 
              <GradientButton 
                style={styles.scanIdCarddButton}
                textStyle={styles.textScanIdCard}
                title="Scan ID Card"
                onPress={() => handleScan(VerifyScanCard.scanIdCard)}
              />:
              <GradientButton 
                style={styles.scanIdCarddButton}
                textStyle={styles.textScanIdCard}
                title="Scan Medical Card"
                onPress={() => handleScan(VerifyScanCard.scanIdCard)}
              />}                            
            </View>
            <RoundedButton
              style={styles.cancelButton}
              textStyle={styles.textCancel}
              title="Cancel"
              onPress={() => setShowScanPopup(false)}
            />
          </ModalContent>
        </BottomModal>
        <Modal
          style={[
            styles.modalContainer,
            {marginBottom: 100 + constants.screenSafeAreaBottom},
          ]}
          // entry="bottom"
          // position="bottom"
          easing={null}
          animationDuration={300}
          isOpen={isShowConfirm}
          onClosed={() => showConfirm(false)}>
          <View style={styles.modalContentContainer}>
            <View style={styles.confirmheader}>
              <Text style={styles.textConfirmTitle}>{confirmContent.title}</Text>
              <Text style={styles.textMessage}>{confirmContent.message}</Text>

            </View>
            <View style={styles.buttonContainer}>
              <GradientButton
                  style={styles.okButton}
                  textStyle={styles.buttonText}
                  title={confirmContent.textConfirmButton}
                  onPress={() => confirm(confirmContent.action)}
                />
                <RoundedButton
                  style={styles.cancelButton}
                  textStyle={styles.buttonText}
                  title="Cancel"
                  onPress={() => showConfirm(false)}
                />            
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  confirmModalFlag: state.confirmModal.confirmModalFlag,
  
});

const mapDispatchToProps = {
  setUser,
  showConfirmModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 12,
  },
  profileContainer: {
    paddingHorizontal: 24,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
  userNameContainer: {
    alignItems: 'center'
  },
  imageProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textTitle: {
    fontSize: 36,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 31,
  },
  textFullName: {
    color: colors.white,
    fontSize: 20,
    marginTop: 12,
    marginBottom: 10,
    fontFamily: fonts.sfProTextRegular,
  },
  textUsername: {
    color: colors.greyWhite,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
  },
  accountIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmail: {
    width: 20,
    height: 14,
  },
  iconPhone: {
    width: 16,
    height: 16,
  },
  iconPin: {
    width: 24,
    height: 17,
  },
  iconWallet: {
    width: 22,
    height: 16,
  },
  iconCheck: {
    width: 15,
    height: 12,
    marginLeft: 15,
  },
  iconPlus: {
    width: 18,
    height: 18,
    marginLeft: 16.5,
  },
  textSectionTitle: {
    fontSize: 17,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
    // marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
  },
  sectionContainer: {
    backgroundColor: colors.secondaryBackgroundColor,
    padding: 16,
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 15
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingVertical: 10,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
  },
  verifySectionItem: {
    justifyContent: 'space-between',
  },
  textSectionItem: {
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
  },
  textAccountSectionItem: {
    marginLeft: 16,
  },
  editProfileButton: {
    width: 87.5,
    height: 24,
    marginTop: 52,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: colors.primaryBackgroundColor,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  modalContentMainContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  verifyItemContainer: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 147,
    height: 127,
    backgroundColor: colors.secondaryBackgroundColor,
  },
  verifyItemBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 6,
  },
  textScan: {
    fontSize: 17,
    fontFamily: fonts.sfProTextRegular,
    color: colors.white,
    textAlign: 'center',
  },
  iconCard: {
    width: 39.5,
    height: 28.5,
    marginBottom: 14,
  },
  iconLeaf: {
    width: 26,
    height: 21,
    marginBottom: 3,
  },
  iconRemove: {
    width: 20,
    height: 20,

  },
  cancelButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
  },
  textCancel: {
    fontSize: 17,
  },
  cameraButtonContainer: {
    position: 'absolute',
    top: 50,
    right: -10
  },
  cameraImageStyle: {
    width: 15,
    height: 15
  },
  cameraButton: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  verificationUploadButton: {
    width: 60,
    height: 30
  },
  textUploadBtn: {
    fontSize: 14,
  },
  scanIdCarddButton: {
    width: '100%',
    height: 50,
    borderRadius: 12
  },
  textScanIdCard: {
    fontSize: 16
  },
  modalContainer: {
    width: '80%',
    height: 250,
    borderRadius: 24,
    backgroundColor: colors.primaryBackgroundColor,
  },
  modalContentContainer: {
    flex: 1,
  },
  confirmheader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 10,
  },
  textConfirmTitle: {
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
    fontSize: 16,
    fontFamily: fonts.soft,
    color: colors.soft,
  },
  deleteButtonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDeleteButton: {
    fontSize: 17,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
  },
});
