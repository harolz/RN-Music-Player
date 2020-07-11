import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import SongsList from '../components/SongsList';
import FrontBook from '../components/FrontBook';
import {Video} from 'expo';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class MusicSearchListDetails extends Component {


  render() {
    const {currentMusic, isSearch, volume} = this.props.store;
    console.log(currentMusic);
    return (
      <View style={styles.detailContainer}>
        <ScrollView>
          <FrontBook
            navigation={this.props.navigation}
          />
          {
            isSearch ? <View>
              <Text>
                Searching...
              </Text>
            </View> : <View/>
          }
          <SongsList fromType='musicSearchListDetail'/>
        </ScrollView>
      </View>
    )
  }
}


export default MusicSearchListDetails

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1
  },

})
