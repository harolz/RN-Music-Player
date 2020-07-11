import * as React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Image, FlatList, TouchableWithoutFeedback} from "react-native";
import {inject, observer} from 'mobx-react'
import FixedButton from '../components/fixedButton';
import MusicCollectionList from '../components/musicCollectionList';
import TouchableButton from '../components/touchableButton';
import Constants from 'expo-constants';

const REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
  
export default class HomeScreen extends React.Component {


  async componentDidMount() {
    this.props.store.init()
  }

  openAddModal() {
    this.props.navigation.push('AddMusicCollection')
  }
  openSearchMusicResultModal() {
    //this.props.store.songsList = [];
    this.props.navigation.push('SearchMusicListDetails')
  }
  // 跳转到音乐搜索页面
  jumpToMusicListDetail(){
    this.props.store.songsList = [];
    this.props.navigation.push('SearchMusicListDetails');
  }

  render() {
    return (
      <View style={styles.rnWarp}>
        <View style={styles.rnSearchWarp}>
          <TouchableButton
            iconName='magnifying-glass'
            buttonName='Search Local Music'
            onPress={this.openSearchMusicResultModal.bind(this)}
          />
        </View>
        <MusicCollectionList navigation={this.props.navigation}/>
        <FixedButton onPress={this.openAddModal.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rnWarp:{
    flex:1
  },
  rnSearchWarp:{
    height:50
  }
});
