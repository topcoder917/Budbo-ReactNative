/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

import HeaderBar from 'components/common/HeaderBar';
import MatchTabView from 'components/match/MatchTabView';
import LoadingIndicator from 'components/common/LoadingIndicator';

export default function MatchResults(props) {
  const navigation = props.navigation;
  const attributes = props.route.params.attributes;

  const [isFetching, setIsFetching] = React.useState(false);
  const [tabViewLabels, setTabViewLabels] = React.useState([]);
  const [tabViewContent, setTabViewContent] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMatchResult();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchMatchResult = () => {
    // console.log('attributes: ', attributes);
    setIsFetching(true);
    setProducts([]);
    setTabViewLabels([]);
    setTabViewContent([]);

    fetch(constants.baseApiUrl + 'api/match_result', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({attr: attributes}),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFetching(false);
        setProducts(data);
        let labels = [];
        let content = [];
        // Flower
        const flowerData = data.filter((item) => item.category === 0);
        if (flowerData.length > 0) {
          labels.push('Flower');
          content.push(flowerData);
        }
        // Concentrates
        const concentrateData = data.filter((item) => item.category === 2);
        if (concentrateData.length > 0) {
          labels.push('Concentrates');
          content.push(concentrateData);
        }
        // Edibles
        const edibleData = data.filter((item) => item.category === 1);
        if (edibleData.length > 0) {
          labels.push('Edibles');
          content.push(edibleData);
        }
        // Deals
        const dealData = data.filter((item) => item.category === 3);
        if (dealData.length > 0) {
          labels.push('Deals');
          content.push(dealData);
        }
        setTabViewLabels(labels);
        setTabViewContent(content);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator isLoading={isFetching} />
      <HeaderBar leftButton="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.textTitle}>Match Results</Text>
      {tabViewContent.length > 0 && (
        <MatchTabView
          navigation={navigation}
          labels={tabViewLabels}
          content={tabViewContent}
          products={products}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 12,
  },
  textTitle: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginTop: 19,
    paddingLeft: 48,
  },
});
