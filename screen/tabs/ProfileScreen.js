import React from 'react'
import {
    View,
    Text,
    Platform,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import ParallaxScrollView from "react-native-parallax-scroll-view"
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    tertiary,
    API_KEY,
    TOKEN_KEY
} from '../../utils/contants'

import StorageService from '../../utils/StorageServies'
import styles from '../../style/style'

class ProfileScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`โปรไฟล์`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>
                {/* <TouchableOpacity
                    onPress={
                        async () => {
                            await StorageService.clear()
                            await this.props.navigation.replace('Login')
                        }
                    }>
                    <Icon name="power-off" color={lightColor} size={24} />
                </TouchableOpacity> */}
            </View>
        );
    }

    handleBack = () => {
        return true
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer

        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: darkColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                {/* <ParallaxScrollView
                    backgroundColor="#C39BD3"
                    parallaxHeaderHeight={200}
                    renderForeground={() => (
                        <View style={{ height: 180, flex: 1, alignItems: "center", justifyContent: "center", padding: 10 }} >
                            <View style={{ padding: 4 }}>
                                <TouchableOpacity style={[styles.shadow, { backgroundColor: "transparent", width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }]}
                                    onPress={() => {

                                    }} >
                                    <Icon name={'user'} size={75} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                >

                </ParallaxScrollView> */}
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center", backgroundColor: primaryColor }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: 'white' }]} />
                    </View>
                    {/* <View style={[styles.imageContainer, { borderColor: primaryColor }]}>
                        <Icon name="user" color={secondaryColor} size={60} />
                    </View> */}
                    <View style={{ padding: 4 }}>
                        <TouchableOpacity style={[styles.shadow, { backgroundColor: tertiary, width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }]}
                            onPress={() => {

                            }} >
                            <Icon name={'user'} size={75} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 0.5 }}>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: primaryColor, marginBottom: 15 }}>
                            <Text style={[styles.bold, { fontSize: 24 }]}>{`ชื่อ - นามสกุล`}</Text>
                            <Text style={[{ fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                        </View>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: primaryColor, marginBottom: 15 }}>
                            <Text style={[styles.bold, { fontSize: 24 }]}>{`ตำแหน่ง`}</Text>
                            <Text style={[{ fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.position}`}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <View style={styles.marginBetweenVertical}></View>
                    <TouchableOpacity style={[styles.secondaryButton, styles.center]}
                        onPress={
                            async () => {
                                await StorageService.clear()
                                await this.props.navigation.replace('Login')
                            }
                        } >
                        <Text style={[{ color: secondaryColor, fontSize: 26 }, styles.bold]}>{`ออกจากระบบ`}</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)