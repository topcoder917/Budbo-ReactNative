/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar} from 'react-native-scrollable-tab-view';

import constants from 'config/constants';
import colors from 'config/colors';
import fonts from 'config/fonts';
import HeaderBar from 'components/common/HeaderBar';

import Delivery from './Delivery';
import Pickup from './Pickup';

function Checkout(props) {
  const navigation = props.navigation;
  useEffect(() => {});
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        leftButton="back"
        rightButton="none"
        onLeftPress={() => navigation.pop()}
      />      
      <Text style={styles.texTitle}>Check Out</Text>
      <ScrollableTabView
        // ref={scrollTabRef}
        style={styles.scrollableTabBarContainer}
        tabBarUnderlineStyle={styles.tabBarUnderline}
        tabBarTextStyle={styles.textTabBar}
        tabBarActiveTextColor={colors.primary}
        tabBarInactiveTextColor={colors.greyWhite}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar style={styles.scrollableTabBar} />}>
        <Delivery tabLabel="Delivery" />
        <Pickup tabLabel="Pick up" />
      </ScrollableTabView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  //setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: colors.primaryBackgroundColor,
  },
  texTitle: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginVertical: 15,
    marginLeft: 37,
  },
  scrollableTabBarContainer: {
  },
  tabBarUnderline: {
    height: 1,
    backgroundColor: colors.primary,
  },
  textTabBar: {
    fontSize: 15,
    fontFamily: fonts.sfProTextLight,
  },
  scrollableTabBar: {
    borderBottomColor: colors.secondaryBackgroundColor,
  },
});
