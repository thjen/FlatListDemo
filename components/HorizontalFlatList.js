import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text,
        View, Image, Alert, Platform, TouchableHighlight, TouchableOpacity} from 'react-native';
import HorizontalFlatListData, {horizontalFlatListData} from '../data/HorizontalFlatListData';
import Icon from 'react-native-vector-icons/Ionicons';

class HorizontalFlatListItem extends Component {
    render() {
        return (
            <View
                style = {{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 90,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'grey',
                    margin: 4
                }}>
                <TouchableOpacity
                    onPress = {() => {
                        alert(`you press: ${this.props.item.hour}`);
                    }}
                    style = {{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                    }}>
                </TouchableOpacity>
                <Text
                    style = {{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                        margin: 20
                    }}>{this.props.item.hour}</Text>
                <Icon
                    name = {Platform.OS === 'ios' ? this.props.item.status.ios : this.props.item.status.android}
                    size = {35}
                    color = 'white'
                />
                <Text
                    style = {{
                        fontSize: 16,
                        margin: 10,
                        color: 'white'
                    }}>{this.props.item.degrees} F</Text>
            </View>
        );
    }
}

export default class HorizontalFlatList extends Component {
    render() {
        return (
            <View
                style = {{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: Platform.OS === 'ios' ? 34 : 0
                }}>
                <View
                    style = {{
                        // full screen
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}>
                    <Image
                        style = {{
                            flex: 1,
                            flexDirection: 'column',
                            width: null,
                            height: null,
                            backgroundColor: 'transparent',
                            justifyContent: 'center'
                        }}
                        source = {require('../images/bg.png')}>
                    </Image>
                </View>
                <View
                    style = {{
                        height: 150
                    }}>
                    <FlatList
                        style = {{
                            backgroundColor: 'black',
                            opacity: 0.5
                        }}
                        horizontal = {true}
                        data = {horizontalFlatListData}
                        renderItem = {({item, index}) => {
                            return (
                                <HorizontalFlatListItem
                                    item = {item}
                                    index = {index}
                                    parentFlatList = {this}>
                                </HorizontalFlatListItem>
                            );
                        }}
                        // make hour as key
                        keyExtractor = {(item, index) => item.hour}>
                    </FlatList>
                </View>
            </View>
        );
    }
}