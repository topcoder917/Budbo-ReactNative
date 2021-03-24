import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function AddressItem({item, handleChecked}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.address}>{item.address}</Text>
        <TouchableOpacity
          style={{
            width: 16,
            height: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleChecked}>
          <Image
            style={{width: 12, height: 12}}
            source={
              item.checked
                ? require('assets/icons/check.png')
                : require('assets/icons/uncheck.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 4,
        }}>
        <Text style={styles.city}>
          {item.city}, {item.state} {item.postal}
        </Text>
        <TouchableOpacity>
          <Image
            style={styles.imageIcon}
            source={require('assets/icons/edit.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 276,
    height: 80,
    marginRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: 6,
  },
  imageIcon: {
    width: 16,
    height: 16,
  },
  address: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
  },
  city: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
});
