import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'moment';
const screenWidth = Math.round(Dimensions.get('window').width);

const Item = ({item, onPress, style}) => (
  <View
    style={{
      width: '100%',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 12,
      paddingBottom: 12,
      backgroundColor: colors.itemBackgroundColor,
      borderRadius: 12
    }}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: (32 * screenWidth) / 375,
            height: (32 * screenWidth) / 375,
            borderRadius: (32 * screenWidth) / 375 / 2,
            marginRight: 15,
          }}>
          <FastImage
            style={{
              width: (32 * screenWidth) / 375,
              height: (32 * screenWidth) / 375,
              borderRadius: (32 * screenWidth) / 375 / 2,
            }}
            source={{uri: item.image}}
          />
        </View>
        <Text
          style={{
            fontSize: (12 * screenWidth) / 375,
            fontFamily: fonts.sfProTextRegular,
            color: colors.soft,
          }}>
          {item.firstname} {item.lastname.substr(0, 1)}. | {item.mark}
        </Text>
        <Image
          style={{
            width: (16 * screenWidth) / 375,
            height: (16 * screenWidth) / 375,
            marginLeft: 20,
            tintColor: colors.primary,
          }}
          source={require('assets/icons/star_white.png')}
        />
      </View>
      <Text
        style={{
          fontSize: (12 * screenWidth) / 375,
          fontFamily: fonts.sfProTextRegular,
          color: colors.soft,
        }}>
        {item.date}
      </Text>
    </View>
    <Text
      style={{
        fontSize: (14 * screenWidth) / 375,
        fontFamily: fonts.sfProTextRegular,
        color: colors.greyWhite,
      }}>
      {item.content}
    </Text>
  </View>
);

export default function ProductInfoReviews(props) {
  const navigation = props.navigation;
  const product = props.product;
  const productId = product.id;
  const attributes = product.attributes;

  const [reviews, setReviews] = React.useState([]);
  const [rate, setRate] = React.useState(product.rate);

  React.useEffect(() => {
    const review_url =
      constants.baseApiUrl + 'api/product_reviews/' + productId;
    fetch(review_url, {method: 'post'})
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      });
  }, [productId]);

  // const [rate, setRate] = React.useState(3);
  const renderItem = ({item}) => {
    let data = {
      mark: item.rate,
      image: item.image ? item.image : constants.defaultAvatar,
      firstname: item.user.first_name,
      lastname: item.user.last_name,
      date: Moment(item.created_at).format('MMM d, yyyy'),
      content: item.content,
    };
    return <Item item={data} onPress={() => {}} />;
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Reviews</Text>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 16, height: 16}}
              source={require('assets/icons/star_outline.png')}
            />
            <Text style={styles.reviewText}>{product.rate} </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewAllProductReviews', {
                  productId: productId,
                  rate: product.rate,
                });
              }}>
              <Text style={styles.seeAll}>(see all {reviews.length})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {props.write && (
        <View style={{width: '100%', alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProductReview', {
                productId: productId,
                productName: product.name,
                attributes: attributes,
              });
            }}>
            <Text style={styles.writeReviewText}>
              Write a review, get Budbo tokens!
            </Text>
          </TouchableOpacity>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rate}
            fullStar={require('assets/icons/star_purple.png')}
            emptyStar={require('assets/icons/star_gray.png')}
            halfStar={require('assets/icons/half_star.png')}
            starStyle={styles.starStyle}
            containerStyle={{width: 215, height: 24}}
            selectedStar={(rating) => {
              setRate(rating);
              props.navigation.navigate('ProductReview', {
                productId: productId,
                productName: product.name,
                attributes: attributes,
              });
            }}
          />
        </View>
      )}
      <View
        style={{
          width: '100%',
          marginTop: 32,
          marginBottom: 13,
          borderBottomWidth: 1,
          borderBottomColor: colors.greyWhite,
        }}
      /> */}
      <FlatList
        style={styles.reviewsContainer}
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  reviewText: {
    fontSize: 16,
    fontFamily: fonts.sfProTextLight,
    color: colors.greyWhite,
    marginLeft: 15,
  },
  seeAll: {
    fontSize: 16,
    fontFamily: fonts.sfProTextLight,
    color: colors.greyWhite,
    marginLeft: 5,
  },
  writeReviewText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginBottom: 7,
  },
  starStyle: {
    width: 26,
    height: 24,
  },
  reviewsContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
});
