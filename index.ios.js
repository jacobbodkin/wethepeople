import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './components/App';

export default class WeThePeople extends Component {
  render() {
    return (

        <App />

    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('WeThePeople', () => WeThePeople);
