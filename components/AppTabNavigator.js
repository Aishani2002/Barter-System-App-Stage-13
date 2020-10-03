import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ItemShareScreen from '../screens/ItemShareScreen';
import ItemRequestScreen from '../screens/ItemRequestScreen';



export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks : {
    screen: ItemShareScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/trade-item.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Trade Items",
    }
  },
  BookRequest: {
    screen: ItemRequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/add-item.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Item Request",
    }
  }
});
