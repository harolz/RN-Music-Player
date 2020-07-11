import React, {Component} from 'react';
import {
  View,
  Text, TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import {Icon} from "react-native-elements";


function TouchableButton({onPress, iconName, buttonName}) {
  return (
    <View>
    <TouchableNativeFeedback>
      <View style={styles.ms_icon_warp}>
        <View>
          <Icon
            type="entypo"
            size={40}
            color="rgba(0,0,0,.1)"
            name={iconName}
            onPress={onPress}
          />
        </View>
        {
          buttonName && <View>
            <Text style={styles.ms_controll_text} onPress={onPress}>{buttonName}</Text>
          </View>
        }
      </View>
    </TouchableNativeFeedback>
    </View>
  )
}


export default TouchableButton;

const styles = StyleSheet.create({
  ms_icon_warp: {
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ms_controll_text: {
    paddingLeft: 10
  }
});
