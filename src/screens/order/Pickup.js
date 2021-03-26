/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TextInput,
} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {formatPrecision, showError} from 'config/utils';

import GradientButton from 'components/common/GradientButton';
import CheckItem from 'components/order/CheckItem';
import AddressItem from 'components/order/AddressItem';
import RoundedButton from 'components/common/RoundedButton';
import LoadingIndicator from 'components/common/LoadingIndicator';
import PaymentItem from 'components/common/PaymentItem';
import LinearGradient from 'react-native-linear-gradient';

import {removeAllProduct} from 'budboRedux/actions/cartActions';
import SegmentControl from 'react-native-animated-segment-control';

const purchaseLoadingLottie = require('assets/lottie/purchase.json');
const cardImage = require('assets/imgs/order/card.png');
const editIcon = require('assets/icons/edit.png');

const testAddressImage = require('assets/imgs/home/all_greens_dispensary.png');

function Pickup(props) {
  const navigation = props.navigation;
  const [orderDialog, setOrderDialog] = React.useState(false);
  const [cardDialog, setCardDialog] = React.useState(false);
  const [addressDialog, setAddressDialog] = React.useState(false);
  const [addressData, setAddressData] = React.useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(null);
  const [addressHeader, setAddressHeader] = React.useState('Delivery Address');
  const [pickButtonTitle, setPickButtonTitle] = React.useState(
    'In-store pick up',
  );
  const [pick, setPick] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState(null);
  const [inputAddress, setInputAddress] = React.useState('');
  const [inputCity, setInputCity] = React.useState('');
  const [inputState, setInputState] = React.useState('');
  const [inputZip, setInputZip] = React.useState('');
  const [inputCountry, setInputCountry] = React.useState('');
  const [customStyleIndex, setCustomStyleIndex] = React.useState(0);
  const [counts, setCounts] = React.useState(
    props.cartProducts.map((item) => {
      return {id: item.id, count: item.quantity};
    }),
  );
  const [showLoading, setShowLoading] = React.useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = React.useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = React.useState(
    constants.paymentDollar,
  );
  const [currentPaymentItem, setCurrentPaymentItem] = React.useState(
    constants.paymentMethods[0],
  );
  const [orderSubTotal, setOrderSubTotal] = React.useState({});


  React.useEffect(() => {
    console.log("pickup--------------");
    AsyncStorage.getItem(constants.currentAddress)
      .then((value) => {
        if (value) {
          const currentAddress = JSON.parse(value);
          const address = {
            address: currentAddress.address,
            city: currentAddress.city,
            state: currentAddress.state,
            postal: currentAddress.postal,
            country: currentAddress.country,
            checked: true,
          };
          addressData.push(address);
          setSelectedAddressIndex(0);
          setDeliveryAddress(address);
          setAddressData(addressData);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetchSubTotal();
  }, []);

  const renderCheckItem = ({item, index}) => {
    const data = {
      id: item.id,
      index: index,
      name: item.name,
      category: item.category,
      image: {uri: item.image},
      volumn: constants.productVolumns[item.priceIndex],
      price: item.prices[item.priceIndex],
      quantity: item.quantity,
    };
    return (
      <CheckItem
        item={data}
        onPress={() => {
          // setSelectedId(item.id)
          // navigation.navigate('ProductInfo');
        }}
        onChangeCount={(value) => handleCount(item.id, value)}
      />
    );
  };

  const renderAddressItem = ({item, index}) => {
    return (
      <AddressItem
        item={item}
        handleChecked={() => {
          changeChecked(index);
        }}
      />
    );
  };

  const renderPaymentItem = ({item, index}) => {
    return (
      <PaymentItem
        item={item}
        isActive={item.kind === currentPaymentItem.kind}
        isEditable={true}
        onPress={() => {
          setCurrentPaymentMethod(item.kind);
          setCurrentPaymentItem(item);
        }}
        onEdit={() => setCardDialog(true)}
      />
    );
  };

  const handleCount = (id, value) => {
    let newCounts = [...counts];

    newCounts.forEach((item) => {
      if (item.id === id) {
        item.count = value;
      }
    });
    setCounts(newCounts);
  };

  const addAddress = () => {
    let address = {
      address: inputAddress,
      city: inputCity,
      state: inputState,
      postal: inputZip,
      country: inputCountry,
      checked: addressData.length > 0 ? false : true,
    };

    addressData.push(address);
    if (addressData.length === 1) {
      setSelectedAddressIndex(0);
      setDeliveryAddress(address);
    }

    setAddressData(addressData);
    setAddressDialog(false);
  };

  const changeChecked = (index) => {
    let newAddressData = addressData.map((item, i) => {
      if (i === index) {
        return {
          address: item.address,
          city: item.city,
          state: item.state,
          postal: item.postal,
          country: item.country,
          checked: true,
        };
      } else {
        return {
          address: item.address,
          city: item.city,
          state: item.state,
          postal: item.postal,
          country: item.country,
          checked: false,
        };
      }
    });
    setAddressData(newAddressData);
    setSelectedAddressIndex(index);
    setDeliveryAddress(newAddressData[index]);
  };

  const handlePickUp = () => {
    if (selectedAddressIndex || selectedAddressIndex === 0) {
      let newAddressData = addressData.filter((item, index) => {
        return index !== selectedAddressIndex;
      });
      // setDeliveryAddress(addressData[selectedAddressIndex]);
      setAddressData(newAddressData);
      setSelectedAddressIndex(null);
      setAddressHeader('In-store pick up');
      setPickButtonTitle('Deliver');
      setPick(true);
    } else {
      showError('Please select Address.');
    }
  };

  const handleShowOrder = () => {
    if (!deliveryAddress) {
      showError('Please set Delivery Address.');
      return;
    } else if (!props.cartProducts || props.cartProducts.length === 0) {
      showError('Please add products.');
      return;
    }
    setOrderDialog(true);
  };

  const fetchSubTotal = () => {
    if (!props.cartProducts || props.cartProducts.length === 0) {
      return;
    }

    const products = [];
    props.cartProducts.map((product) => {
      const countItem = counts.find((item) => item.id === product.id);

      products.push({
        product_connection_id: product.connection_id,
        unit_selected: product.priceIndex,
        quantity: countItem.count,
      });
    });

    const paymentMethod = constants.paymentMethods.find(
      (item) => item.kind === currentPaymentMethod,
    );

    const body = {
      user_id: props.user && props.user.id,
      order_type: 1, // (PICKUP = 1, DELIVERY = 2)
      payment_method: paymentMethod && paymentMethod.id,
      products,
    };

    setShowLoading(true);
    fetch(constants.baseApiUrl + 'api/order/subtotal', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response: ', JSON.stringify(response));
        setShowLoading(false);
        setOrderSubTotal(
          response.orders && response.orders.length > 0 && response.orders[0],
        );
      })
      .catch((error) => {
        console.log(error);
        setShowLoading(false);
      });
  };

  const handlePlaceOrder = () => {
    if (!props.cartProducts || props.cartProducts.length === 0) {
      return;
    }

    const products = [];
    props.cartProducts.map((product) => {
      const countItem = counts.find((item) => item.id === product.id);

      products.push({
        product_connection_id: product.connection_id,
        unit_selected: product.priceIndex,
        quantity: countItem.count,
      });
    });

    const paymentMethod = constants.paymentMethods.find(
      (item) => item.kind === currentPaymentMethod,
    );

    const body = {
      user_id: props.user && props.user.id,
      order_type: 1, // (PICKUP = 1, DELIVERY = 2)
      payment_method: paymentMethod && paymentMethod.id,
      products,
      delivery_address: deliveryAddress,
    };

    // console.log('body: ', JSON.stringify(body));

    setOrderDialog(false);
    setIsPurchaseLoading(true);

    fetch(constants.baseApiUrl + 'api/order/checkout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response: ', JSON.stringify(data));
        setTimeout(() => {
          setIsPurchaseLoading(false);

          navigation.navigate('Order', {
            currentOrders: (data.orders && data.orders) || [],
            address: deliveryAddress,
            pick: pick,
          });

          if (props.removeAllProduct) {
            props.removeAllProduct();
          }
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsPurchaseLoading(false);
      });
  };

  const renderDeliveryAddress = () => (
    <>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeaderContainer}>
          <TouchableOpacity
            style={styles.addNewButton}
            activeOpacity={0.8}
            onPress={() => setAddressDialog(true)}>
            <Text style={styles.textAddNew}>Add New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressItemContainer}>
          <View style={styles.firstColumn}>
            <Image style={styles.addressImage} source={testAddressImage} />
            <View style={styles.addressInfoContainer}>
              <Text style={styles.address}>Time: 30 Min</Text>
              <Text style={styles.city}>To: 604 Brazos St</Text>
            </View>
          </View>
          <View style={styles.secondColumn}>
            <TouchableOpacity>
              <Image
                style={{width: 16, height: 16, marginBottom: 10}}
                source={require('assets/icons/check.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{width: 18, height: 18}}
                source={require('assets/icons/edit.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <FlatList
        style={styles.addressContainer}
        contentContainerStyle={styles.addressContentContainer}
        showsHorizontalScrollIndicator={false}
        data={addressData}
        horizontal={true}
        renderItem={renderAddressItem}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </>
  );

  const renderPaymentMethod = () => (
    <>
      <View style={styles.paymentHeaderContainer}>
        <Text style={styles.textSectionTitle}>Payment Method</Text>
        <TouchableOpacity style={styles.addNewButton} activeOpacity={0.8}>
          <Text style={styles.textAddNew}>Add New</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.paymentMethodContainer}
        contentContainerStyle={styles.paymentMethodContentContainer}
        showsHorizontalScrollIndicator={false}
        data={constants.paymentMethods}
        horizontal={true}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.seletedPaymentContainer}>
        <LinearGradient
          colors={[
            colors.firstGradientColor,
            colors.secondGradientColor,
            colors.thirdGradientColor,
          ]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.paymentGradient}>
          <View style={styles.firstGradientColumn}>
            <Image
              style={styles.paymentItemIcon}
              source={currentPaymentItem.icon}
            />
            <Text style={styles.textSelectedPayment}>
              **** {currentPaymentItem.unit}
            </Text>
          </View>
          <View style={styles.secondGradientColumn}>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.8}
              onEdit={() => setCardDialog(true)}>
              <Image style={styles.imageEdit} source={editIcon} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderCharges = () => {
    if (!orderSubTotal.totals) {
      return null;
    }
    const basketCharge = orderSubTotal.totals[currentPaymentMethod];

    const deliveryDollar = 6.2858; // TODO: remove later
    const rate =
      orderSubTotal.totals[currentPaymentMethod] /
      orderSubTotal.totals[constants.paymentDollar];
    const deliveryCharge = deliveryDollar * rate;

    const total = basketCharge + deliveryCharge;

    const unit = constants.paymentCurrencyUnit[currentPaymentMethod];
    return (
      <>
        <View style={styles.chargeItem}>
          <Text style={styles.textAddNew}>Basket Charges</Text>
          <Text style={styles.textValue}>
            {`${unit} ${formatPrecision(basketCharge)}`}
          </Text>
        </View>
        <View style={styles.chargeItem}>
          <Text style={styles.textAddNew}>Delivery Charges</Text>
          <Text style={styles.textValue}>
            {`${unit} ${formatPrecision(deliveryCharge)}`}
          </Text>
        </View>
        <View style={[styles.chargeItem, styles.totalItem]}>
          <Text style={styles.textTotalName}>Total Amount</Text>
          <Text style={styles.textTotalValue}>
            {`${unit} ${formatPrecision(total)}`}
          </Text>
        </View>
      </>
    );
  };

  const renderConfirmOrderDialog = () => (
    <Dialog
      onTouchOutside={() => {
        setOrderDialog(false);
      }}
      width={0.9}
      dialogStyle={styles.dialogContainer}
      visible={orderDialog}
      dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
      actionsBordered>
      {!!deliveryAddress && (
        <DialogContent style={styles.orderDialogContent}>
          <Text style={styles.textOrderTitle}>
            Confirm your order and delivery to:
          </Text>
          <Text style={styles.textOrderAddress1}>
            {deliveryAddress.address}
          </Text>
          <Text style={styles.textOrderAddress2}>
            {deliveryAddress.city}, {deliveryAddress.state}{' '}
            {deliveryAddress.postal}
          </Text>
          <GradientButton
            style={styles.orderDialogButtonContainer}
            textStyle={styles.textButton}
            title="Place Order"
            onPress={handlePlaceOrder}
          />
          <RoundedButton
            style={styles.changeOrderButton}
            textStyle={styles.textChangeOrder}
            title="Change Order"
            onPress={() => setOrderDialog(false)}
          />
        </DialogContent>
      )}
    </Dialog>
  );

  const renderNewAddressDialog = () => (
    <Dialog
      onTouchOutside={() => {
        setAddressDialog(false);
      }}
      width={0.9}
      dialogStyle={styles.dialogContainer}
      visible={addressDialog}
      dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
      actionsBordered>
      <DialogContent style={styles.orderDialogContent}>
        <TextInput
          autoFocus={true}
          placeholder="Address"
          placeholderTextColor={colors.darkGray}
          style={styles.textInputAddress}
          onChangeText={setInputAddress}
        />
        <TextInput
          placeholder="City"
          placeholderTextColor={colors.darkGray}
          style={styles.textInputAddress}
          onChangeText={setInputCity}
        />
        <View style={styles.addressRowContainer}>
          <TextInput
            placeholder="State"
            placeholderTextColor={colors.darkGray}
            style={[styles.textInputAddress, styles.addressLeft]}
            onChangeText={setInputState}
          />
          <TextInput
            placeholder="Zip"
            keyboardType="numeric"
            placeholderTextColor={colors.darkGray}
            style={[styles.textInputAddress, styles.addressRight]}
            onChangeText={setInputZip}
          />
        </View>
        <TextInput
          placeholder="Country"
          placeholderTextColor={colors.darkGray}
          style={styles.textInputAddress}
          onChangeText={setInputCountry}
        />
        <GradientButton
          style={styles.addressDialogButtonContainer}
          textStyle={styles.textButton}
          title="Add Delivery Address"
          fontSize={16}
          onPress={addAddress}
        />
      </DialogContent>
    </Dialog>
  );

  const renderNewPaymentDialog = () => (
    <Dialog
      onTouchOutside={() => {
        setCardDialog(false);
      }}
      rounded={true}
      style={styles.cardDialog}
      visible={cardDialog}
      dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
      actionsBordered>
      <DialogContent style={styles.cardDialogContent}>
        <ImageBackground
          style={styles.cardDialogBackground}
          resizeMode="cover"
          source={cardImage}>
          <View style={styles.cardRowContainer}>
            <View>
              <Text style={styles.textCardFieldName}>Ethereum Wallet</Text>
              <Text style={styles.textCardFieldValue}>Ab98340lxjad873HCdx</Text>
            </View>
            <View>
              <Text style={styles.textCardFieldName}>BALANCE</Text>
              <Text style={styles.textCardFieldValue}>9246.803</Text>
              <Text style={styles.textBudbo}>Budbo Tokens(BUBO)</Text>
            </View>
          </View>
        </ImageBackground>
      </DialogContent>
    </Dialog>
  );

  const renderPurchaseProcessingDialog = () => (
    <Dialog
      rounded={true}
      dialogStyle={styles.purchaseDialogContainer}
      visible={isPurchaseLoading}
      dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
      <DialogContent style={styles.purchasedDialogContent}>
        <LottieView
          style={styles.lottieContainer}
          source={purchaseLoadingLottie}
          autoPlay
          loop={true}
        />
        <Text style={styles.textPurchaseLoading}>Your order is processing</Text>
      </DialogContent>
    </Dialog>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LoadingIndicator isLoading={showLoading} />
      <ScrollView style={styles.scrollContainer}>
        {renderDeliveryAddress()}
        {renderPaymentMethod()}
        {renderCharges()}
        <View style={styles.placeOrderButtonContainer}>
          <GradientButton
            title="Pay & Confirm"
            onPress={() => handleShowOrder()}
          />
        </View>
      </ScrollView>
      {renderConfirmOrderDialog()}
      {renderNewAddressDialog()}
      {renderNewPaymentDialog()}
      {renderPurchaseProcessingDialog()}
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  removeAllProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 12,
  },
  segmentContainer: {
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
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  productsContainer: {
    paddingHorizontal: 16,
    marginTop: 17,
  },
  textSectionTitle: {
    fontSize: 17,
    fontFamily: fonts.sfProTextLight,
    color: colors.soft,
    paddingHorizontal: 8,
  },
  addressHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  addNewButton: {
    paddingHorizontal: 8,
  },
  textAddNew: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },

  addressContentContainer: {
    paddingLeft: 16,
  },
  paymentHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 32,
  },
  paymentMethodContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  paymentMethodContentContainer: {
    paddingHorizontal: 16,
  },

  chargeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  textValue: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  totalItem: {
    marginTop: 12,
  },
  textTotalName: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textTotalValue: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.primary,
  },
  placeOrderButtonContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 10
  },
  dialogContainer: {
    borderRadius: 24,
  },
  orderDialogContent: {
    borderRadius: 24,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 29,
    paddingBottom: 33,
    paddingLeft: 32,
    paddingRight: 32,
  },
  textOrderTitle: {
    fontFamily: fonts.sfProDisplayBold,
    fontSize: 20,
    color: colors.soft,
    paddingLeft: 24,
  },
  textOrderAddress1: {
    fontFamily: fonts.sfProTextRegular,
    fontSize: 16,
    color: colors.primary,
    paddingLeft: 24,
    marginTop: 8,
  },
  textOrderAddress2: {
    fontFamily: fonts.sfProTextRegular,
    fontSize: 16,
    color: colors.greyWhite,
    paddingLeft: 24,
  },
  orderDialogButtonContainer: {
    marginTop: 16,
  },
  textButton: {
    fontSize: 16,
  },
  cardDialogContent: {
    width: 343,
    height: 211,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  textInputAddress: {
    textAlign: 'left',
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
    color: colors.soft,
    fontSize: 18,
    fontFamily: fonts.sfProTextMedium,
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  addressRowContainer: {
    flexDirection: 'row',
  },
  addressLeft: {
    flex: 1,
  },
  addressRight: {
    flex: 1,
    marginLeft: 20,
  },
  addressDialogButtonContainer: {
    marginTop: 20,
  },
  cardDialogBackground: {
    flex: 1,
    paddingTop: 141,
    paddingLeft: 22,
    paddingRight: 15,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCardFieldName: {
    fontSize: 10,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
  },
  textCardFieldValue: {
    fontSize: 14,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    marginTop: 5,
  },
  textBudbo: {
    fontSize: 7,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
  },
  purchaseDialogContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  purchasedDialogContent: {
    width: constants.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieContainer: {
    width: constants.screenWidth,
  },
  textPurchaseLoading: {
    fontSize: 18,
    fontFamily: fonts.andaleMono,
    color: colors.white,
  },
  deliveryAddressButton: {
    width: 120,
  },
  textDeliveryAddress: {
    fontSize: 10,
  },
  changeOrderButton: {
    height: 56,
    borderRadius: 28,
  },
  textChangeOrder: {
    fontSize: 16,
  },
  tabsContainerStyle: {
    height: 50,
    backgroundColor: 'transparent',
  },

  activeSegmentStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  segmentContainerStyle: {
    padding: 0,
    backgroundColor: 'transparent',
    height: 50,
  },
  segmentControlStyle: {
    backgroundColor: 'transparent',
  },
  selectedTextStyle: {
    color: colors.lightPurple,
    fontSize: 16,
  },
  unSelectedTextStyle: {
    color: colors.soft,
    fontSize: 16,
  },
  addressContainer: {
    paddingHorizontal: 16,
  },
  addressItemContainer: {
    marginTop: 14,
    width: '100%',
    height: 100,
    backgroundColor: colors.itemBackgroundColor,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondColumn: {},
  addressImage: {
    width: 64,
    height: 64,
  },
  addressInfoContainer: {
    paddingHorizontal: 16,
  },
  address: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
    marginBottom: 10,
  },
  city: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  seletedPaymentContainer: {
    padding: 24,
    height: 108,
  },
  firstGradientColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentGradient: {
    width: '100%',
    height: 60,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  paymentItemIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  textSelectedPayment: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.sfProTextLight,
    color: colors.soft,
    letterSpacing: 3,
  },
  imageEdit: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },

});
