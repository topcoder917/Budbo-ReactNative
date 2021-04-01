import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from './redux/store';
import Routes from './screens/navigation/Routes';

// LogBox.ignoreLogs([]);
LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    Ionicons.loadFont();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
//export default codePush(App);
