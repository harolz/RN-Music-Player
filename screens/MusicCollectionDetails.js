import React, {Component} from 'react'
import {inject, observer} from 'mobx-react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import SongsList from '../components/SongsList';
import TouchableButton from "../components/touchableButton";
import {Audio} from 'expo-av'
import MyVideo from '../components/myVideo';

const playTypeArray = [
  {
    iconName:'cycle',
    btnName:'Cycle'
  },
  {
    iconName:'creative-cloud',
    btnName:'Random'
  },
  {
    iconName:'minus',
    btnName:'Looping'
  }
];

@inject('store')
@observer
class MusicCollectDetail extends Component {

  handlePlay() {

    this.props.store.handlePlayMusic()
  }

  handlePlayPrev(){
    this.props.store.handlePlayPrevNextMusic('prev')

  }

  handlePlayNext(){
    this.props.store.handlePlayPrevNextMusic('next')
  }

  handleChangePlayType(){
    this.props.store.handleChangePlayType()
  }

  handleVideoProgress(process) {
    console.log(process);
    this.props.store.process = process.currentTime;
  }
  handleVideoError(err) {
    console.log(err);
  }

  handleVideoEnd() {
    this.props.store.handleNextMusic()
  }

  handleVideoLoad() {
    console.log('load')
  }

  handleVideoTime() {
    console.log('onTimedMetadata')
  }

  handleVideoLoadStart() {
    console.log('loadStart')
  }

  err(err) {
    console.log(err)
  }


  render() {
    const {isPaused,currentMusic = {},volume,currentMusicColelct,playType} = this.props.store;
    return (
      <ScrollView>
        {
          // currentMusic.path && <Video
          //   audioOnly
          //   playInBackground
          //   volume={volume}
          //   paused={isPaused}
          //   source={{uri: currentMusic.path}}   // Can be a URL or a local file.
          //   ref={(ref) => {
          //     this.props.store.uniquePlayer = ref;
          //   }}                                      // Store reference
          //   onEnd={this.handleVideoEnd.bind(this)}
          //   onLoad={this.handleVideoLoad.bind(this)}
          //   onLoadStart={this.handleVideoLoadStart.bind(this)}
          //   onTimedMetadata={this.handleVideoTime.bind(this)}
          //   onProgress={this.handleVideoProgress.bind(this)}
          //   onVideoError={this.err.bind(this)}
          //   onError={this.handleVideoError.bind(this)}               // Callback when video cannot be loaded
          // />
        }
        <View>
          <Text>{currentMusicColelct.name}</Text>
        </View>
        <View style={styles.btnWarp}>
          <TouchableButton
            onPress={this.handlePlay.bind(this)}
            iconName={!isPaused ? 'controller-paus' : 'controller-play'}
            buttonName={!isPaused ? 'Pause' : 'Play'}
          />
          <TouchableButton
            onPress={this.handlePlayPrev.bind(this)}
            iconName={ 'controller-jump-to-start'}
            buttonName='Play Last'
          />
          <TouchableButton
            onPress={this.handlePlayNext.bind(this)}
            iconName={ 'controller-next'}
            buttonName='Play Next'
          />
          <TouchableButton
            onPress={this.handleChangePlayType.bind(this)}
            iconName={playTypeArray[playType].iconName}
            buttonName={playTypeArray[playType].btnName}
          />
        </View>
        <SongsList fromType='musicCollectDetail'/>
      </ScrollView>
    )
  }
}


export default MusicCollectDetail

const styles = StyleSheet.create({
  btnWarp:{
    flexDirection:'row'
  }
});
