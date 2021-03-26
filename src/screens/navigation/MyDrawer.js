import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import DrawerContent from './DrawerContent';
// import DrawerScreens from './DrawerScreens';

import TabScreen from './TabScreen';
import EarnToken from '../token/EarnToken';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';

import Delivery from '../order/Delivery';
import Pickup from '../order/Pickup';
import Checkout from '../order/Checkout';
import Order from '../order/Order';
import AddLocation from '../order/AddLocation';
import AddPayment from '../order/AddPayment';

import Styles from './Styles';

// import Match from '../match/Match';
// import MatchResults from '../match/MatchResults';
// import MatchAvailableLocation from '../match/AvailableLocation';

import colors from 'config/colors';
import constants from 'config/constants';

const sideMenuBackgroundImage = require('assets/imgs/side_menu_background.png');

const OrderStack = createStackNavigator();

const OrderScreens = () => (
  <OrderStack.Navigator
    // initialRouteName="Order"
    headerMode="none">
    <OrderStack.Screen name="Checkout" component={Checkout} />
    <OrderStack.Screen name="AddLocation" component={AddLocation} />
    <OrderStack.Screen name="AddPayment" component={AddPayment} />
    <OrderStack.Screen name="Order" component={Order} />
    <OrderStack.Screen name="Delivery" component={Delivery} />
    <OrderStack.Screen name="Pickup" component={Pickup} />
  </OrderStack.Navigator>
);

// const MatchStack = createStackNavigator();

// const MatchScreens = (props) => (
//   <MatchStack.Navigator
//     // initialRouteName="Match"
//     screenOptions={Styles.screenOptions}>
//     {/* <MatchStack.Screen name="Match" component={Match} /> */}
//     <MatchStack.Screen
//       name="MatchResults"
//       component={MatchResults}
//       options={{headerShown: false}}
//     />
//     <MatchStack.Screen
//       name="AvailableLocation"
//       component={MatchAvailableLocation}
//       options={{headerShown: false}}
//     />
//   </MatchStack.Navigator>
// );

const DrawerStack = createStackNavigator();

const DrawerScreens = ({animatedStyle}) => {
  return (
    <Animated.View style={[styles.screenContainer, animatedStyle]}>
      <DrawerStack.Navigator
        // initialRouteName="OrderScreens"
        screenOptions={Styles.screenOptions}>
        <DrawerStack.Screen
          name="TabScreens"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <DrawerStack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <DrawerStack.Screen
          name="OrderScreens"
          component={OrderScreens}
          options={{headerShown: false}}
        />    
        <DrawerStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <DrawerStack.Screen name="EarnToken" component={EarnToken} />
        {/* <DrawerStack.Screen
          name="MatchScreens"
          component={MatchScreens}
          options={{headerShown: false}}
        /> */}
      </DrawerStack.Navigator>
    </Animated.View>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  const user = props.user;
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.78],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const marginLeft = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, -constants.screenWidth * 0.12],
  });

  const screenStyles = {left: marginLeft, borderRadius, transform: [{scale}]};

  return (
    <ImageBackground style={styles.container} source={sideMenuBackgroundImage}>
      <LinearGradient
        colors={['rgba(37, 45, 74, 1)', 'rgba(255, 255, 255, 0)']}
        style={styles.container}>
        <View style={styles.mainContentContainer}>
          <Drawer.Navigator
            drawerType="back"
            // initialRouteName="Home"
            // openByDefault
            overlayColor="transparent"
            drawerStyle={styles.drawerStyles}
            contentContainerStyle={styles.contentContainerStyle}
            drawerContentOptions={{
              activeBackgroundColor: 'transparent',
              activeTintColor: colors.soft,
              inactiveTintColor: colors.soft,
            }}
            sceneContainerStyle={styles.sceneContainerStyle}
            drawerContent={(drawerProps) => {
              setProgress(drawerProps.progress);
              return <DrawerContent {...drawerProps} user={user} />;
            }}>
            <Drawer.Screen name="DrawerScreens">
              {() => <DrawerScreens animatedStyle={screenStyles} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: 'rgba(37, 45, 74, 0.7)',
  },
  contentContainerStyle: {
    flex: 1,
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  screenContainer: {
    flex: 1,
    // shadowColor: '#FFF',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.44,
    // shadowRadius: 10.32,
    // elevation: 5,
    // borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  drawerStyles: {
    flex: 1,
    width: '75%',
    backgroundColor: 'transparent',
  },
});
