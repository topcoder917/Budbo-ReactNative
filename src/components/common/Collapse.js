import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';

import fonts from 'config/fonts';
import colors from 'config/colors';

const triangleIcon = require('assets/icons/triangle_down.png');

export default function Collapse(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const [animatedValue] = useState(new Animated.Value(isOpen ? 1 : 0));

  const handleOpenContent = () => {
    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setContentHeight(height);
  };

  const animatedRotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });
  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <>
      <TouchableOpacity
        style={styles.headerContainer}
        activeOpacity={0.8}
        onPress={() => handleOpenContent()}>
        <Text style={styles.textTitle}>{props.title}</Text>
        <Animated.Image
          style={[styles.iconTriangle, {transform: [{rotate: animatedRotate}]}]}
          source={triangleIcon}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.childrenContent, {height: animatedHeight}]}>
        <View style={styles.childrenContentContainer} onLayout={handleLayout}>
          {props.children}
        </View>
      </Animated.View>
    </>
  );
}

Collapse.defaultProps = {
  isOpen: false,
};

Collapse.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    marginLeft: 16,
    marginRight: 22,
  },
  iconTriangle: {
    width: 12,
    height: 12,
  },
  childrenContent: {
    marginTop: 6,
    marginLeft: 16,
    overflow: 'hidden',
  },
  childrenContentContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
