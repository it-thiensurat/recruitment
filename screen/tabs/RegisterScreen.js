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
    secondaryColor,
    API_KEY,
    BASEURL,
    POSITION_URL,
    PROVINCE_URL,
    DISTRICT_URL,
    SUBDISTRICT_URL,
    COMPANY_URL,
    TITLE_URL,
    TOKEN_KEY,
    REGISTER
} from '../../utils/contants'

import styles from '../../style/style'
import Helper from '../../utils/Helper'
import { TouchableOpacity } from 'react-native-gesture-handler'

class RegisterScreen extends React.Component {

    state = {
        titleId: '',
        titleName: '',
        firstName: '',
        lastName: '',
        gender: '',
        citizenId: '',
        birthDate: '',
        mobile: '',
        location: -1,
        locationName: '',
        provinceId: '',
        provinceName: '',
        districtId: '',
        districtName: '',
        subDistrictId: '',
        subDistrictName: '',
        zipcode: '',
        companyId: '',
        companyName: '',
        positionId: '',
        positionName: '',
        gallery: "",
        galleryup: "",
        title_data: [],
        district_data: [],
        subdistrict_data: [],

        ImageSource: ''
    }

    onSelectGender(index, value) {
        this.setState({ gender: value })
    }

    onSelectChannel(index, value) {
        this.setState({ location: value })
    }

    onSelectTitle(value) {
        if (value != '999') {
            const props = this.props.reducer
            let title = props.title
            let title_arr = title.filter((item) => item.Id == value)
            this.setState({ titleId: value, titleName: title_arr[0].NameTh })
            // alert(JSON.stringify(this.state.title_name))
        } else {
            this.setState({ titleId: '', titleName: '' })
        }
    }

    onSelectProvince(value) {
        if (value != '-99') {
            const props = this.props.reducer
            let province = props.province
            let province_arr = province.filter((item) => item.ProvinceCode == value)
            this.setState({ provinceId: value, provinceName: province_arr[0].ProvinceName, subdistrict_data: [], subDistrictId: '', subDistrictName: '', zipcode: '' })
            // alert(JSON.stringify(this.state.provinceName))
            this.getDistrict(value)
        } else {
            this.setState({ provinceId: '', provinceName: '' })
        }
    }

    getDistrict(value) {
        let that = this
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }

