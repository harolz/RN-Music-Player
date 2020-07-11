import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import {TouchableWithoutFeedback} from "react-native";

import { List, ListItem, Avatar } from 'react-native-elements'

@inject('store')
@observer
class MusicCollectionList extends Component {

  onRefresh() {
    this.props.store.init()
  }

  itemClick(item) {
    if (this.props.fromType && this.props.fromType === 'frontBook') {
      this.props.store.handleSaveToMusicCollect(item, this.props.navigation);
      return
    }
    this.props.navigation.push('MusicCollectionDetails');
    this.props.store.currentMusicColelct = item;
    this.props.store.songsList = item.songsList ||
      [
        {
          cover: "file:///storage/emulated/0/1702430.jpg",
          duration: "334263",
          album: "Fantasy",
          title: "Quiteness",
          fileName: "Jay Chou - Quiteness.mp3",
          path: "/storage/emulated/0/WindCloud/Jay Chou - Quiteness.mp3",
          author: "Jay Chou",
          id: "1702430",
        },
        {
          cover: "file:///storage/emulated/0/1702317.jpg",
          duration: "295693",
          album: "Chopin in November",
          title: "All Way to the North",
          fileName: "Jay Chou - All Way to the North.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Chopin in November/Jay Chou - All Way to the North.flac",
          author: "Jay Chou",
          id: "1702317"
        },
        {
          cover: "file:///storage/emulated/0/1702302.jpg",
          duration: "299200",
          album: "Common Jasmin Orange",
          title: "Common Jasmin Orange",
          fileName: "Jay Chou - Common Jasmin Orange.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Chopin in November/Jay Chou - Common Jasmin Orange.flac",
          author: "Jay Chou",
          id: "1702302",
        },
        {
          cover: "file:///storage/emulated/0/1702336.jpg",
          duration: "280386",
          album: "Huimei Ye",
          title: "Class Two Grade Three",
          fileName: "Jay Chou - Class Two Grade Three.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Huimei Ye/Jay Chou - Class Two Grade Three.flac",
          author: "Jay Chou",
          id: "1702336"
        },
        {
          cover: "file:///storage/emulated/0/1702275.jpg",
          duration: "195800",
          album: "Fantasy",
          title: "Shanghai 1943",
          fileName: "Jay Chou - Shanghai 1943.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Fantasy/Jay Chou - Shanghai 1943.flac",
          author: "Jay Chou",
          id: "1702275"
        },
        {
          cover: "file:///storage/emulated/0/1702333.jpg",
          duration: "315414",
          album: "Huimei Ye",
          title: "",
          fileName: "Jay Chou - East Wind Wither.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Huimei Ye/Jay Chou - East Wind Wither.flac",
          author: "Jay Chou",
          id: "1702333"
        },
        {
          cover: "file:///storage/emulated/0/1702295.jpg",
          duration: "256600",
          album: "Magic",
          title: "Uncle Jock",
          fileName: "Jay Chou - Uncle Jock.flac",
          path: "/storage/emulated/0/BaiduNetdisk/My Resource/Jay Chou - All Albums/Magic/Jay Chou - Uncle Jock.flac",
          author: "Jay Chou",
          id: "1702295"
        }
      ];
  }

  render() {
    const {musicCollectList, isRefreshing} = this.props.store;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />}
      >
        {
          musicCollectList.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={this.itemClick.bind(this, item)}>
                <ListItem
                  title={item.name.toUpperCase()}
                  subtitle={item.time || 'time unset'}
                  bottomDivider
                  chevron
                />
              </TouchableWithoutFeedback>
            )
          })
        }

      </ScrollView>
    )
  }
}

export default MusicCollectionList;
