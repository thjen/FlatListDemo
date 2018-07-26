import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHightligt
    ,Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/FlatListData';

var screen = Dimensions.get('window');

export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            des: ''
        };
    }
    showEditModal = (editing, flatlistItem) => {
        //console.log(`editing = ${JSON.stringify(editing)}`);
        this.setState({
            key: editing.key,
            name: editing.name,
            des: editing.des,
            flatlistItem: flatlistItem
        });
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
                    onChangeText = {(text) => this.setState({name: text})}
                    placeholder = "Enter new name"
                    value = {this.state.name}/>
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
                    onChangeText = {(text) => this.setState({des: text})}
                    placeholder = "Enter new des"
                    value = {this.state.des}/>
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
                        if (this.state.name.length == 0 || this.state.des.length == 0) {
                            alert("You must enter name and description");
                            return;
                        }
                        /** update **/
                        var foundIndex = FlatListData.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0) {
                            return;
                        }
                        FlatListData[foundIndex].name = this.state.name;
                        FlatListData[foundIndex].des = this.state.des;
                        this.state.flatlistItem.refreshFlatListItem();
                        this.refs.myModal.close();
                    }}
                >Save</Button>
            </Modal>
        );
    }
}