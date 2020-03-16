import React from 'react'
import {
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import Register from './tabs/RegisterScreen'
import Profile from './tabs/ProfileScreen'
import List from './tabs/ListScreen'

const Tab = createMaterialBottomTabNavigator();
export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Register"
            inactiveColor={lightColor}
            activeColor={secondaryColor}
            barStyle={{ backgroundColor: primaryColor }}>
            <Tab.Screen
                name="Register"
                component={Register}
                options={{
                    tabBarLabel: 'รับสมัคร',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-plus" color={color} size={20} />
                    ),
                }} />
            <Tab.Screen
                name="List"
                component={Profile}
                options={{
                    tabBarLabel: 'รายชื่อ',
                    tabBarIcon: ({ color }) => (
                        <Icon name="list" color={color} size={20} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'โปรไฟล์',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={20} />
                    ),
                }} />
        </Tab.Navigator>
    )
}