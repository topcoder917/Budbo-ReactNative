import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

import RoundedButton from 'components/common/RoundedButton';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];
const palceholderImageUrl = 'https://via.placeholder.com/128x128?text=PRODUCT';

export default function NearbyItem({item, onPress}) {
  const joinedTypes = item.types.map((type) => productTypes[type]).join(' ');
  let typesColor = colors.hybridColor;
  if (joinedTypes.toLowerCase().includes('indica')) {
    typesColor = colors.indicaColor;
  } else if (joinedTypes.toLowerCase().includes('sativa')) {
    typesColor = colors.sativaColor;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      <View style={styles.contentContainer}>
        <Text style={styles.textName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.categroyAndTypeContainer}>
          <Text style={styles.textGeneral}>
            {productCategories[item.category]}
          </Text>
          {item.types.length > 0 && <Text style={styles.textGeneral}> | </Text>}
          <Text style={[styles.textGeneral, {color: typesColor}]}>
            {joinedTypes}
          </Text>
        </View>
        <Text
          style={[styles.textGeneral, styles.textDescription]}
          numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.locationContainer}>
          <RoundedButton
            style={styles.findLocationsButton}
            title="Find Locations"
            onPress={() => onPress()}
          />
        </View>
      </View>
      <View style={styles.coverImageContainer}>
        <FastImage
          style={styles.imageCover}
          source={{
            uri: item.image || palceholderImageUrl,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 327,
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 17,
  },
  coverImageContainer: {
    width: 128,
    height: 128,
    position: 'absolute',
    borderRadius: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  imageCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    marginLeft: 80,
    paddingTop: 26,
    paddingBottom: 16,
    paddingLeft: 64,
    paddingRight: 21,
    borderRadius: 6,
    justifyContent: 'space-between',
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  categroyAndTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGeneral: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.29,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 30
  },
  textName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textDescription: {
    marginTop: 8,
  },
  findLocationsButton: {
    width: 96,
  },
});
