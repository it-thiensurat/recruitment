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
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'

const Stack = createStackNavigator();

import Main from './screen/MainScreen'
import Login from './screen/LoginScreen'

function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <PaperProvider>
          <MyStack />
        </PaperProvider>
      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)