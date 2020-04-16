import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    BackHandler,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'
import styles from '../style/style'
import image from '../img/image_login.png'

import {
    tokenControll,
    titleControll,
    companyControll,
    provinceControll,
    positionControll,
    userInfoControll
} from '../actions'

import {
    API_KEY,
    TOKEN_KEY,
    BASEURL,
    TITLE_URL,
    COMPANY_URL,
    PROVINCE_URL,
    POSITION_URL,
    LOGIN_URL
} from '../utils/contants'

import Helper from '../utils/Helper'
import StorageService from '../utils/StorageServies'

class SplashScreen extends React.Component {

    state = {
        loading: false
    }

    getProvince() {
        let that = this
        that.setState({ loading: true })
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }
        Helper.get(BASEURL + PROVINCE_URL, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.provinceControll(results.data)
                // that.setState({ loading: false })
            } else {
                that.setState({ loading: false })
                alert(`${results.message}`)
            }
        })
    }

    getCompany() {
        let that = this
        // that.setState({ loading: true })
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }
        Helper.get(BASEURL + COMPANY_URL, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.companyControll(results.data)
                // that.setState({ loading: false })
            } else {
                that.setState({ loading: false })
                alert(`${results.message}`)
            }
        })
    }

    getTitle() {
        let that = this
        // that.setState({ loading: true })
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }
        Helper.get(BASEURL + TITLE_URL, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.titleControll(results.data)
            } else {
                that.setState({ loading: false })
                alert(`${results.message}`)
            }
        })
    }

    getPosition() {
        let that = this
        // that.setState({ loading: true })
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }
        Helper.get(BASEURL + POSITION_URL, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.positionControll(results.data)
                that.setState({ loading: false })
            } else {
                that.setState({ loading: false })
                alert(`${results.message}`)
            }
        })
    }

    checkLogin() {
        let that = this
        const props = that.props
        try {
            StorageService.get(TOKEN_KEY).then(obj => {
                if (obj !== null) {
                    // props.tokenControll(obj)
                    that.onLogin(obj)
                    // props.navigation.replace('Main')
                } else {
                    props.navigation.replace('Login')
                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {

        }
    }

    onLogin(token) {
        let that = this
        const props = that.props
        let header = {
            'Authorization': token,
            'x-api-key': API_KEY
        }

        // props.indicatorControll(true)
        Helper.post(BASEURL + LOGIN_URL, '', header, (results) => {
            if (results.status == 'SUCCESS') {
                props.tokenControll('save', results.token)
                props.userInfoControll('save', results.data)
                StorageService.set(TOKEN_KEY, results.token)
                // props.indicatorControll(false)
                props.navigation.replace('Main')
            } else {
                // props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }

    handleBack = () => {
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        await this.getProvince()
        await this.getCompany()
        await this.getTitle()
        await this.getPosition()
        await this.checkLogin()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <View style={[styles.center, { flex: 1, backgroundColor: primaryColor }]}>
                <View style={{ position: 'absolute', top: 10, padding: 4 }}>
                    <Text style={[ styles.bold, { color: 'white', fontSize: 55 }]}>{`RECRUITMENT`}</Text>
                    <Text style={[{ color: 'white' }]}>{`Thiensurat Public Company Limited`}</Text>
                </View>
                <Image source={image} style={{ resizeMode: 'contain', width: 300, height: '50%', margin: 10 }} />
                {
                    this.state.loading ?
                        <View style={[styles.center, { position: 'absolute', bottom: 20 }]}>
                            <ActivityIndicator size='large' color={secondaryColor} />
                        </View>
                        :
                        null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    tokenControll,
    titleControll,
    companyControll,
    provinceControll,
    positionControll,
    userInfoControll
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)