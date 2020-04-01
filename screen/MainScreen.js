import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'
import styles from '../style/style'

import Register from './tabs/RegisterScreen'
import Profile from './tabs/ProfileScreen'
import List from './tabs/ListScreen'

const Tab = createMaterialBottomTabNavigator();
export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Register"
            inactiveColor={darkColor}
            activeColor={secondaryColor}
            barStyle={{ backgroundColor: primaryColor }}>
            <Tab.Screen
                name="Register"
                component={Register}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[ styles.bottomTab ]}>
                            <Icon name="user-plus" color={color} size={20} />
                            <Text style={[{ color: color, fontSize: 18 }]}>{`รับสมัคร`}</Text>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="List"
                component={List}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[ styles.bottomTab ]}>
                            <Icon name="list" color={color} size={20} />
                            <Text style={[{ color: color, fontSize: 18 }]}>{`รายชื่อ`}</Text>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[ styles.bottomTab ]}>
                            <Icon name="user" color={color} size={20} />
                            <Text style={[{ color: color, fontSize: 18 }]}>{`โปรไฟล์`}</Text>
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}