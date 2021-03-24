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

import HeaderBar from 'components/common/HeaderBar';
import RoundedButton from 'components/common/RoundedButton';
import Switch from 'components/common/Switch';
import LoadingIndicator from 'components/common/LoadingIndicator';

import {setUser} from 'budboRedux/actions/authActions';
import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {openLink} from 'config/utils';

const checkIcon = require('assets/icons/check.png');
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

  const handleLogout = () => {
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
                    },
                  },
                ],
              },
            },
          ],
        }),
      );
    });
  };

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
      <TouchableOpacity>
        <FastImage
          style={styles.imageProfile}
          source={{
            uri: props.user.image ? props.user.image : constants.defaultAvatar,
          }}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.textFullName}>
          {user.first_name} {user.last_name}
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textUsername}>@{user.username}</Text>
          <Image style={styles.iconCheck} source={checkIcon} />
        </View>
        <RoundedButton
          style={styles.editProfileButton}
          title="Edit Profile"
          onPress={() => props.navigation.navigate('EditProfile')}
        />
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
        <Text style={styles.textSectionTitle}>Account</Text>
        <View style={styles.sectionContainer}>
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

  const renderVerifyIcon = (photoUrl) => {
    if (photoUrl) {
      return <Image style={styles.iconCheck} source={checkIcon} />;
    }
    return <Image style={styles.iconPlus} source={plusIcon} />;
  };

  const renderVerification = () => (
    <>
      <Text style={styles.textSectionTitle}>Verifications</Text>
      <View style={styles.sectionContainer}>
        <View style={[styles.sectionItem, styles.verifySectionItem]}>
          <TouchableOpacity
            style={styles.rowContainer}
            activeOpacity={0.8}
            onPress={() => setShowScanPopup(true)}>
            <Text style={styles.textSectionItem}>ID Verification</Text>
            {renderVerifyIcon(user.med_id)}
          </TouchableOpacity>
          <Switch value={true} />
        </View>
        <View style={[styles.sectionItem, styles.verifySectionItem]}>
          <TouchableOpacity
            style={styles.rowContainer}
            activeOpacity={0.8}
            onPress={() => setShowScanPopup(true)}>
            <Text style={styles.textSectionItem}>Medical Marijuana Card</Text>
            {renderVerifyIcon(user.photo_id)}
          </TouchableOpacity>
          <Switch />
        </View>
      </View>
    </>
  );

  const renderSocialLink = () => (
    <>
      <Text style={styles.textSectionTitle}>Link Social Media Accounts</Text>
      <View style={styles.sectionContainer}>
        {constants.socialLinks.map((social) => (
          <TouchableOpacity
            style={styles.sectionItem}
            activeOpacity={0.8}
            onPress={() => handleOpenSocial(social.link)}>
            <Text style={styles.textSectionItem}>{social.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderVerifyBackground = (photoUrl) => {
    if (!photoUrl) {
      return null;
    }
    return (
      <LinearGradient
        style={styles.verifyItemBackground}
        colors={[
          colors.firstGradientColor,
          colors.secondGradientColor,
          colors.thirdGradientColor,
        ]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
    );
  };

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
          {renderSocialLink()}
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
              <TouchableOpacity
                style={styles.verifyItemContainer}
                activeOpacity={0.8}
                onPress={() => handleScan(VerifyScanCard.scanIdCard)}>
                {renderVerifyBackground(user.med_id)}
                <Image style={styles.iconCard} source={whiteCardIcon} />
                <Text style={styles.textScan}>Scan ID Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verifyItemContainer}
                activeOpacity={0.8}
                onPress={() => handleScan(VerifyScanCard.scanMedicalCard)}>
                {renderVerifyBackground(user.photo_id)}
                <Image style={styles.iconLeaf} source={whiteLeafIcon} />
                <Text style={styles.textScan}>Scan Medical Card</Text>
              </TouchableOpacity>
            </View>
            <RoundedButton
              style={styles.cancelButton}
              textStyle={styles.textCancel}
              title="Cancel"
              onPress={() => setShowScanPopup(false)}
            />
          </ModalContent>
        </BottomModal>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  setUser,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  imageProfile: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  textTitle: {
    fontSize: 36,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
    marginVertical: 19,
    paddingHorizontal: 48,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 31,
  },
  textFullName: {
    color: colors.white,
    fontSize: 20,
    marginTop: 12,
    fontFamily: fonts.sfProDisplayBold,
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
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    marginTop: 32,
    marginBottom: 16,
    paddingLeft: 8,
  },
  sectionContainer: {
    backgroundColor: colors.secondaryBackgroundColor,
    padding: 16,
    borderRadius: 6,
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
    fontSize: 17,
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
  cancelButton: {
    width: 327,
    height: 56,
    borderRadius: 28,
  },
  textCancel: {
    fontSize: 17,
  },
});
