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

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {openLink} from 'config/utils';

const goldBudboIcon = require('assets/icons/budbo_gold.png');
const likeIcon = require('assets/icons/like.png');
const simpleUserIcon = require('assets/icons/user_gray.png');
const infoIcon = require('assets/icons/info.png');

export default function EarnToken({navigation}) {
  React.useEffect(() => {
    setNavigationBar();
  }, []);

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
        <Text style={styles.textTitle}>Earn Tokens</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <Image style={styles.iconLargeBudbo} source={goldBudboIcon} />
            <View>
              <Text style={styles.textBudboToken}>The Budbo Token</Text>
              <Text style={styles.textBubo}>(BUBO)</Text>
              <RoundedButton
                style={styles.inviteButton}
                title="Invite Friends via Email"
                //   onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          </View>
          <Text style={styles.textSectionTitle}>Follow and Join</Text>
          <View style={styles.sectionContainer}>
            {constants.socialLinks.map((social) => (
              <TouchableOpacity
                style={styles.sectionItem}
                activeOpacity={0.8}
                onPress={() => handleOpenSocial(social.link)}>
                <Text style={styles.textSectionItem}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.textSectionTitle}>
            Retweet the latest from @BudboApp
          </Text>
          <View
            style={[styles.sectionContainer, styles.bottomSectionContainer]}>
            <View style={styles.reweetTopContainer}>
              <View style={styles.rowContainer}>
                <Image style={styles.iconSmallBudbo} source={goldBudboIcon} />
                <View style={styles.budboContainer}>
                  <Text style={styles.textBudbo}>Budbo</Text>
                  <Text style={styles.textBudboApp}>@BudboApp</Text>
                </View>
              </View>
              <RoundedButton style={styles.retweetButton} title="Retweet" />
            </View>
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
    paddingHorizontal: 16,
    paddingBottom: 31,
  },
  profileContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 36,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
    marginTop: 19,
    marginBottom: 7,
    paddingHorizontal: 48,
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
    fontFamily: fonts.sfProDisplayBold,
  },
  textBubo: {
    color: colors.greyWhite,
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    marginBottom: 31,
  },
  checkIcon: {
    width: 15,
    height: 12,
    marginLeft: 15,
  },
  textSectionTitle: {
    fontSize: 17,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    marginTop: 32,
    marginBottom: 16,
    paddingLeft: 8,
  },
  sectionContainer: {
    backgroundColor: colors.secondaryBackgroundColor,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 6,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingTop: 26,
    paddingBottom: 10,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
  },
  textSectionItem: {
    fontSize: 17,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
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
  },
  textDate: {
    color: colors.soft,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconLike: {
    width: 14,
    height: 14,
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
    width: 144,
  },
  retweetButton: {
    width: 54,
    height: 24,
    borderRadius: 12,
  },
});
