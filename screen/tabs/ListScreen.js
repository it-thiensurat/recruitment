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
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    TOKEN_KEY,
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    tertiary
} from '../../utils/contants'

import StorageService from '../../utils/StorageServies'
import styles from '../../style/style'

class ListScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`รายชื่อ`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>

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
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, marginBottom: 15 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={[styles.bold, { fontSize: 18 }]}>{`ชื่อ - นามสกุล`}</Text>
                                    <Text style={[{ fontSize: 16, textAlignVertical: 'bottom' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={[styles.bold, { fontSize: 18 }]}>{`วันที่รับสมัคร`}</Text>
                                    <Text style={[{ fontSize: 16, textAlignVertical: 'bottom' }]}>{``}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={[styles.bold, { fontSize: 18 }]}>{`สถานที่ที่รับสมัคร`}</Text>
                                    <Text style={[{ fontSize: 16, textAlignVertical: 'bottom' }]}>{``}</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={[styles.bold, { fontSize: 18 }]}>{`วันที่บรรจุเป็นพนักงาน`}</Text>
                                    <Text style={[{ fontSize: 16, textAlignVertical: 'bottom' }]}>{``}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)