import React from 'react';
import {Provider} from 'mobx-react';
import MainStackNavigator from './navigation/MainStackNavigator';
import store from './store';


export default function App() {
  return(  
  <Provider store={store}>
    <MainStackNavigator />
  </Provider>)
}