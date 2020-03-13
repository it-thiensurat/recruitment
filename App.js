/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  YellowBox,
  View,
  Text,
  StatusBar,
} from 'react-native';
console.disableYellowBox = true
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View>
          <Text>HELLO WORLD!</Text>
        </View>

      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)