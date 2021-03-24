import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'config/colors';
import fonts from 'config/fonts';

const editIcon = require('assets/icons/edit.png');
export default function PaymentItem({
  style,
  item,
  isActive,
  isEditable,
  onPress,
  onEdit,
}) {
  const renderBackground = () => {
    if (!isActive) {
      return null;
    }

    return (
      <LinearGradient
        colors={[
          colors.firstGradientColor,
          colors.secondGradientColor,
          colors.thirdGradientColor,
        ]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[
          styles.grandientBackground,
          {
            width: style.width || styles.container.width,
            height: style.height || styles.container.height,
          },
        ]}
      />
    );
  };

  const renderEdit = () => {
    if (!isEditable) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={onEdit}>
        <Image style={styles.imageEdit} source={editIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      {renderBackground()}
      <View style={styles.leftContainer}>
        <Image style={styles.icon} source={item.icon} />
        <Text style={styles.textLabel}>**** {item.text}</Text>
      </View>
      {renderEdit()}
    </TouchableOpacity>
  );
}

PaymentItem.defaultProps = {
  style: {},
  isActive: false,
  isEditable: false,
  onPress: () => {},
  onEdit: () => {},
};

PaymentItem.propTypes = {
  style: ViewPropTypes.style,
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  onPress: PropTypes.func,
  onEdit: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 264,
    height: 70,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryBackgroundColor,
    marginRight: 16,
  },
  grandientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  editButton: {
    padding: 10,
    marginRight: 10,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  imageEdit: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain',
  },
  textLabel: {
    fontSize: 16,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    marginLeft: 19,
  },
});
