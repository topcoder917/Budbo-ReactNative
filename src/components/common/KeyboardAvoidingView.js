/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Platform,
  Animated,
  Keyboard,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import constants from 'config/constants';

const KeyboardAvoidingView = (props) => {
  const [animatedKeyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (Platform.OS === 'android') {
      // on only Android
      Keyboard.addListener('keyboardDidShow', keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', keyboardDidHide);
      return;
    }
    // on only ios
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      if (Platform.OS === 'android') {
        // on only Android
        Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        return;
      }
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (e) => {
    Animated.timing(animatedKeyboardHeight, {
      toValue: e.endCoordinates.height - constants.screenSafeAreaBottom,
      duration: (e && e.duration) || 250,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide = (e) => {
    Animated.timing(animatedKeyboardHeight, {
      toValue: 0,
      duration: (e && e.duration) || 250,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidShow = (e) => {};

  const keyboardDidHide = (e) => {};

  const {children, style, contentContainerStyle} = props;

  return (
    <Animated.ScrollView
      {...props}
      keyboardShouldPersistTaps="handled"
      style={[styles.container, style, {marginBottom: animatedKeyboardHeight}]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </Animated.ScrollView>
  );
};

KeyboardAvoidingView.defaultProps = {
  style: {},
  contentContainerStyle: {},
};

KeyboardAvoidingView.propTypes = {
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  children: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidingView;
