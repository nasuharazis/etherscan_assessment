import React, {useState, useEffect, Children, useRef} from 'react';
import {connect} from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import { action_getSearch, action_getResult } from '../action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
let width = Dimensions.get('window').width;

// const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
//     checkInverted: true,
// });


class Watchlist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
            openScanner: false,
            item: null,
            desc: null,
        }
    }

    UNSAFE_componentWillReceiveProps(props){

        const {
            search, resultData
        } = props;

        if(search && search.length > 0){
            this.setState({searchResult: search})
        }
        if(resultData !== null && resultData.message === 'OK'){
            console.log(resultData.result)
            this.setState({item: resultData.result})
        }
    }

    requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            this.setState({openScanner: true})
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    }

    search(term){
        this.setState({item: null, desc: null})
        if(term.length > 2){
            let param = {
                module: 'search',
                term: term
            }
            this.props.action_getSearch(param)
        }
    }

    setItem(item){
        console.log(item)
        this.setState({desc: item.desc})
        let param = {
            module: 'result',
            value: item.value,
            type: item.typeval,
        }
        this.props.action_getResult(param)
    }

    renderSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: "90%",
                backgroundColor: "#CED0CE",
                marginLeft: "12%"
            }}
          />
        );
    }

    renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}} onPress={() => this.setItem(item)}>
                <Image source={{uri: item.logo}} style={{height: 30, width:30, borderRadius:15}} /> 
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>{item.label}</Text>
                    <Text style={{fontSize: 12}}>{item.desc}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const devices = useCameraDevices;
        const device = devices.back;
        return (
            <>
                <StatusBar barStyle='light-content' backgroundColor="#004DDC"  />
                {
                    Platform.OS == 'ios' && <View style={{backgroundColor:"#004DDC", width: '100%', height: 47, position: 'absolute', top: 0, zIndex: 999}}/>
                }

                <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FC' }}>

                <View style={styles.header}>
                    <Text style={{fontSize: 24, color: '#fff'}}>Etherscan</Text>
                </View>

                {/* {(this.state.openScanner) ?
                    <>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                            frameProcessor={frameProcessor}
                            frameProcessorFps={5}
                            />
                            {barcodes.map((barcode, idx) => (
                            <Text key={idx} style={styles.barcodeTextURL}>
                                {barcode.displayValue}
                            </Text>
                            ))}
                    </>
                : null} */}

                <View style={{backgroundColor: '#F5F7FC'}}>
                    {this.state.searchResult.length > 0 && this.state.item === null ? 
                    <View style={styles.list}>
                        <FlatList
                            data={this.state.searchResult}
                            ItemSeparatorComponent={this.renderSeparator}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.value}
                        />
                    </View> : null
                    }
                </View>
            </SafeAreaView>
            </>
        )
    }
}
 
const styles = StyleSheet.create({
    header: {
        width: '100%', 
        backgroundColor: '#004DDC', 
        // justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 16, 
        paddingVertical: 16
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    searchBar: {
        width: '100%',
        backgroundColor: '#E4E6EA',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    bannerBG: {
        width: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        height: 118, 
        backgroundColor: '#004DDC'
    },
    list: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingHorizontal: 16, 
        // paddingTop: 20, 
        justifyContent: 'space-between'
    },
});

function mapStateToProps({result}) {
    const {search, resultData} = result;

    return {search, resultData};
}

export default connect( mapStateToProps, { action_getSearch, action_getResult } )(Watchlist);