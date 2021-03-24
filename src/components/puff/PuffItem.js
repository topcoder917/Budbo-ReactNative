import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import RoundedButton from '../common/RoundedButton';
import ProductPriceSegment from '../home/ProductPriceSegment';

import {connect} from 'react-redux';

function PuffItem(props) {
  console.log('props: ', JSON.stringify(props))
  const item = props.item;
  const onPress = props.onPress;
  const style = props.style;
  const user = props.user;

  const handleDelete = () => {
    const url = constants.baseApiUrl + 'api/remove_puff';
    const data = {
      userId: user.id,
      productId: item.id,
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
        props.handleDelete(item.id);
      });
  };

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-56, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          width: 56,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            width: '100%',
            height: 186,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            transform: [{scaleX: scale}],
          }}>
          <LinearGradient
            colors={[
              colors.firstGradientColor,
              colors.secondGradientColor,
              colors.thirdGradientColor,
            ]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}>
            <TouchableOpacity onPress={handleDelete}>
              <Animated.Image
                style={{
                  width: 24,
                  height: 24,
                  transform: [{scale}],
                }}
                source={require('assets/icons/remove.png')}
              />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.swipContainer}>
      <Swipeable renderRightActions={RightActions}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={{width: 80}} />
          <View style={[styles.contentContainer]}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
              {!!item.class2 && (
                <View style={{flexDirection: 'row', aligmItems: 'center'}}>
                  <Text
                    style={[
                      styles.class2,
                      {
                        color: item.class2.toLowerCase().includes('indica')
                          ? colors.indicaColor
                          : item.class2.toLowerCase().includes('sativa')
                          ? colors.sativaColor
                          : colors.hybridColor,
                      },
                    ]}>
                    {item.class2}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.content} numberOfLines={4}>
              {item.content}
            </Text>
            <RoundedButton
              style={styles.locationsButton}
              title="Locations"
              onPress={onPress}
            />
          </View>
          <FastImage style={styles.image} source={item.image} />
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PuffItem);
const styles = StyleSheet.create({
  swipContainer: {
    width: '100%',
    marginVertical: 10,
    paddingRight: 24,
  },
  container: {
    width: '100%',
    height: 186,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: 160,
    height: 154,
    position: 'absolute',
    left: 24,
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    paddingTop: 32,
    paddingBottom: 24,
    paddingLeft: 96,
    paddingRight: 16,
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
  },
  content: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  class2: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  locationsButton: {
    width: 96,
  },
});
