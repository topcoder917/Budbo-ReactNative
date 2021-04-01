import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {wp} from 'config/utils';

import {setShowMatch} from 'budboRedux/actions/matchActions';

import Match from '../../screens/match/Match';

function MatchModal(props) {
  const sheetRef = useRef(null);
  let animatedCallbackNode = new Animated.Value(1);
  const tabBarHeight = Math.round(Math.round(useBottomTabBarHeight()));

  useEffect(() => {
    if (props.isShowMatch) {
      sheetRef.current.snapTo(0);
    } else {
      sheetRef.current.snapTo(1);
    }
  }, [props.isShowMatch]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.handlerContainer} />
        <Text style={styles.textTitle}>Match</Text>
      </View>
    );
  };

  const renderContent = () => {
    return <Match {...props} height={contentHeight - 110} />;
  };

  const contentHeight =
    constants.screenHeight -
    tabBarHeight -
    constants.screenSafeAreaBottom -
    constants.screenSafeAreaTop - 64;

  const animatedShadowOpacity = Animated.interpolate(animatedCallbackNode, {
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <BottomSheet
        ref={sheetRef}
        callbackThreshold={0.1}
        snapPoints={[contentHeight, 0]}
        initialSnap={1}
        callbackNode={animatedCallbackNode}
        renderHeader={() => renderHeader()}
        renderContent={() => renderContent()}
        onCloseEnd={() => props.setShowMatch(false)}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    </View>
  );
}

MatchModal.defaultProps = {
  isShowMatch: false,
  setShowMatch: () => {},
};

MatchModal.propTypes = {
  isShowMatch: PropTypes.bool,
  setShowMatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isShowMatch: state.match.isShowMatch,
});

const mapDispatchToProps = {
  setShowMatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchModal);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
  },
  headerContainer: {
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 34,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handlerContainer: {
    width: wp(35),
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.greyWhite,
    alignSelf: 'center',
  },
  textTitle: {
    width: '100%',
    fontSize: 36,
    lineHeight: 36,
    color: colors.soft,
    fontFamily: fonts.sfProDisplayBold,
    marginLeft: 13,
    marginTop: 11,
  },
});
