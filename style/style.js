import { 
    Platform, 
    StyleSheet,
    Dimensions 
} from 'react-native'
import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

const COMPONENT_HIGHT = 50;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    inputWithIcon: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        backgroundColor: 'white',
        width: DEVICE_WIDTH - 40,
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputContainer: {
        width: DEVICE_WIDTH - 80,
        height: COMPONENT_HIGHT - 5,
        backgroundColor: 'transparent',
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginBetweenVertical: {
        height: 10
    }
})

export default styles;