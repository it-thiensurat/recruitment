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

import {
    TOKEN_KEY,
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    tertiary,
    API_KEY,
    BASEURL,
    GET_REGISTER
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
        year: '',
        month: '',
        checked: ''
    }

    getData = () => {
        let that = this;
        const props = that.props
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        // let formData = new FormData();

        props.indicatorControll(true)
        Helper.post(BASEURL + GET_REGISTER, "", header, (results) => {
            console.log(results)
            if (results.status == 'SUCCESS') {
                that.setState({ register: results.data })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                // alert(`${results.message}`)
            }
        })
    }

    ComponentLeft = () => {
        return (
            <View style={[styles.center, { padding: 6, margin: 13 }]}>

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
                            await this.setState({ register: [] })
                            await this.getData()
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
                    <View style={{ alignSelf: 'center', marginTop: 15, marginBottom: 20 }}>
                        <Image style={{ width: 120, height: 120, resizeMode: "cover" }} source={{ uri: item.Picture }} />
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ชื่อ - นามสกุล`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.Title}${item.Firstname} ${item.Lastname}`}</Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ช่องทางที่รับสมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.LocationName}`}</Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`บริษัทที่สมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.CompanyTh}`}</Text>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={[styles.bold, { fontSize: 18, color: primaryColor }]}>{`ตำแหน่งที่สมัคร`}</Text>
                        <Text style={[{ fontSize: 16, color: primaryColor, textAlignVertical: 'bottom' }]}>{`${item.PositionName}`}</Text>
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: tertiary }}>
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
                    <View style={{ height: 55, flexDirection: 'row' }}>
                        {/* <View style={{ flex: 0.35, alignSelf: 'center' }}>
                        <TouchableOpacity style={[styles.center]}
                            onPress={() => 
                                this.onSelectYear()
                            } >
                            <Icon name="calendar" size={30} color="secondaryColor" />
                        </TouchableOpacity>
                    </View> */}
                        <View style={[styles.input, styles.shadow, styles.center], { flex: 0.40, height: 40, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15, alignSelf: 'center', justifyContent: 'center' }}>
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
                                    // title.map((value, index) => {
                                    //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    // })
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 0.40, height: 40, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15, alignSelf: 'center', justifyContent: 'center' }}>
                            <Picker
                                mode="dropdown"
                                placeholder="เลือกเดือน"
                                textStyle={{ fontSize: 16 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 16 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.month}
                                onValueChange={(value, index) => this.onSelectMonth(value)} >
                                {
                                    // title.map((value, index) => {
                                    //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    // })
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 0.20, alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.center, { height: 40, width: 40, backgroundColor: 'white', borderWidth: 1, borderColor: primaryColor, borderRadius: 15 }]}
                                onPress={() =>
                                    this.onSearch()
                                } >
                                <Icon name="search" size={30} color="secondaryColor" />
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
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24, paddingLeft: 20 }]}>{`80`}</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24 }]}>{`จำนวนผู้สมัครทั้งหมด :`}</Text>
                            <Text style={[styles.bold, { color: primaryColor, fontSize: 24, paddingLeft: 20 }]}>{`200`}</Text>
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