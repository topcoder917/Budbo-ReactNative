import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const paymentDollar = 'usd';
const paymentBubo = 'bubo';
const paymentBitcoin = 'btc';
const paymentEthereum = 'eth';
const paymentMatic = 'matic';

const paymentMethods = [
  {
    id: 1,
    kind: paymentBubo,
    text: 'BUBO',
    unit: '4873',
    icon: require('assets/icons/budbo_gold.png'),
  },
  {
    id: 2,
    kind: paymentBitcoin,
    text: 'BTC',
    unit: 'BTC',
    icon: require('assets/icons/bitcoin.png'),
  },
  {
    id: 3,
    kind: paymentEthereum,
    text: 'ETH',
    unit: 'ETH',
    icon: require('assets/icons/ethereum.png'),
  },  
  {
    id: 4,
    kind: paymentMatic,
    text: 'MATIC',
    unit: 'MATIC',
    icon: require('assets/icons/matic.png'),
  },
];

// Social
const facebookLink = 'http://facebook.com/budboapp';
const twitterLink = 'http://www.twitter.com/BudboApp';
const instagramLink = 'http://www.instargram.com/BudboApp';
const telegramLink = 'https://t.me/budboapp';
const youtubeLink = 'https://www.youtube.com/channel/UCtsuovP49wY3tEyAFDmGq9Q';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let screenSafeAreaTop = initialWindowMetrics.insets.top;
let screenSafeAreaBottom = initialWindowMetrics.insets.bottom;

const youtubeIcon = require('assets/icons/youtube.png');
const facebookIcon = require('assets/icons/facebook.png');
const twitterIcon = require('assets/icons/twitter.png');
const instagramIcon = require('assets/icons/instagram.png');
const telegramIcon = require('assets/icons/telegram.png');

export default {
  baseApiUrl: 'http://api.budbo.io/',
  // baseApiUrl: 'http://test-budbo-env.us-east-1.elasticbeanstalk.com/',
  googleMapApiKey: 'AIzaSyBfbxwRCgu7q3iQJXtgYyu_qlDqIjzIXsw',
  defaultPassword: '!QAZxsw2',

  screenWidth,
  screenHeight,

  screenSafeAreaTop,
  screenSafeAreaBottom,

  pinCodeCellCount: 6,
  pinCodeCellWidth: Math.round(screenWidth * 0.1),
  pinCodeCellHeight: Math.round(screenWidth * 0.115),

  // Social
  socialLinks: [
    {
      name: 'Youtube',
      link: youtubeLink,
      icon: youtubeIcon,
      subscribed: true
    },
    {
      name: 'Facebook',
      link: facebookLink,
      icon: facebookIcon,
      subscribed: true
    },
    {
      name: 'Twitter',
      link: twitterLink,
      icon: twitterIcon,
      subscribed: false
    },
    {
      name: 'Instagram',
      link: instagramLink,
      icon: instagramIcon,
      subscribed: false
    },
    {
      name: 'Telegram',
      link: telegramLink,
      icon: telegramIcon,
      subscribed: true
    }

  ],

  // Urls
  defaultAvatar: 'https://laravelbudbo.s3.amazonaws.com/images/avatar-user.png',
  maleAvatar: 'https://laravelbudbo.s3.amazonaws.com/images/male.png',
  femaleAvatar: 'https://laravelbudbo.s3.amazonaws.com/images/female.png',
  defaultChart: 'https://laravelbudbo.s3.amazonaws.com/images/chart.png',

  // AsyncStorage
  currentUser: 'budbo_auth',
  currentAddress: 'budbo_current_address',
  featuredRetailers: 'budbo_featured_retailers',
  allRetailers: 'budbo_retailers',
  nearby: 'budbo_nearby',

  // Payment Method Types
  paymentDollar,
  paymentBubo,
  paymentBitcoin,
  paymentMethods,

  paymentCurrencyUnit: {
    [paymentDollar]: '$',
    [paymentBubo]: 'BUBO',
    [paymentBitcoin]: 'Bitcoin',
  },

  // Order Status
  orderPending: 1,
  orderApproved: 2,
  orderBeingDelivered: 3,
  orderDelivered: 4,

  productVolumns: ['each', '1g', '1/4oz', '1/8oz'],
};
