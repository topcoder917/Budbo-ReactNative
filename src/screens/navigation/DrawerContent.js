import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {wp, hp} from 'config/utils';

import {setShowMatch} from 'budboRedux/actions/matchActions';

import MyDrawerItem from './MyDrawerItem';
import ProgressBar from 'components/common/ProgressBar';
import GradientButton from 'components/common/GradientButton';

// const checkIcon = require('assets/icons/check.png');
const homeIcon = require('assets/icons/home_inactive.png');
const nearbyIcon = require('assets/icons/nearby_inactive.png');
const puffIcon = require('assets/icons/puff_inactive.png');
const matchIcon = require('assets/icons/match_inactive.png');
const walletIcon = require('assets/icons/wallet_inactive.png');
const tokenIcon = require('assets/icons/earn_tokens.png');
const supportIcon = require('assets/icons/support.png');

const DrawerContent = (props) => {
  const menuItems = [
    {
      label: 'Home',
      icon: homeIcon,
      onPress: () => {
        props.navigation.navigate('TabScreens', {
          screen: 'HomeScreens',
        });
      },
    },
    {
      label: 'Nearby',
      icon: nearbyIcon,
      onPress: () => props.navigation.navigate('NearbyScreens'),
    },
    {
      label: 'Puff or Pass',
      icon: puffIcon,
      onPress: () => props.navigation.navigate('PuffScreens'),
    },
    {
      label: 'Match',
      icon: matchIcon,
      onPress: () => {
        // props.navigation.navigate('MatchScreens');
        props.navigation.navigate('TabScreens', {
          screen: 'HomeScreens',
        });
        props.setShowMatch(!props.isShowMatch);
        // props.navigation.toggleDrawer();
      },
    },
    {
      label: 'Wallet',
      icon: walletIcon,
      onPress: () => props.navigation.navigate('WalletScreens'),
    },
    {
      label: 'Earn Tokens',
      iconStyle: {width: 35, height: 38, marginLeft: -4},
      labelStyle: {marginLeft: -7},
      icon: tokenIcon,
      onPress: () => props.navigation.navigate('EarnToken'),
    },
  ];

  const renderItem = ({item}) => <MyDrawerItem {...item} />;

  return (
    <View style={styles.container} {...props}>
      <View style={styles.avatarContainer}>
        <FastImage
          style={styles.imageAvatar}
          source={{uri: props.user.image || constants.maleAvatar}}
        />
        <Text style={styles.textFullName}>
          {props.user.first_name} {props.user.last_name}
        </Text>
        <View style={styles.usernameContainer}>
          <Text style={styles.textUsername}>@{props.user.username}</Text>
        </View>
        <View style={styles.profileButtonContainer}>
          <GradientButton
              style={styles.profileButton}
              textStyle={styles.textProfile}
              title="Edit Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />     
        </View>
      </View>
      <FlatList
        style={styles.drawItemContainer}
        scrollEnabled={false}
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.supportButton}
        activeOpacity={0.8}
        onPress={() => console.log('Support')}>
        <Image style={styles.iconSupport} source={supportIcon} />
        <Text style={styles.textSupport}>Support</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <ProgressBar value={90} />
        <Text style={styles.textDescription}>
          Finish your profile to earn Budbo Tokens
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isShowMatch: state.match.isShowMatch,
});

const mapDispatchToProps = {
  setShowMatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  imageAvatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  textFullName: {
    color: colors.soft,
    fontSize: 20,
    marginTop: 12,
    fontFamily: fonts.sfProDisplayBold,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31,
  },
  textUsername: {
    color: colors.greyWhite,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
  },
  iconCheck: {
    width: 15,
    height: 12,
    marginLeft: 15,
  },
  drawItemContainer: {
    marginTop: wp(6.5),
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    position: 'absolute',
    bottom: (27 * constants.screenHeight) / 812,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(16),
  },
  textSupport: {
    fontSize: 14,
    fontFamily: fonts.sfProTextLight,
    color: colors.soft,
  },
  iconSupport: {
    width: 16,
    height: 16,
    marginRight: 16,
    resizeMode: 'contain',
  },
  progressContainer: {
    marginTop: hp(6.5),
    marginLeft: wp(14),
    marginBottom: 30,
  },
  textDescription: {
    marginTop: 12.5,
    color: colors.soft,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  profileButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  profileButton: {
    width: 140,
    height: 30,
    borderRadius: 10,  
  },
  textProfile: {
    fontSize: 16,
  },
});
