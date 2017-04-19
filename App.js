import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider, observer } from 'mobx-react/native';
import store from './Store';
import RootNavigator from './navigations';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
