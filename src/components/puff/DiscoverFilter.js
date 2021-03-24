import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImagePropTypes,
} from 'react-native';

import colors from 'config/colors';

import {connect} from 'react-redux';
import {setFilter} from 'budboRedux/actions/discoverActions';

function DiscoverFilter(props) {
  const [allFlag, setAllFlag] = React.useState(props.filter[0]);
  const [flowerFlag, setFlowerFlag] = React.useState(props.filter[1]);
  const [edibleFlag, setEdibleFlag] = React.useState(props.filter[2]);
  const [concentrateFlag, setConcentrateFlag] = React.useState(props.filter[3]);
  const [dealFlag, setDealFlag] = React.useState(props.filter[4]);

  return (
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity
        style={allFlag ? styles.selectedTextItem : styles.textItem}
        onPress={() => {
          setAllFlag(!allFlag);
          if (!allFlag) {
            setFlowerFlag(false);
            setEdibleFlag(false);
            setConcentrateFlag(false);
            setDealFlag(false);
            props.setFilter([true, false, false, false, false]);
          } else {
            props.setFilter([
              !allFlag,
              flowerFlag,
              edibleFlag,
              concentrateFlag,
              dealFlag,
            ]);
          }
        }}>
        <Text style={styles.text}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flowerFlag ? styles.selectedTextItem : styles.textItem}
        onPress={() => {
          setFlowerFlag(!flowerFlag);
          props.setFilter([
            allFlag,
            !flowerFlag,
            edibleFlag,
            concentrateFlag,
            dealFlag,
          ]);
          if (!flowerFlag) {
            setAllFlag(false);
            props.setFilter([
              false,
              !flowerFlag,
              edibleFlag,
              concentrateFlag,
              dealFlag,
            ]);
          }
          if (!flowerFlag && edibleFlag && concentrateFlag && dealFlag) {
            setFlowerFlag(false);
            setEdibleFlag(false);
            setConcentrateFlag(false);
            setDealFlag(false);
            setAllFlag(true);
            props.setFilter([true, false, false, false, false]);
          }
        }}>
        <Text style={styles.text}>Flowers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={edibleFlag ? styles.selectedTextItem : styles.textItem}
        onPress={() => {
          setEdibleFlag(!edibleFlag);
          props.setFilter([
            allFlag,
            flowerFlag,
            !edibleFlag,
            concentrateFlag,
            dealFlag,
          ]);
          if (!edibleFlag) {
            setAllFlag(false);
            props.setFilter([
              false,
              flowerFlag,
              !edibleFlag,
              concentrateFlag,
              dealFlag,
            ]);
          }
          if (flowerFlag && !edibleFlag && concentrateFlag && dealFlag) {
            setFlowerFlag(false);
            setEdibleFlag(false);
            setConcentrateFlag(false);
            setDealFlag(false);
            setAllFlag(true);
            props.setFilter([true, false, false, false, false]);
          }
        }}>
        <Text style={styles.text}>Edibles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={concentrateFlag ? styles.selectedTextItem : styles.textItem}
        onPress={() => {
          setConcentrateFlag(!concentrateFlag);
          props.setFilter([
            allFlag,
            flowerFlag,
            edibleFlag,
            !concentrateFlag,
            dealFlag,
          ]);
          if (!concentrateFlag) {
            setAllFlag(false);
            props.setFilter([
              false,
              flowerFlag,
              edibleFlag,
              !concentrateFlag,
              dealFlag,
            ]);
          }
          if (flowerFlag && edibleFlag && !concentrateFlag && dealFlag) {
            setFlowerFlag(false);
            setEdibleFlag(false);
            setConcentrateFlag(false);
            setDealFlag(false);
            setAllFlag(true);
            props.setFilter([true, false, false, false, false]);
          }
        }}>
        <Text style={styles.text}>Concentrates</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={dealFlag ? styles.selectedTextItem : styles.textItem}
        onPress={() => {
          setDealFlag(!dealFlag);
          props.setFilter([
            allFlag,
            flowerFlag,
            edibleFlag,
            concentrateFlag,
            !dealFlag,
          ]);
          if (!dealFlag) {
            setAllFlag(false);
            props.setFilter([
              false,
              flowerFlag,
              edibleFlag,
              concentrateFlag,
              !dealFlag,
            ]);
          }
          if (flowerFlag && edibleFlag && concentrateFlag && !dealFlag) {
            setFlowerFlag(false);
            setEdibleFlag(false);
            setConcentrateFlag(false);
            setDealFlag(false);
            setAllFlag(true);
            props.setFilter([true, false, false, false, false]);
          }
        }}>
        <Text style={styles.text}>Deals</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  filter: state.discover.filter,
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverFilter);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: colors.primary,
  },
  textItem: {
    backgroundColor: colors.headerTitleBack,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
  },
  selectedTextItem: {
    backgroundColor: colors.headerTitleBack,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
