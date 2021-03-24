//import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import {
  GradientButton,
  KeyboardAvoidingView,
  LoadingIndicator,
  TextField,
} from 'components/common';

import {colors, constants, fonts} from 'config';
import {showError} from 'config/utils';

import {setUser} from 'budboRedux/actions/authActions';

const cameraIcon = require('assets/icons/camera.png');

function CompleteProfile(props) {
  const {navigation, route} = props;
  const user = (route.params && route.params.user) || {};
  const lastNameRef = useRef(null);

  const [avatarInfo, setAvatarInfo] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeFirstName = (value) => {
    setFirstName(value);
  };

  const handleChangeLastName = (value) => {
    setLastName(value);
  };

  const handleContinue = () => {
    if (!firstName) {
      showError('First name is required.');
      return;
    } else if (!lastName) {
      showError('Last name is required.');
      return;
    }

    let data = {
      first: firstName,
      last: lastName,
      pin: '******',
      ...user,
    };

    setIsSubmitting(true);

    fetch(constants.baseApiUrl + 'api/add_consumer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log('add_consumer response: ', response);
        const userInfo = JSON.parse(response);
        if (userInfo && userInfo.id && avatarInfo) {
          uploadProfilePhoto(userInfo.id, avatarInfo);
          return;
        }
        setIsSubmitting(false);
        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        showError('The registration is failed.');
      });
  };

  const uploadProfilePhoto = (userId, fileInfo) => {
    const data = new FormData();
    data.append('userId', userId);
    data.append('image', {
      uri: fileInfo.uri,
      name: fileInfo.fileName,
      type: fileInfo.type,
    });

    fetch(constants.baseApiUrl + 'api/edit_profile_image', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('edit_profile_image response: ', response);
        setIsSubmitting(false);
        const userInfo = JSON.parse(response);
        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const setUserInfo = (userInfo) => {
    props.setUser(userInfo);
    AsyncStorage.setItem(constants.currentUser, JSON.stringify(userInfo))
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DrawerScreens'}],
          }),
        );
      })
      .catch((err) => {
        console.log(err);
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
                setAvatarInfo(response);
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
                setAvatarInfo(response);
              }
            },
          );
        }
      },
    );
  };

  const renderPhoto = () => (
    <TouchableOpacity
      style={styles.photoContainer}
      activeOpacity={0.9}
      onPress={() => handleImagePicker()}>
      {avatarInfo && avatarInfo.uri ? (
        <FastImage source={{uri: avatarInfo.uri}} style={styles.imageAvatar} />
      ) : (
        <LinearGradient
          style={styles.photoBackground}
          colors={[
            colors.firstGradientColor,
            colors.secondGradientColor,
            colors.thirdGradientColor,
          ]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}>
          <FastImage
            source={cameraIcon}
            style={styles.iconCamera}
            resizeMode={FastImage.resizeMode.contain}
          />
        </LinearGradient>
      )}
    </TouchableOpacity>
  );

  const paddingBottom =
    styles.mainContainer.paddingBottom + constants.screenSafeAreaBottom;

  return (
    <View style={styles.container}>
      <LoadingIndicator isLoading={isSubmitting} />
      <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        <View style={[styles.mainContainer, {paddingBottom}]}>
          {renderPhoto()}
          <Text style={styles.textDescription}>Change profile photo</Text>
          <View style={styles.line} />
          <TextField
            autoCapitalize="words"
            placeholder="First name"
            returnKeyType="next"
            onChangeText={handleChangeFirstName}
            onSubmitEditing={() => lastNameRef.current.focus()}
          />
          <TextField
            ref={lastNameRef}
            autoCapitalize="words"
            placeholder="Last name"
            returnKeyType="done"
            onChangeText={handleChangeLastName}
          />
          <GradientButton
            style={styles.continueButton}
            title="Continue"
            onPress={handleContinue}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  keyboardAvoidingContainer: {
    justifyContent: 'flex-end',
  },
  mainContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 20,
    backgroundColor: colors.tertiaryBackgroundColor,
  },
  textDescription: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.36,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: colors.lightPurpleAlpha7,
    marginVertical: 30,
  },
  continueButton: {
    marginTop: 6,
  },
  photoContainer: {
    width: 178,
    height: 178,
    borderRadius: 89,
    alignSelf: 'center',
    position: 'absolute',
    top: -89,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 89,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCamera: {
    width: 34,
    height: 34,
  },
  imageAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 89,
  },
});
