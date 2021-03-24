import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';

import colors from 'config/colors';
import RoundedButton from '../common/RoundedButton';

export default function ProfileItem({title, icon, isEditable, onEdit}) {
  return (
    <View style={styles.container}>
      <Image style={styles.imageIcon} source={icon} />
      <Text style={styles.textTitle}>{title}</Text>
      {isEditable ? (
        <RoundedButton
          style={styles.editProfileButton}
          title="Edit"
          onPress={() => onEdit()}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 6,
    paddingVertical: 10,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.soft,
    marginHorizontal: 16,
  },
  editProfileButton: {
    width: 50,
  },
});
