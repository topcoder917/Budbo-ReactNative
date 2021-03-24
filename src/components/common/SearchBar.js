import React, {useState} from 'react';
import {View, ViewPropTypes, Image, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import colors from 'config/colors';
import fonts from 'config/fonts';

const searchIcon = require('assets/icons/search.png');

export default function SearchBar(props) {
  const [value, setValue] = useState('');

  const onChangeText = (text) => {
    setValue(text);
    props.onChange(text);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.contentContainer}>
        <Image style={styles.iconSearch} source={searchIcon} />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={value}
          placeholder="Search"
          placeholderTextColor={colors.greyWhite}
        />
      </View>
    </View>
  );
}

SearchBar.defaultProps = {
  style: {},
  onChange: () => {},
};

SearchBar.propTypes = {
  style: ViewPropTypes.style,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.secondaryBackgroundColor,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.greyWhite,
    fontFamily: fonts.sfProTextRegular,
  },
  iconSearch: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
});
