import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Picker } from "native-base"
import ImagePicker from 'react-native-image-crop-picker'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'
import styles from '../../style/style'
import { TouchableOpacity } from 'react-native-gesture-handler'

class RegisterScreen extends React.Component {

    state = {
        name: '',
        lastname: '',
        gender: '',
        cardId: '',
        phone: '',
        channel: -1,
        channelDetail: '',
        position: '',
        ImageSource: '',
        ImageSourceBase64: ''
    }

    onSelectGender(index, value) {
        this.setState({ gender: value })
    }

    onSelectChannel(index, value) {
        this.setState({ channel: value })
    }

    onTakePicture() {
        ImagePicker.openCamera({
            multiple: false,
            includeBase64: true
        }).then(images => {
            console.log(images);
            this.setState({
                ImageSource: images.path,
                ImageSourceBase64: images.data
            });
        });
    }

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`รับสมัคร`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>

            </View>
        );
    }

    render() {
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
                <ScrollView keyboardShouldPersistTaps={'never'}>
                    <View style={[{ flex: 1, padding: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`ชื่อ (ภาษาไทย)`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.name = input; }}
                            placeholder=''
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.lastname.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`นามสกุล (ภาษาไทย)`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.lastname = input; }}
                            placeholder=''
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.cardId.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`เพศ`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <RadioGroup
                            size={30}
                            thickness={2}
                            color={secondaryColor}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
                            highlightColor='transparent'
                            onSelect={(index, value) => this.onSelectGender(index, value)} >
                            <RadioButton
                                value='M'
                                color={secondaryColor}  >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`ชาย`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='F'
                                color={secondaryColor} >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`หญิง`}</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`เลขบัตรประชาชน`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.cardId = input; }}
                            placeholder=''
                            keyboardType='number-pad'
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.phone.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`เบอร์โทรศัพท์`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.phone = input; }}
                            placeholder=''
                            keyboardType='number-pad'
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.channelDetail.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`ช่องทางที่รับสมัคร`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <RadioGroup
                            size={30}
                            thickness={2}
                            color={secondaryColor}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            highlightColor='transparent'
                            onSelect={(index, value) => this.onSelectChannel(index, value)} >
                            <RadioButton
                                value='0'
                                color={secondaryColor}  >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`Facebook`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='1'
                                color={secondaryColor} >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`Youtube`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='2'
                                color={secondaryColor} >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`ตั้งบูท`}</Text>
                            </RadioButton>
                        </RadioGroup>
                        {
                            this.state.channel == -1 || this.state.channel == 2 ?
                                null
                                :
                                <TextInput style={[styles.input, styles.shadow]}
                                    ref={(input) => { this.channelDetail = input; }}
                                    placeholder='ระบุลิ้งค์เฟซบุ๊ค, ลิ้งค์ยูทูบ หรือชื่อตลาดที่ออกบูท'
                                    returnKeyType='next'
                                    onBlur={false}
                                    autoCapitalize={false} />
                        }

                        <View style={styles.marginBetweenVertical}></View>
                        {
                            this.state.channel == 2 ?
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>{`กรณีออกบูทตลาดนัด`}</Text>
                                        <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                                    </View>
                                    <TextInput style={[styles.input, styles.shadow]}
                                        ref={(input) => { this.marketName = input; }}
                                        placeholder='ชื่อตลาด'
                                        returnKeyType='next'
                                        onBlur={false}
                                        autoCapitalize={false} />
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>{`จังหวัด`}</Text>
                                        <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                                    </View>
                                    <View style={[styles.input, styles.shadow, styles.center]}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="เลือกจังหวัด"
                                            textStyle={{ fontSize: 18 }}
                                            itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                            itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                            style={[{ color: 'gray', width: '100%' }]}
                                            selectedValue={this.state.position}
                                            onValueChange={(value, index) => null} >
                                            {/* {
                                                    this.state.province.map((value, index) => {
                                                        return (<Picker.Item key={index} label={value.provinceName} value={value.provinceId} />);
                                                    })
                                                } */}
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>{`อำเภอ`}</Text>
                                        <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                                    </View>
                                    <View style={[styles.input, styles.shadow, styles.center]}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="เลือกอำเภอ"
                                            textStyle={{ fontSize: 18 }}
                                            itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                            itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                            style={[{ color: 'gray', width: '100%' }]}
                                            selectedValue={this.state.position}
                                            onValueChange={(value, index) => null} >
                                            {/* {
                                                    this.state.province.map((value, index) => {
                                                        return (<Picker.Item key={index} label={value.provinceName} value={value.provinceId} />);
                                                    })
                                                } */}
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>{`ตำบล`}</Text>
                                        <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                                    </View>
                                    <View style={[styles.input, styles.shadow, styles.center]}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="เลือกตำบล"
                                            textStyle={{ fontSize: 18 }}
                                            itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                            itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                            style={[{ color: 'gray', width: '100%' }]}
                                            selectedValue={this.state.position}
                                            onValueChange={(value, index) => null} >
                                            {/* {
                                                    this.state.province.map((value, index) => {
                                                        return (<Picker.Item key={index} label={value.provinceName} value={value.provinceId} />);
                                                    })
                                                } */}
                                        </Picker>
                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`ตำแหน่งที่สมัคร`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกตำแหน่ง"
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.position}
                                onValueChange={(value, index) => null} >
                                {/* {
                                    this.state.province.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.provinceName} value={value.provinceId} />);
                                    })
                                } */}
                            </Picker>
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`รูปถ่ายผู้สมัคร`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        {
                            this.state.ImageSource != '' ?
                                <View style={[styles.center, { flex: 1 }]}>
                                    <Image source={{ uri: this.state.ImageSource }} style={{ width: 180, height: 200, borderRadius: 8, backgroundColor: '#D3D5D1', alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                                :
                                <View style={[styles.center, { flex: 1 }]}>
                                    <TouchableOpacity style={{ width: 180, height: 200, borderRadius: 8, backgroundColor: '#D3D5D1', alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => this.onTakePicture()}>
                                        <Icon name='camera' size={45} color='gray' />
                                    </TouchableOpacity>
                                </View>
                        }
                        <View style={styles.marginBetweenVertical}></View>
                        <TouchableOpacity style={[styles.secondaryButton, styles.center]}>
                            <Text style={[{ color: secondaryColor, fontSize: 26 }, styles.bold]}>{`ส่งข้อมูลการสมัคร`}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)