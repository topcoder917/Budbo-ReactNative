import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import colors from 'config/colors';
import constants from 'config/constants';
import Styles from './Styles';

import {setShowMatch} from 'budboRedux/actions/matchActions';

import Home from '../home/Home';
import Retailer from '../home/Retailer';
import ProductInfo from '../home/ProductInfo';
import BrandProductInfo from '../home/BrandProductInfo';
import RetailerReview from '../home/RetailerReview';
import ProductReview from '../home/ProductReview';
import Brand from '../home/Brand';
import ViewAll from '../home/ViewAll';
import ViewAllBrands from '../home/ViewAllBrands';
import ViewAllProducts from '../home/ViewAllProducts';
import ViewAllProductReviews from '../home/ViewAllProductReviews';
import AvailableLocation from '../home/AvailableLocation';
import BrandAvailableLocation from '../home/BrandAvailableLocation';

import Nearby from '../nearby/Nearby';

import Discover from '../puff/Discover';
import MyPuff from '../puff/MyPuff';
import PuffAvailableLocation from '../puff/AvailableLocation';

// import Match from '../match/Match';
import MatchResults from '../match/MatchResults';
import MatchAvailableLocation from '../match/AvailableLocation';

import Wallet from '../wallet/Wallet';
import Order from '../order/Order';

import CheckOutModal from 'components/common/CheckOutModal';

import MatchModal from 'components/common/MatchModal';

const activeHomeIcon = require('assets/icons/home.png');
const inactiveHomeIcon = require('assets/icons/home_inactive.png');
const activeNearbyIcon = require('assets/icons/nearby.png');
const inactiveNearbyIcon = require('assets/icons/nearby_inactive.png');
const activePuffIcon = require('assets/icons/puff.png');
const inactivePuffIcon = require('assets/icons/puff_inactive.png');
const activeMatchIcon = require('assets/icons/match.png');
const inactiveMatchIcon = require('assets/icons/match_inactive.png');
const activeWalletIcon = require('assets/icons/wallet.png');
const inactiveWalletIcon = require('assets/icons/wallet_inactive.png');

const HomeStack = createStackNavigator();

const HomeScreens = (props) => (
  <View style={styles.stackContainer}>
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={Styles.screenOptions}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Retailer"
        component={Retailer}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="RetailerReview"
        component={RetailerReview}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProductReview"
        component={ProductReview}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Brand"
        component={Brand}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ViewAll"
        component={ViewAll}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="BrandProductInfo"
        component={BrandProductInfo}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ViewAllBrands"
        component={ViewAllBrands}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AvailableLocation"
        component={AvailableLocation}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="BrandAvailableLocation"
        component={BrandAvailableLocation}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ViewAllProducts"
        component={ViewAllProducts}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ViewAllProductReviews"
        component={ViewAllProductReviews}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
    <MatchModal {...props} />
    <CheckOutModal {...props} />
  </View>
);

const NearbyStack = createStackNavigator();

const NearbyScreens = (props) => (
  <View style={styles.stackContainer}>
    <NearbyStack.Navigator
      initialRouteName="Nearby"
      screenOptions={Styles.screenOptions}>
      <NearbyStack.Screen name="Nearby" component={Nearby} />
      <NearbyStack.Screen
        name="Retailer"
        component={Retailer}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="RetailerReview"
        component={RetailerReview}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ProductReview"
        component={ProductReview}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="Brand"
        component={Brand}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ViewAll"
        component={ViewAll}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="BrandProductInfo"
        component={BrandProductInfo}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ViewAllBrands"
        component={ViewAllBrands}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="AvailableLocation"
        component={AvailableLocation}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="BrandAvailableLocation"
        component={BrandAvailableLocation}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ViewAllProducts"
        component={ViewAllProducts}
        options={{headerShown: false}}
      />
      <NearbyStack.Screen
        name="ViewAllProductReviews"
        component={ViewAllProductReviews}
        options={{headerShown: false}}
      />
    </NearbyStack.Navigator>
    <MatchModal {...props} />
    <CheckOutModal {...props} />
  </View>
);

const PuffStack = createStackNavigator();

const PuffScreens = (props) => (
  <View style={styles.stackContainer}>
    <PuffStack.Navigator
      initialRouteName="Discover"
      screenOptions={Styles.screenOptions}>
      <PuffStack.Screen name="Discover" component={Discover} />
      <PuffStack.Screen
        name="MyPuff"
        component={MyPuff}
        options={{headerShown: false}}
      />
      <PuffStack.Screen
        name="AvailableLocation"
        component={PuffAvailableLocation}
        options={{headerShown: false}}
      />
    </PuffStack.Navigator>
    <MatchModal {...props} />
    <CheckOutModal {...props} />
  </View>
);

