import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import HeaderBar from 'components/common/HeaderBar';
import GradientButton from 'components/common/GradientButton';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

import {connect} from 'react-redux';
import {refreshHome} from 'budboRedux/actions/homeActions';

function RetailerReview(props) {
  const navigation = props.navigation;
  const route = props.route;
  const {userId, retailerName} = route.params;

  const [mark, setMark] = React.useState(4);
  const [content, setContent] = React.useState('');

  const handleSubmit = () => {
    const url = constants.baseApiUrl + 'api/add_retailer_review';
    const data = {
      userId: userId,
      rate: mark,
      content: content,
      providerId: 1,
    };
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setMark(0);
        setContent('');
        props.refreshHome(props.refreshCount + 1);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        leftButton="back"
        kind="review"
        onLeftPress={() => navigation.pop()}
      />
      <View style={styles.contentContainer}>
        <ScrollView
          style={{
            flex: 1,
            width: Math.round(Dimensions.get('window').width) - 48,
          }}>
          <View style={styles.reviewContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{moment().format('MMM D YYYY')}</Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.sfProDisplayBold,
                color: colors.white,
                marginTop: 10,
                marginBottom: 14,
              }}>
              Please Rate {retailerName}
            </Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={mark}
              fullStar={require('assets/icons/star_purple.png')}
              emptyStar={require('assets/icons/star_gray.png')}
              halfStar={require('assets/icons/half_star.png')}
              starStyle={styles.starStyle}
              containerStyle={{width: 241, height: 34}}
              selectedStar={(rating) => {
                setMark(rating);
              }}
            />
            <View
              style={{
                borderTopColor: colors.greyWhite,
                borderTopWidth: 1,
                borderBottomColor: colors.greyWhite,
                borderBottomWidth: 1,
                height: 152,
                width: '100%',
                marginTop: 25,
                paddingLeft: 16.5,
                paddingRight: 16.5,
              }}>
              <TextInput
                autoFocus={true}
                multiline
                editable
                numberOfLines={7}
                textAlignVertical="top"
                placeholder="Just Start Typing Here…"
                value={content}
                placeholderTextColor={colors.soft}
                style={styles.textInput}
                onChangeText={(text) => {
                  setContent(text);
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <GradientButton
              width="100%"
              height={56}
              borderRadius={28}
              title="Submit"
              onPress={handleSubmit}
            />
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  refreshCount: state.home.refreshCount,
});

const mapDispatchToProps = {
  refreshHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(RetailerReview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: Platform.OS == 'ios' ? 0 : 12,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 19,
    paddingBottom: 21,
    paddingLeft: 24,
    paddingRight: 24,
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 6,
    paddingTop: 19,
    paddingBottom: 15,
    paddingLeft: 7.5,
    paddingRight: 7.5,
    backgroundColor: colors.secondaryBackgroundColor,
    alignItems: 'center',
  },
  dateContainer: {
    paddingBottom: 13,
    paddingRight: 13,
    width: '100%',
    alignItems: 'flex-end',
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  starStyle: {width: 37, height: 34},
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
  },
});
