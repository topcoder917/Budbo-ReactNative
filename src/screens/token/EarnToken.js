/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import RoundedButton from 'components/common/RoundedButton';
import HeaderMenu from 'components/common/HeaderMenu';
import GradientButton from 'components/common/GradientButton';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {openLink} from 'config/utils';

const goldBudboIcon = require('assets/icons/budbo_gold.png');
const linkIcon = require('assets/icons/link.png');
const likeIcon = require('assets/icons/like.png');
const checkIcon = require('assets/icons/check.png');

const simpleUserIcon = require('assets/icons/user_gray.png');
const infoIcon = require('assets/icons/info.png');

export default function EarnToken(props) {
  React.useEffect(() => {
    setNavigationBar();
  }, []);
  const navigation = props.navigation;
  const isSubTab = props.isSubTab;
  console.log(isSubTab);
  const setNavigationBar = () => {
    navigation.setOptions({
      headerLeft: () => <HeaderMenu navigation={navigation} />,
    });
  };

  const handleOpenSocial = (socialLink) => {
    openLink(socialLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={
              isSubTab
                ? [{paddingHorizontal: 12}]
                : {paddingHorizontal: 24}
            }>
          <Text
            style={
              isSubTab
                ? [styles.textTitle, {fontSize: 22}]
                : styles.textTitle
            }>
            Earn Tokens
          </Text>
          <Text style={styles.textDescription}>
            Be sure to follow Budbo and use your referral link to invite to
            friends and start earning Budbo Tokens Today.
          </Text>          
          </View>  

          <View
            style={
              isSubTab ? styles.inSubTabTokenContainer : styles.tokenContainer
            }>
            <Image style={styles.iconLargeBudbo} source={goldBudboIcon} />
            <View>
              <Text style={styles.textBudboToken}>The Budbo Token</Text>
              <Text style={styles.textBubo}>Referral ID:</Text>
              <View style={styles.siteLinkContainer}>
                <Text style={styles.textLink}>
                  https://budbo.io/refid=LukeP
                </Text>
                <Image style={styles.iconLink} source={linkIcon} />
              </View>
              <GradientButton
                style={styles.inviteButton}
                textStyle={styles.textInviteBtn}
                title="Invite Friend via Text"
                //onPress={() => openVerifycationModal(1)}
              />
              {/* <RoundedButton
                style={styles.inviteButton}
                title="Invite Friends via Email"
                //   onPress={() => navigation.navigate('EditProfile')}
              /> */}
            </View>
          </View>
          <Text style={styles.textSectionTitle}>Follow and Join</Text>
          <View style={styles.sectionContainer}>
            {constants.socialLinks.map((social, key) => (
              <TouchableOpacity
                style={
                  key == 0
                    ? [styles.sectionItem, {borderTopWidth: 0}]
                    : styles.sectionItem
                }
                activeOpacity={0.8}
                onPress={() => handleOpenSocial(social.link)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={styles.followIcon} source={social.icon} />
                  <Text style={styles.textSectionItem}>{social.name}</Text>
                </View>
                {social.subscribed ? (
                  <Image style={styles.subscribeIcon} source={checkIcon} />
                ) : (
                  <RoundedButton
                    style={styles.subscribeButton}
                    title="Subscribe"
                    //   onPress={() => navigation.navigate('EditProfile')}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.textSectionTitle}>
            News Feed
          </Text>
          <View
            style={[styles.sectionContainer, styles.bottomSectionContainer]}>
            {/* <View style={styles.reweetTopContainer}>
              <View style={styles.rowContainer}>
                <Image style={styles.iconSmallBudbo} source={goldBudboIcon} />
                <View style={styles.budboContainer}>
                  <Text style={styles.textBudbo}>Budbo</Text>
                  <Text style={styles.textBudboApp}>@BudboApp</Text>
                </View>
              </View>
              <RoundedButton style={styles.retweetButton} title="Retweet" />
            </View> */}
            <Text style={styles.textDowloadBudboToday}>
              Download Budbo Today
            </Text>
            <Text style={styles.textBudboLink}>
              https://www.budbo.io #budbo #420
            </Text>
            <Text style={styles.textBudboLink}>
              #blockchain #freebies #download
            </Text>
            <Text style={styles.textDate}>4:20 PM - July 10, 2020</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoLeftContainer}>
                <Image style={styles.iconLike} source={likeIcon} />
                <Text style={styles.textLikes}>22</Text>
                <Image style={styles.iconUser} source={simpleUserIcon} />
                <Text style={styles.textOther}>
                  See Patryk Ilnicki’s other Tw…
                </Text>
              </View>
              <Image style={styles.iconInfo} source={infoIcon} />
            </View>
            <RoundedButton style={styles.retweetButton} title="Retweet" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 12,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 31,
  },
  tokenContainer: {
    // paddingHorizontal: 12,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inSubTabTokenContainer: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 36,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
    marginTop: 19,
    marginBottom: 7,
    // paddingHorizontal: 24,
  },
  textDescription: {
    fontSize: 14,
    color: colors.greyWhite,
    //paddingHorizontal: 24,
    paddingVertical: 10,
  },
  iconLargeBudbo: {
    width: 147,
    height: 147,
  },
  iconSmallBudbo: {
    width: 38,
    height: 38,
  },
  textBudboToken: {
    color: colors.soft,
    fontSize: 20,
    marginTop: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  textBubo: {
    color: colors.soft,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    marginTop: 10,
  },
  textLink: {
    color: colors.soft,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    marginRight: 10,
  },
  siteLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  checkIcon: {
    width: 15,
    height: 12,
    marginLeft: 15,
  },
  textSectionTitle: {
    fontSize: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
    marginTop: 32,
    marginBottom: 16,
    paddingLeft: 8,
  },
  sectionContainer: {
    backgroundColor: colors.itemBackgroundColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopColor: colors.greyWhite,
    borderTopWidth: 1,
  },
  textSectionItem: {
    fontSize: 17,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
    marginLeft: 10,
  },
  bottomSectionContainer: {
    paddingHorizontal: 28,
  },
  reweetTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingTop: 26,
    paddingBottom: 10,
    // borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0)',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budboContainer: {
    marginLeft: 8,
  },
  textBudbo: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textBudboApp: {
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
    fontSize: 12,
  },
  textDowloadBudboToday: {
    fontSize: 14,
    color: colors.soft,
    fontFamily: fonts.sfProTextRegular,
  },
  textBudboLink: {
    color: colors.darkBlue,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    marginTop: 5
  },
  textDate: {
    color: colors.soft,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    marginTop : 5
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconLike: {
    width: 14,
    height: 14,
  },
  iconLink: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  followIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  subscribeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textLikes: {
    fontSize: 12,
    color: colors.mediumGray,
    fontFamily: fonts.sfProTextRegular,
    marginLeft: 5,
  },
  iconUser: {
    width: 12,
    height: 14,
    marginLeft: 8,
    marginRight: 5,
  },
  iconInfo: {
    width: 12,
    height: 12,
  },
  textOther: {
    fontSize: 12,
    color: colors.mediumGray,
    fontFamily: fonts.sfProTextRegular,
  },
  inviteButton: {
    width: '80%',
    height: 30,
    borderRadius: 6,
    marginTop: 10,
  },
  textInviteBtn: {
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
  },
  retweetButton: {
    width: 65,
    height: 30,
    borderRadius: 12,
    marginTop: 10,
    padding: 5
  },
  subscribeButton: {
    width: 80,
    height: 30,
    borderColor: colors.lightPurple,
  },
});
