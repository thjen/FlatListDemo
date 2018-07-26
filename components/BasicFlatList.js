import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from "./AddModal";
import EditModal from "./EditModal";

class FlatListItem extends Component { // = viewholder
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfFresh: 0
        };
    }
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfFresh: prevState.numberOfFresh + 1
            };
        });
    };
    render () {
        const swipeSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null) {
                    this.setState({activeRowKey: null});
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            // delete button
            right: [
                {
                    onPress: () => {
                        this.props.parentFlatList.refs.editModal.showEditModal(FlatListData[this.props.index], this);
                    },
                    text: 'Edit',
                    type: 'primary'
                },
                {
                onPress: () => {
                    const deletingRow = this.state.activeRowKey;
                    Alert.alert(
                        'Alert',
                        'Are you sure you want to delete?',
                        [
                            {text: 'No', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {
                                FlatListData.splice(this.props.index, 1); // 1 = nut delete
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                            }},
                        ],
                        { cancelable: true }
                    );
                },
                text: 'Delete',
                type: 'delete'
            }],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout
                {...swipeSetting}>
                <View
                    style = {{
                        flex: 1,
                        flexDirection: 'column'
                    }}>
                    <View
                        style = {{
                            flex: 1,
                            flexDirection: 'row',
                            //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                            backgroundColor: 'mediumseagreen'
                        }}>
                        <Image
                            style = {{
                                width: 100,
                                height: 100,
                                margin: 5
                            }}
                            source = {{uri: this.props.item.imageUrl}}>
                        </Image>
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: 'column'
                            }}>
                            <Text style = {styles.flatItem}>{this.props.item.name}</Text>
                            <Text style = {styles.flatItem}>>{this.props.item.des}</Text>
                        </View>
                    </View>
                    <View
                        style = {{
                            height: 1,
                            backgroundColor: 'white'
                        }}>
                    </View>
                </View>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    flatItem: {
        color: 'white',
        padding: 10,
        fontSize: 16
    }
});

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deleteRowKey: null
        });
        this._onPressAdd = this._onPressAdd.bind(this); // bind this to basicflatlist object
    }
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deleteRowKey: activeKey
            }
        });
        this.refs.flatList.scrollToEnd();
    };
    _onPressAdd() {
        //alert("add items");
        this.refs.addModal.showAddModal();
    }
    render() {
        return (
            <View
                style = {{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? 34 : 0
                }}>
                <View
                    style = {{
                        backgroundColor: 'tomato',
                        height: 64,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                    <TouchableHighlight
                        style = {{
                            marginRight: 20
                        }}
                        underlayColor = 'tomato'
                        onPress = {this._onPressAdd}>
                        <Text
                            style = {{
                                width: 50,
                                height: 30,
                                fontSize: 16,
                                backgroundColor: 'green',
                                color: 'white'
                            }}>Add</Text>
                    </TouchableHighlight>
                </View>
                <FlatList
                    ref = {"flatList"}
                    data = {FlatListData}
                    renderItem = {({item, index}) => {
                        //console.log(`item = ${JSON.stringify(item)} , index = ${index}`);
                        return (
                            <FlatListItem
                                // item va index tu dinh. ngia~
                                item = {item}
                                index = {index}
                                parentFlatList = {this} // make flatlist as props of flatlistitem
                            >
                            </FlatListItem>
                        );
                    }}>
                </FlatList>
                <AddModal
                    ref = {'addModal'} // variable name of modal
                    parentFlatList = {this}>
                </AddModal>
                <EditModal
                    ref = {'editModal'}
                    parentFlatList = {this}>
                </EditModal>
            </View>
        );
    }
}