const MatchStack = createStackNavigator();

const MatchTabScreens = (props) => (
  <View style={styles.stackContainer}>
    <MatchStack.Navigator
      // screenOptions={{...TransitionPresets.ModalSlideFromBottomIOS}}
      initialRouteName="Match"
      screenOptions={Styles.screenOptions}>
      {/* <MatchStack.Screen name="Match" component={Match} /> */}
      <MatchStack.Screen
        name="MatchResults"
        component={MatchResults}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="AvailableLocation"
        component={MatchAvailableLocation}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="Retailer"
        component={Retailer}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="RetailerReview"
        component={RetailerReview}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ProductReview"
        component={ProductReview}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="Brand"
        component={Brand}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ViewAll"
        component={ViewAll}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="BrandProductInfo"
        component={BrandProductInfo}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ViewAllBrands"
        component={ViewAllBrands}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="BrandAvailableLocation"
        component={BrandAvailableLocation}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ViewAllProducts"
        component={ViewAllProducts}
        options={{headerShown: false}}
      />
      <MatchStack.Screen
        name="ViewAllProductReviews"
        component={ViewAllProductReviews}
        options={{headerShown: false}}
      />
    </MatchStack.Navigator>
    <CheckOutModal {...props} />
  </View>
);

const WalletStack = createStackNavigator();

const WalletScreens = (props) => (
  <View style={styles.stackContainer}>
    <WalletStack.Navigator
      initialRouteName="Wallet"
      screenOptions={Styles.screenOptions}>
      <WalletStack.Screen name="Wallet" component={Wallet} />
      <WalletStack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
    </WalletStack.Navigator>
    <MatchModal {...props} />
    <CheckOutModal {...props} />
  </View>
);

const BottomTab = createBottomTabNavigator();

function TabScreen(props) {
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: constants.screenSafeAreaBottom},
      ]}>
      <BottomTab.Navigator
        initialRouteName="HomeScreens"
        tabBarOptions={{
          inactiveBackgroundColor: colors.primaryBackgroundColor,
          activeBackgroundColor: colors.primaryBackgroundColor,
          showLabel: false,
          safeAreaInsets: {
            bottom: 0,
            top: 0,
          },
        }}>
        <BottomTab.Screen
          name="HomeScreens"
          component={HomeScreens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabBarIconWrapper}>
                <Image
                  style={styles.icon}
                  source={
                    focused && !props.isShowMatch
                      ? activeHomeIcon
                      : inactiveHomeIcon
                  }
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              console.log('tabPress...');
              props.setShowMatch(false);
            },
          })}
        />
        <BottomTab.Screen
          name="NearbyScreens"
          component={NearbyScreens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabBarIconWrapper}>
                <Image
                  style={styles.icon}
                  source={
                    focused && !props.isShowMatch
                      ? activeNearbyIcon
                      : inactiveNearbyIcon
                  }
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              console.log('tabPress...');
              props.setShowMatch(false);
            },
          })}
        />
        <BottomTab.Screen
          name="PuffScreens"
          component={PuffScreens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabBarIconWrapper}>
                <Image
                  style={styles.icon}
                  source={
                    focused && !props.isShowMatch
                      ? activePuffIcon
                      : inactivePuffIcon
                  }
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              console.log('tabPress...');
              props.setShowMatch(false);
            },
          })}
        />
        <BottomTab.Screen
          name="MatchTabScreens"
          // component={() => null}
          component={MatchTabScreens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabBarIconWrapper}>
                <Image
                  style={styles.icon}
                  source={
                    props.isShowMatch ? activeMatchIcon : inactiveMatchIcon
                  }
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              console.log('tabPress...');
              e.preventDefault();

              if (props.isShowMatch && navigation.isFocused()) {
                navigation.popToTop();
                navigation.goBack();
                return;
              }
              props.setShowMatch(!props.isShowMatch);
            },
          })}
        />
        <BottomTab.Screen
          name="WalletScreens"
          component={WalletScreens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.tabBarIconWrapper}>
                <Image
                  style={styles.icon}
                  source={
                    focused && !props.isShowMatch
                      ? activeWalletIcon
                      : inactiveWalletIcon
                  }
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              console.log('tabPress...');
              props.setShowMatch(false);
            },
          })}
        />
      </BottomTab.Navigator>
    </View>
  );
}

const mapStateToProps = (state) => ({
  isShowMatch: state.match.isShowMatch,
});

const mapDispatchToProps = {
  setShowMatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  stackContainer: {
    flex: 1,
  },
  tabBarIconWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
