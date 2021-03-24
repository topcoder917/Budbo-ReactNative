import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'config/colors';

export default function ProgressBar(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colors.firstGradientColor,
          colors.secondGradientColor,
          colors.thirdGradientColor,
        ]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.progressGradient, {width: `${props.value}%`}]}
      />
    </View>
  );
}

ProgressBar.defaultProps = {
  value: 0,
};

ProgressBar.propTypes = {
  value: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(173, 179, 191, 0.16)',
    borderRadius: 2.5,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 2.5,
  },
});
