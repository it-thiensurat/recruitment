import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    FlatList,
    ScrollView,
    Dimensions,
    BackHandler,
    Modal,
    TouchableOpacity,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { Picker } from "native-base"
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Carousel from 'react-native-snap-carousel'

import img_nopic from '../../img/noProfile.png'

import {
    TOKEN_KEY,
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    tertiary,
    API_KEY,
    BASEURL,
    GET_REGISTER,
    GET_PERIOD
} from '../../utils/contants'

import {
    indicatorControll
} from '../../actions'

import StorageService from '../../utils/StorageServies'
import styles from '../../style/style'
import Helper from '../../utils/Helper'

import Moment from 'moment'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ListScreen extends React.Component {

    state = {
        register: [],
        period: [],
        year: '',
        month: '',
        reg_month: '0',
        reg_all: '0',
        checked: ''
    }

    getData = () => {
        let that = this;
        const props = that.props
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('y', this.state.year);
        formData.append('m', this.state.month);

        props.indicatorControll(true)
        Helper.post(BASEURL + GET_REGISTER, formData, header, (results) => {
            // console.log(results)
            if (results.status == 'SUCCESS') {
                that.setState({ register: results.data, reg_month: results.count, reg_all: results.all })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                // alert(`${results.message}`)
            }
        })
    }

    async onSearch() {
        if (this.state.year != '' && this.state.month != '' && this.state.month != '00') {
            await this.setState({ register: [], reg_month: '0', reg_all: '0' });
            await this.getData();
            await this.getPeriod();
        } else {
            Alert.alert(
                //title
                'คำเตือน!!',
                //body
                `กรุณาเลือกข้อมูลเดือนและปีที่ต้องการเรียกข้อมูลให้ครบถ้วน`,
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
                //clicking out side of alert will not cancel
            )
        }
    }

    getPeriod() {
        let that = this;
        const props = that.props
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }

        Helper.post(BASEURL + GET_PERIOD, "", header, (results) => {
            // console.log(results)
            if (results.status == 'SUCCESS') {
                that.setState({ period: results.data })
                // props.indicatorControll(false)
            } else {
                alert(`${results.message}`)
            }
        })
    }

    async onSelectYear(value) {
        await this.setState({ year: value })
        // alert(JSON.stringify(this.state.year))
    }

    async onSelectMonth(value) {
        await this.setState({ month: value });
        // alert(JSON.stringify(this.state.month))
    }

    ComponentLeft = () => {
        return (
            <View style={[styles.center, { padding: 6 }]}>

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
            <View style={[styles.center, { padding: 6 }]}>
                <TouchableOpacity
                    onPress={
                        async () => {
                            await this.setState({ register: [], reg_month: '0', reg_all: '0' });
                            await this.getData();
                            await this.getPeriod();
                        }
                    }>
                    <Icon name="history" color={lightColor} size={24} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: tertiary }}>
                <View style={{ width: DEVICE_WIDTH - 65, height: 420, justifyContent: 'center', backgroundColor: 'white', borderStyle: "solid", borderColor: primaryColor, borderWidth: 1, borderRadius: 5, padding: 7 }}>
                    <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>
                        {
                            item.Picture != null ?
                                <Image style={{ width: 120, height: 120, resizeMode: "cover" }} source={{ uri: item.Picture }} />
                                :
                                <Image style={{ width: 120, height: 120, resizeMode: "cover" }} source={img_nopic} />
                        }
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ชื่อ - นามสกุล`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.Title}${item.Firstname} ${item.Lastname}`}</Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ช่องทางที่รับสมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.LocationName != "" ? item.LocationName : '-'}`}</Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`จังหวัดที่รับสมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.Province != "" ? item.Province : '-'}`}
                            {/* {`${item.Province != "" || item.Province != null ? item.Province : '-'}`} */}
                            </Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`บริษัทที่สมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.CompanyTh != null ? item.CompanyTh : '-'}`}
                            {/* {`${item.CompanyTh != "" || item.CompanyTh != null ? item.CompanyTh : '-'}`} */}
                            </Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ตำแหน่งที่สมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.PositionName != "" ? item.PositionName : '-'}`}
                            {/* {`${item.PositionName != "" || item.PositionName != null ? item.PositionName : '-'}`} */}
                            </Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`วันที่รับสมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${Moment(item.RecruitmentDate).format("DD/MM/YYYY")}`}</Text>
                    </View>
                </View>
            </View >
        );
    };

    handleBack = () => {
        return true
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        await this.getData()
        await this.getPeriod()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const props = this.props.reducer

        return (
            <View style={{ flex: 1, backgroundColor: tertiary }}>
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
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between', marginLeft: 12 }}>
                        <View style={[styles.inputContainer, styles.shadow], { flex: 0.45, height: 45, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15, alignSelf: 'center', justifyContent: 'center', marginRight: 5 }}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกเดือน"
                                textStyle={{ fontSize: 16 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 14 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.month}
                                onValueChange={this.onSelectMonth.bind(this)} >
                                <Picker.Item label="เลือกเดือน" value="00" />
                                <Picker.Item label="มกราคม" value="01" />
                                <Picker.Item label="กุมภาพันธ์" value="02" />
                                <Picker.Item label="มีนาคม" value="03" />
                                <Picker.Item label="เมษายน" value="04" />
                                <Picker.Item label="พฤษภาคม" value="05" />
                                <Picker.Item label="มิถุนายน" value="06" />
                                <Picker.Item label="กรกฎาคม" value="07" />
                                <Picker.Item label="สิงหาคม" value="08" />
                                <Picker.Item label="กันยายน" value="09" />
                                <Picker.Item label="ตุลาคม" value="10" />
                                <Picker.Item label="พฤศจิกายน" value="11" />
                                <Picker.Item label="ธันวาคม" value="12" />
                            </Picker>
                        </View>
                        <View style={{ flex: 0.40, height: 45, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15, alignSelf: 'center', justifyContent: 'center', marginRight: 5 }}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกปี"
                                textStyle={{ fontSize: 16 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 16 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.year}
                                onValueChange={(value, index) => this.onSelectYear(value)} >
                                {
                                    this.state.period.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.y} value={value.y} />);
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 0.15, alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.center, { height: 45, width: 45, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15 }]}
                                onPress={() =>
                                    this.onSearch()
                                } >
                                <Icon name="search" size={20} color={secondaryColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.register != '' ?
                            <Carousel
                                data={this.state.register}
                                renderItem={this._renderItem}
                                sliderWidth={DEVICE_WIDTH}
                                itemWidth={DEVICE_WIDTH - 55}
                                inactiveSlideScale={0.90}
                                inactiveSlideOpacity={0.8}
                                style={{ alignItems: 'center' }}
                            />
                            :
                            <View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: primaryColor, fontFamily: 'DBMed', alignSelf: 'center' }}>{`ไม่พบรายการ`}</Text>
                            </View>
                    }
                    <View style={{ flex: 0.2, backgroundColor: tertiary, flexDirection: 'column', paddingTop: 10, paddingLeft: 10 }}>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24 }]}>{`จำนวนผู้สมัครในเดือน :`}</Text>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24, paddingLeft: 20 }]}>{`${this.state.reg_month}`}</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24 }]}>{`จำนวนผู้สมัครทั้งหมด :`}</Text>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24, paddingLeft: 20 }]}>{`${this.state.reg_all}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)