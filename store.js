import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {Audio} from 'expo-av';

//import Toast from 'react-native-root-toast';


class Store {
  @observable musicCollectList = []; // 歌集列表,用于首页展示
  @observable songsList = []; // songsList组件的音乐列表
  @observable currentMusic = {}; // 当前播放的音乐
  @observable currentIndex = 0; // 当前播放音乐的索引
  @observable uniquePlayer = {}; // 当前Player对象
  @observable isPaused = true; // 播放器是否暂停 false为播放 true为停止
  @observable volume = 0.5;
  @observable process = {}; // 歌曲播放进度 {seekableDuration: 334.262,playableDuration: 334.262,currentTime: 303.356}
  @observable isVisible = false; // 控制模态框展示与否
  @observable musicCollectName = ''; // 添加歌集的名称
  @observable isRefreshing = false; // 下拉刷新状态 目前未用到
  @observable currentMusicColelct = {}; // 当前点击的音乐播放集
  @observable isSearch = false; // 是否在搜索音乐
  @observable playType = 0; // 播放方式  0 为顺序循环播放 1随机播放 2单首播放

  constructor() {
    console.log('store start');
  }

  // initilization
  init = async () => {
    const musicCollectList = await AsyncStorage.getItem('musicCollectList');
    this.musicCollectList = musicCollectList ? JSON.parse(musicCollectList) :[];
  };

  @action
  saveSongsList(list) {
    this.songsList = [...this.songsList, ...list];
    this.isSearch = false;
  }

  @action
  handleNextMusic = () => {
    if(this.playType === 2){
      // this.process = 0;
      this.uniquePlayer.seek(0);
      console.log(this.currentMusic);
    }else{
      this.handlePlayPrevNextMusic('next')
    }
    // this.currentIndex++;
    // this.currentMusic = this.songsList[this.currentIndex];
  };

  // 点击播放按钮
  @action
  handlePlayMusic = () => {
    // if it playing and paused
    if (Object.keys(this.process).length !== 0 && this.process.constructor === Object && this.isPaused) {
          alert(JSON.stringify(this.process))
      this.isPaused = false;
      this.uniquePlayer.seek(this.process.currentTime);
      return
    }
    // if it is playing
    if (!this.isPaused) {
          alert('was playing')
      this.isPaused = true;
      return
    }
    alert('first time play')
    // Playing for the first time
    this.currentMusic = this.songsList[0];
    this.currentIndex = 0;
    this.process = 0;
    this.isPaused = false;
    alert(this.currentMusic);
    alert("start playing music")
    const soundObject = new Audio.Sound();
    (async () => {
      console.log('here')
      await soundObject.loadAsync(require('./assets/SoundHelix-Song-1.mp3'));
      console.log('and here')
      await soundObject.playAsync();
    // all of the script.... 
})();
    //this.resetCurrentMusic();
  };


  handlePlayPrevNextMusic(type){
    if(this.playType === 1){
      this.currentIndex = Math.floor(Math.random() * this.songsList.length);
    }
    if(this.playType === 0 || this.playType === 2){
      if(type === 'prev'){
        this.currentIndex = this.currentIndex === 0 ? 0 : this.currentIndex - 1;
      }else{
        this.currentIndex = this.currentIndex === this.songsList.length ? 0 :this.currentIndex + 1;
      }
    }
    this.process = {};
    this.isPaused = false;
    this.currentMusic = this.songsList[this.currentIndex];
    console.log(this.currentIndex);
    this.resetCurrentMusic();
  }

  handleChangePlayType(){
    if(this.playType === 2){
      this.playType = 0;
      return
    }
    this.playType++;
  }

  resetCurrentMusic() {
    setTimeout(() => {
      if (this.process !== 0 || this.isPaused) {
        return
      }
      this.currentIndex++;
      if(!this.songsList[this.currentIndex]){
        this.currentIndex--;
        return
      }
      this.currentMusic = this.songsList[this.currentIndex];
      console.log('Play failed, auto playing the next!');
      this.resetCurrentMusic();
    }, 1000)
  }

  // Save Newly Created Album
  saveMusicCollect = async () => {
    const date = new Date();
    this.musicCollectList.push({
      name:this.musicCollectName,
      time:`${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
      id:new Date().getTime()
    });
    AsyncStorage.setItem('musicCollectList', JSON.stringify(this.musicCollectList),function (error) {
      if(error){
        console.log(error)
      }
      console.log('Saved Successfully');
    });
  };

  handleGetSelectedMusic(navigation){
    this.selectedSongsList = this.songsList.filter(song => song.isCheck);
    if(!this.selectedSongsList.length){
      console.log('You did not select a song!');
      return
    }
    navigation.push('chooseMusicCollect',{screenKey:navigation.state.key})
  }

  handleSelectedAllMusic(){
    this.songsList = this.songsList.map(item =>{
      return {
        ...item,
        isCheck:true
      }
    })
  }

  handleSelectedOtherMusic(){
    this.songsList = this.songsList.map(item =>{
      return {
        ...item,
        isCheck:!item.isCheck
      }
    })
  }

  // 音乐集里删除音乐
  handleDelMusic(music){
    const obj = this.musicCollectList.find(item => item.id === this.currentMusicColelct.id);
    obj.songsList = obj.songsList.filter(item => item.id !== music.id);
    this.songsList = obj.songsList;
    AsyncStorage.setItem('musicCollectList', JSON.stringify(this.musicCollectList),function (error) {
      if(error){
        console.log(error)
      }
      console.log('Save Successfully');
    });
  }

  // 保存到某个歌集
  handleSaveToMusicCollect = async (item,navigation) => {
    try{
      const obj = this.musicCollectList.find(detail => detail.id === item.id);
      const arr = obj.songsList || [];
      // const selectedSongsList = this.songsList.filter(song => song.isCheck);
      const songsList = [];
      this.selectedSongsList.forEach(music => {
        if(arr.some(song => song.id === music.id)){
          return
        }
        songsList.push(music)
      });
      obj.songsList = songsList;
      AsyncStorage.setItem('musicCollectList',JSON.stringify(this.musicCollectList));
      console.log('Save Successfully');
      navigation.goBack(navigation.getParam('screenKey'));
    }catch (e) {
      console.log(e);
    }

  }


}


const store = new Store();
export default store;
