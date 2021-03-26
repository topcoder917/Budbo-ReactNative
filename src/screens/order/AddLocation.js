/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import constants from 'config/constants';
import colors from 'config/colors';
import fonts from 'config/fonts';
import HeaderBar from 'components/common/HeaderBar';

function AddLocation(props) {
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

    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  //setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);

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
