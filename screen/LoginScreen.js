import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'
import styles from '../style/style'
import image from '../img/image_login.png'

class LoginScreen extends React.Component {

    render() {
        return (
            <View style={[styles.center, { flex: 1, backgroundColor: primaryColor }]}>
                <Image source={image} style={{ resizeMode: 'contain', width: 200, height: '25%', margin: 10 }} />
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="user" color={secondaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.username = input; }}
                        placeholder='Username'
                        keyboardType='email-address'
                        returnKeyType='next'
                        onBlur={false}
                        autoCapitalize={false}
                        onSubmitEditing={() => this.password.focus()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="lock" color={secondaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.password = input; }}
                        placeholder='Password'
                        keyboardType='email-address'
                        returnKeyType='done'
                        onBlur={false}
                        autoCapitalize={false}
                        onSubmitEditing={() => null} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)