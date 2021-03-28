import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-action-sheet';
import moment from 'moment';

import LoadingIndicator from 'components/common/LoadingIndicator';
import HeaderBar from 'components/common/HeaderBar';
import GradientButton from 'components/common/GradientButton';
// import ReviewCharacteristics from 'components/home/ReviewCharacteristics';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {showError} from 'config/utils';

const fullStarIcon = require('assets/icons/star_purple.png');
const emptyStarIcon = require('assets/icons/star_gray.png');
const halfStarIcon = require('assets/icons/half_star.png');
const purpleBudboIcon = require('assets/icons/budbo_purple.png');
const checkIcon = require('assets/icons/check.png');
const infoIcon = require('assets/icons/info.png');

function ProductReview(props) {
  const navigation = props.navigation;
  const route = props.route;
  const {productId, productName} = route.params;

  const [mark, setMark] = React.useState(4);
  const [content, setContent] = React.useState('');
  // const [attributes, setAttributes] = React.useState(route.params.attributes);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onChangeText = (text) => {
    setContent(text);
  };

  // const handleAttributes = (attr) => {
  //   setAttributes(attr);
  //   console.log(attributes);
  // };

  const handleSubmit = () => {
    if (!content) {
      showError('Please input content.');
      return;
    }

    const data = {
      productId: productId,
      rate: mark,
      content: content,
      providerId: props.user.id,
    };
    setIsSubmitting(true);

    fetch(constants.baseApiUrl + 'api/add_product_review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        setMark(0);
        setContent('');
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  const handleScan = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Take Photo', 'Select Photo', 'Cancel'],
        cancelButtonIndex: 2,
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
                // uploadProfilePhoto(response);
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
                // uploadProfilePhoto(response);
              }
            },
          );
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator isLoading={isSubmitting} />
      <HeaderBar
        leftButton="back"
        kind="review"
        onLeftPress={() => navigation.pop()}
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.reviewContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.textDate}>{moment().format('MMM D YYYY')}</Text>
          </View>
          <Text style={styles.textRate}>Please Rate {productName}</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={mark}
            fullStar={fullStarIcon}
            emptyStar={emptyStarIcon}
            halfStar={halfStarIcon}
            starStyle={styles.starStyle}
            containerStyle={styles.starContainerStyle}
            selectedStar={(rating) => {
              setMark(rating);
            }}
          />
          <View style={styles.textInputContainer}>
            <TextInput
              autoFocus={true}
              multiline
              editable
              numberOfLines={7}
              value={content}
              onChangeText={onChangeText}
              placeholder="Just Start Typing Here…"
              placeholderTextColor={colors.soft}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <GradientButton
            style={styles.submitButton}
            textStyle={styles.textSubmit}
            title="Submit"
            onPress={() => handleSubmit()}
          />
          <TouchableOpacity
            style={styles.scanButtonContainer}
            activeOpacity={0.8}
            onPress={handleScan}>
            <View style={styles.scanButtonRow}>
              <Image style={styles.iconPurpleBudbo} source={purpleBudboIcon} />
              <Text style={styles.textScanUpc}>Scan UPC</Text>
            </View>
            <Image style={styles.iconCheck} source={checkIcon} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Image style={styles.iconInfo} source={infoIcon} />
            <Text style={{color: colors.lightPurple, fontSize: 14}}><Text style={{color: colors.primary, fontSize: 16}}>Scan UPC </Text>to verify your review and purchase and earn tokens</Text>
          </View>
        </View>
      </ScrollView>
      {/* <ReviewCharacteristics
        productId={productId}
        attributes={route.params.attributes}
        handleAttributes={handleAttributes}
      /> */}
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: Platform.OS === 'ios' ? 0 : 12,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 19,
    paddingHorizontal: 24,
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 6,
    paddingTop: 19,
    paddingBottom: 15,
    paddingLeft: 7.5,
    paddingRight: 7.5,
    backgroundColor: colors.itemBackgroundColor,
    alignItems: 'center',
  },
  dateContainer: {
    paddingBottom: 13,
    paddingRight: 13,
    width: '100%',
    alignItems: 'flex-end',
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 0.5,
  },
  textDate: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textRate: {
    fontSize: 20,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
    marginTop: 10,
    marginBottom: 14,
  },
  starContainerStyle: {
    width: 241,
    height: 34,
  },
  starStyle: {
    width: 37,
    height: 34,
  },
  textInputContainer: {
    height: 152,
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 16.5,
    borderTopColor: colors.greyWhite,
    borderTopWidth: 0.5,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 0.5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    //marginHorizontal: 24,
    marginVertical: 20,
  },
  scanButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: 8,
    paddingVertical: 9,
    marginTop: 20,
    borderColor: colors.lightPurple,
    borderWidth: 1,
    borderRadius: 12,
  },
  textScanUpc: {
    fontSize: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
    marginLeft: 15,
  },
  iconPurpleBudbo: {
    width: 32,
    height: 32,
  },
  scanButtonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: '100%',
    height: 55,
    borderRadius: 12
  },
  textSubmit: {
    fontSize: 16,
  },
  iconCheck: {
    width: 15,
    height: 12,
    marginRight: 32,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  iconInfo: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginTop: -10
  }
});