        Helper.get(BASEURL + DISTRICT_URL + '?provinceid=' + value, header, (results) => {
            if (results.status == 'SUCCESS') {
                that.setState({ district_data: results.data })
                // that.setState({ loading: false })
            } else {
                alert(`${results.message}`)
            }
        })
    }

    onSelectDistrict(value) {
        let district_arr = this.state.district_data.filter((item) => item.DistrictCode == value)
        this.setState({ districtId: value, districtName: district_arr[0].DistrictName })
        // alert(JSON.stringify(this.state.districtName))
        this.getSubDistrict(value)
    }

    getSubDistrict(value) {
        let that = this
        const props = that.props
        let header = {
            'x-api-key': API_KEY
        }

        Helper.get(BASEURL + SUBDISTRICT_URL + '?districtid=' + value, header, (results) => {
            if (results.status == 'SUCCESS') {
                that.setState({ subdistrict_data: results.data })
                // that.setState({ loading: false })
            } else {
                alert(`${results.message}`)
            }
        })
    }

    onSelectSubDistrict(value) {
        let subdistrict_arr = this.state.subdistrict_data.filter((item) => item.SubDistrictCode == value)
        this.setState({ subDistrictId: value, subDistrictName: subdistrict_arr[0].SubDistrictName, zipcode: subdistrict_arr[0].Postcode })
        // alert(JSON.stringify(this.state.subDistrictName))
    }

    onSelectCompany(value) {
        if (value != '-99') {
            const props = this.props.reducer
            let company = props.company
            let company_arr = company.filter((item) => item.CompanyId == value)
            this.setState({ companyId: value, companyName: company_arr[0].CompanyTh })
            // alert(JSON.stringify(this.state.company_name))
        } else {
            this.setState({ companyId: '', companyName: '' })
        }
    }

    onSelectPosition(value) {
        if (value != '-999') {
            const props = this.props.reducer
            let position = props.position
            let position_arr = position.filter((item) => item.Id == value)
            this.setState({ positionId: value, positionName: position_arr[0].NameTh })
            // alert(JSON.stringify(this.state.positionName))
        } else {
            this.setState({ positionId: '', positionName: '' })
        }
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

    onSaveRegister() {
        let that = this
        const props = that.props
        const { titleId,
            titleName,
            firstName,
            lastName,
            gender,
            citizenId,
            birthDate,
            mobile,
            location,
            locationName,
            provinceId,
            provinceName,
            districtId,
            districtName,
            subDistrictId,
            subDistrictName,
            zipcode,
            companyId,
            companyName,
            positionId,
            positionName,
            gallery } = that.state
        let header = {
            // 'Authorization': '',
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('', titleId);
        formData.append('', titleName);
        formData.append('', firstName);
        formData.append('', lastName);
        formData.append('', gender);
        formData.append('', citizenId);
        formData.append('', birthDate);
        formData.append('', mobile);
        formData.append('', location);
        formData.append('', locationName);
        formData.append('', province_id);
        formData.append('', province_name);
        formData.append('', district_id);
        formData.append('', district_name);
        formData.append('', subDistrict_id);
        formData.append('', subDistrict_name);
        formData.append('', zipcode);
        formData.append('', company_id);
        formData.append('', company_name);
        formData.append('', position_id);
        formData.append('', position_name);
        that.state.galleryup.map((v, i) => {
            let gallerys = {
              uri: v.path,
              type: v.mime,
              name: 'name_' + i + '.jpg',
            };
            formData.append('gallery[' + i + ']', gallerys);
          });

        props.indicatorControll(true)
        Helper.post(BASEURL + REGISTER, formData, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.tokenControll('save', results.token)
                props.userInfoControll('save', results.data)
                StorageService.set(TOKEN_KEY, results.token)
                props.indicatorControll(false)
                props.navigation.replace('Main')
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
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
        let title_header = [{ NameTh: 'เลือกคำนำหน้า', Id: '999' }]
        let province_header = [{ ProvinceName: 'เลือกจังหวัด', ProvinceCode: '-99' }]
        let company_header = [{ CompanyTh: 'เลือกบริษัท', CompanyId: '-99' }]
        let position_header = [{ NameTH: 'เลือกตำแหน่ง', Id: '-999' }]
        const props = this.props.reducer
        let title = props.title
        let province = props.province
        let company = props.company
        let position = props.position
        title = title_header.concat(title)
        province = province_header.concat(province)
        company = company_header.concat(company)
        position = position_header.concat(position)
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
                            <Text style={{ fontSize: 20 }}>{`คำนำหน้า`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกคำนำหน้า"
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.titleId}
                                onValueChange={(value, index) => this.onSelectTitle(value)} >
                                {
                                    title.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`ชื่อ (ภาษาไทย)`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.firstName = input; }}
                            placeholder=''
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.lastName.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`นามสกุล (ภาษาไทย)`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.lastName = input; }}
                            placeholder=''
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.citizenId.focus()} />
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
                                value='1'
                                color={secondaryColor}  >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`ชาย`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='2'
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
                            ref={(input) => { this.citizenId = input; }}
                            placeholder=''
                            keyboardType='number-pad'
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.mobile.focus()} />
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`เบอร์โทรศัพท์`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                            ref={(input) => { this.mobile = input; }}
                            placeholder=''
                            keyboardType='number-pad'
                            returnKeyType='next'
                            onBlur={false}
                            autoCapitalize={false}
                            onSubmitEditing={() => this.locationName.focus()} />
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
                                value='1'
                                color={secondaryColor}  >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`Facebook`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='2'
                                color={secondaryColor} >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`Youtube`}</Text>
                            </RadioButton>
                            <RadioButton
                                value='3'
                                color={secondaryColor} >
                                <Text style={{ color: primaryColor, fontSize: 20 }}>{`ตั้งบูท`}</Text>
                            </RadioButton>
                        </RadioGroup>
                        {
                            this.state.location == -1 || this.state.location == 3 ?
                                null
                                :
                                <TextInput style={[styles.input, styles.shadow]}
                                    ref={(input) => { this.locationName = input; }}
                                    placeholder='ระบุลิ้งค์เฟซบุ๊ค, ลิ้งค์ยูทูบ หรือชื่อตลาดที่ออกบูท'
                                    returnKeyType='next'
                                    onBlur={false}
                                    autoCapitalize={false} />
                        }

                        <View style={styles.marginBetweenVertical}></View>
                        {
                            this.state.channel == 3 ?
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                        <Text style={{ fontSize: 20 }}>{`กรณีออกบูทตลาดนัด`}</Text>
                                        <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                                    </View>
                                    <TextInput style={[styles.input, styles.shadow]}
                                        ref={(input) => { this.locationName = input; }}
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
                                            selectedValue={this.state.province_id}
                                            onValueChange={(value, index) => this.onSelectProvince(value)} >
                                            {
                                                province.map((value, index) => {
                                                    return (<Picker.Item key={index} label={value.ProvinceName} value={value.ProvinceCode} />);
                                                })
                                            }
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
                                            selectedValue={this.state.district_id}
                                            onValueChange={(value, index) => this.onSelectDistrict(value)} >
                                            {
                                                this.state.district_data.map((value, index) => {
                                                    return (<Picker.Item key={index} label={value.DistrictName} value={value.DistrictCode} />);
                                                })
                                            }
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
                                            selectedValue={this.state.subdistrict_id}
                                            onValueChange={(value, index) => this.onSelectSubDistrict(value)} >
                                            {
                                                this.state.subdistrict_data.map((value, index) => {
                                                    return (<Picker.Item key={index} label={value.SubDistrictName} value={value.SubDistrictCode} />);
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={styles.marginBetweenVertical}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`บริษัทที่สมัคร`}</Text>
                            <Text style={{ color: 'red', fontSize: 20, textAlignVertical: 'center' }}>{` *`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกบริษัท"
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.company_id}
                                onValueChange={(value, index) => this.onSelectCompany(value)} >
                                {
                                    company.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.CompanyTh} value={value.CompanyId} />);
                                    })
                                }
                            </Picker>
                        </View>
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
                                selectedValue={this.state.position_id}
                                onValueChange={(value, index) => this.onSelectPosition(value)} >
                                {
                                    position.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.NameTH} value={value.Id} />);
                                    })
                                }
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
                        <TouchableOpacity style={[styles.secondaryButton, styles.center]}
                            // onPress={() => 
                            // this.onSaveRegister()}
                            >
                            <Text style={[{ color: secondaryColor, fontSize: 26 }, styles.bold]}>{`ส่งข้อมูลการสมัคร`}</Text>
                        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)