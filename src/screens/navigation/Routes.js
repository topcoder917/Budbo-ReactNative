// import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from 'config/colors';
import constants from 'config/constants';
import Styles from './Styles';

import MyDrawer from './MyDrawer';
import Onboarding from '../onboarding';
import SignIn from '../user/SignIn';
import SignUp from '../user/SignUp';
import VerifyAccount from '../user/VerifyAccount';
import VerifyAccountCode from '../user/VerifyAccountCode';
import CompleteProfile from '../user/CompleteProfile';
import ForgotPasswordUsername from '../user/ForgotPasswordUsername';
import ForgotPasswordCode from '../user/ForgotPasswordCode';
import ForgotPasswordNew from '../user/ForgotPasswordNew';
import ForgotPasswordComplete from '../user/ForgotPasswordComplete';

const AuthStack = createStackNavigator();
const AuthScreens = () => (
  <AuthStack.Navigator
    initialRouteName="SignIn"
    screenOptions={Styles.screenOptions}>
    <AuthStack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{headerTransparent: true, headerShown: false}}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}}

      // options={{
      //   title: 'Sign up to budbo.io',
      // }}
    />
    <AuthStack.Screen
      name="VerifyAccount"
      component={VerifyAccount}
      options={{title: 'Verify your account'}}
    />
    <AuthStack.Screen
      name="VerifyAccountCode"
      component={VerifyAccountCode}
      options={{title: 'Enter verification code'}}
    />
    <AuthStack.Screen
      name="CompleteProfile"
      component={CompleteProfile}
      options={{title: 'Complete your profile'}}
    />
    <AuthStack.Screen
      name="ForgotPasswordUsername"
      component={ForgotPasswordUsername}
      options={{title: 'Forgot password'}}
    />
    <AuthStack.Screen
      name="ForgotPasswordCode"
      component={ForgotPasswordCode}
      options={{title: 'Phone confirmation'}}
    />
    <AuthStack.Screen
      name="ForgotPasswordNew"
      component={ForgotPasswordNew}
      options={{title: 'Forgot password'}}
    />
    <AuthStack.Screen
      name="ForgotPasswordComplete"
      component={ForgotPasswordComplete}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();

const Routes = () => {
  const [isInit, setIsInit] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);

  const insets = useSafeAreaInsets();
  constants.screenSafeAreaTop = insets.top;
  constants.screenSafeAreaBottom = insets.bottom;

  React.useEffect(() => {
    AsyncStorage.getItem(constants.currentUser)
      .then((jsonValue) => {
        if (jsonValue) {
          setIsAuth(true);
          SplashScreen.hide();
        }
        setIsInit(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInit(true);
      });
  }, []);

  if (!isInit) {
    return <View style={styles.container} />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isAuth ? 'DrawerScreens' : 'AuthScreens'}
        headerMode="none">
        <RootStack.Screen name="AuthScreens" component={AuthScreens} />
        <RootStack.Screen name="DrawerScreens" component={MyDrawer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
});
