import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHightligt
        ,Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/FlatListData';

var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newDes: ''
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    };
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    };
    render() {
        return (
            <Modal
                ref = {"myModal"}
                style = {{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                positon = 'center'
                backdrop = {true}
                onClosed = {() => {
                    //alert("Modal close");
                }}>
                <Text
                    style = {{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40
                    }}>New Info</Text>
                <TextInput
                    style = {{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText = {(text) => this.setState({newName: text})}
                    placeholder = "Enter new name"
                    value = {this.state.newName}/>
                <TextInput
                    style = {{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText = {(text) => this.setState({newDes: text})}
                    placeholder = "Enter new des"
                    value = {this.state.newDes}/>
                <Button
                    style = {{
                        fontSize: 18,
                        color: 'white'
                    }}
                    containerStyle = {{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress = {() => {
                        if (this.state.newName.length == 0 || this.state.newDes.length == 0) {
                            alert("You must enter name and description");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newData = {
                            key: newKey,
                            name: this.state.newName,
                            imageUrl: "https://iconscout.com/iconscout_logo-1024x1024.png",
                            des: this.state.newDes
                        };
                        FlatListData.push(newData);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        this.refs.myModal.close();
                    }}
                >Save</Button>
            </Modal>
        );
    }
}