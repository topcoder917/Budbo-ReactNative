import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-action-sheet';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {showError} from 'config/utils';

import {setUser} from 'budboRedux/actions/authActions';

import HeaderBar from 'components/common/HeaderBar';
import ProfileItem from 'components/profile/ProfileItem';
import ProfileEditItem from 'components/profile/ProfileEditItem';
import GradientButton from 'components/common/GradientButton';
import LoadingIndicator from 'components/common/LoadingIndicator';

const userIcon = require('assets/icons/user_purple.png');
const usernameIcon = require('assets/icons/budbo_purple.png');
const emailIcon = require('assets/icons/email_purple.png');
const phoneIcon = require('assets/icons/phone.png');
const pinIcon = require('assets/icons/pin.png');
const walletIcon = require('assets/icons/card.png');

function EditProfile(props) {
  const navigation = props.navigation;
  const user = props.user;
  const [isNameEdit, setIsNameEdit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState(
    `${user.first_name} ${user.last_name}`,
  );

  const sectionData = [
    {
      title: 'Name and Username',
      data: [
        {
          id: 'name',
          title: `${user.first_name} ${user.last_name}`,
          icon: userIcon,
          isEditable: true,
        },
        {
          id: 'username',
          title: `@${user.username}`,
          icon: usernameIcon,
        },
      ],
    },
    {
      title: 'Account Information',
      data: [
        {
          id: 'email',
          title: user.email,
          icon: emailIcon,
        },
        {
          id: 'phone',
          title: user.phone,
          icon: phoneIcon,
        },
        {
          id: 'pin',
          title: 'Request Pin Change',
          icon: pinIcon,
        },
        {
          id: 'wallet',
          title: 'Wallet',
          icon: walletIcon,
        },
      ],
    },
  ];

  const onEdit = (item) => {
    if (item.id === 'name') {
      setIsNameEdit(true);
    }
  };

  const handleLogout = () => {
    AsyncStorage.removeItem(constants.currentUser, () => {
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
  };

  const handleSubmitName = () => {
    console.log(name);
    const originalName = `${user.first_name} ${user.last_name}`;

    if (originalName === name) {
      setIsNameEdit(false);
      return;
    } else if (name === '') {
      showError('Please input name.');
      return;
    }

    setIsNameEdit(false);
    const splittedName = name.split(' ');

    const body = {
      userId: user.id,
      firstName: splittedName[0] || '',
      lastName: splittedName[1] || '',
    };

    setIsSubmitting(true);
    fetch(constants.baseApiUrl + 'api/edit_profile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

  const uploadProfilePhoto = (fileInfo) => {
    const data = new FormData();
    data.append('userId', user.id);
    data.append('image', {
      uri: fileInfo.uri,
      name: fileInfo.fileName,
      type: fileInfo.type,
    });
    setIsSubmitting(true);
    fetch(constants.baseApiUrl + 'api/edit_profile_image', {
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

  const handleImagePicker = () => {
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
                uploadProfilePhoto(response);
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
                uploadProfilePhoto(response);
              }
            },
          );
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <LoadingIndicator isLoading={isSubmitting} />
        <HeaderBar
          leftButton="back"
          onLeftPress={() => navigation.pop()}
          midButton="none"
          rightButton="logout"
          onRightPress={handleLogout}
        />
        <Text style={styles.textTitle}>Edit Profile</Text>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.scrollViewContentContainer}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleImagePicker()}>
            <FastImage
              style={styles.imageAvatar}
              source={{
                uri: user.image || constants.defaultAvatar,
              }}
            />
          </TouchableOpacity>
          {sectionData.map((section, sectionIndex) => (
            <View key={sectionIndex}>
              <Text style={styles.textSectionHeaderTitle}>{section.title}</Text>
              <View style={styles.sectionContentContainer}>
                {section.data.map((item, itemIndex) => (
                  <ProfileItem
                    key={itemIndex}
                    {...item}
                    onEdit={() => onEdit(item)}
                  />
                ))}
              </View>
            </View>
          ))}
          <Text style={styles.textDescription}>
            To edit any of your account information please contact Budbo
            support.
          </Text>
        </ScrollView>
        <Dialog
          width={0.91}
          dialogStyle={styles.dialogContainer}
          visible={isNameEdit}
          dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
          actionsBordered
          onTouchOutside={() => setIsNameEdit(false)}>
          <DialogContent style={styles.dialogContentContainer}>
            <ProfileEditItem
              icon={userIcon}
              autoFocus={true}
              autoCapitalize="words"
              placeholder="Name"
              placeholderTextColor={colors.darkGray}
              value={name}
              onChangeText={setName}
            />
            <GradientButton
              textStyle={styles.textSubmit}
              title="Submit Changes"
              onPress={() => handleSubmitName()}
            />
          </DialogContent>
        </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: Platform.OS === 'ios' ? 0 : 12,
  },
  textTitle: {
    fontSize: 36,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
    marginHorizontal: 40,
    marginVertical: 19,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  imageAvatar: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  textSectionHeaderTitle: {
    fontSize: 17,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
    marginHorizontal: 8,
    marginVertical: 17,
  },
  sectionContentContainer: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: colors.secondaryBackgroundColor,
  },
  textDescription: {
    fontSize: 17,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
    marginHorizontal: 8,
    marginTop: 26,
  },
  dialogContainer: {
    borderRadius: 6,
  },
  dialogContentContainer: {
    borderRadius: 6,
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.primaryBackgroundColor,
  },
  textSubmit: {
    fontSize: 16,
  },
});
