import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel'; //tem que instalar o repositorio snap carousel no servidor
import OutlineInput from 'react-native-outline-input';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
const {width: screenWidth, height: screenHeight} = Dimensions.get('window'); //pega dimensoes na tela e joga para uma variavel
import { Entypo, Feather} from '@expo/vector-icons';
import { Select } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddFirebaseScreen from './AddFirebaseScreen';
import DisplayFirebaseScreen from './DisplayFirebaseScreen';

export default function HomeScreen (){
  
    useEffect( () => {
      
  }, []);

  const Tab = createBottomTabNavigator();
  let [language, setLanguage] = React.useState("");
  const carouselRef = useRef(null);

  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date())

    return (
      <Tab.Navigator
      screenOptions={{
          headerShown: false,
          borderTopColor: 'transparent',
          tabBarActiveTintColor: '#06184f',
          tabBarInactiveTintColor: '#1537a1',
          tabBarStyle: {
              paddingBottom: 5, 
              paddingTop: 5,
              backgroundColor: '#c1c7d9'
          },         
      }}
      
  >
      <Tab.Screen 
      name="AddFirebase" 
      component={AddFirebaseScreen} 
      options={{
          tabBarIcon: ({size, color}) => (
              <Entypo name="squared-plus" size={size} color={color} />
          ),
          title: 'Insert'
      }}
      />
      
      <Tab.Screen 
      name="DisplayFirebase" 
      component={DisplayFirebaseScreen} 
      options={{
          tabBarIcon: ({size, color}) => (
              <Entypo name="list" size={size} color={color} />
          ),
          title:'Display'
      }}
      />
      
  </Tab.Navigator>
    );
}
     
     const styles = StyleSheet.create({
       container:{
         flex:1,
       },
       input:{
         width: '90%',
         flexDirection:'row',
         padding: 13,
         paddingLeft: 20,
         fontSize: 17,
         borderWidth: 2,
         marginHorizontal: 20,
         marginTop: 10,
         borderRadius: 10,
       },
       inputLocation:{
        width: '90%',
        flexDirection:'row',
        padding: 13,
        paddingLeft: 20,
        fontSize: 17,
        borderBottomWidth: 2,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
      },
       inputSelect:{
        width: '90%',
        fontSize: 17,
        borderWidth: 2,
        marginHorizontal: 20,
        marginBottom:5,
        marginTop: 10,
        borderRadius: 10,
       },
       btnRegister:{
        backgroundColor: '#949a8e',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5
       },
       btnPicture:{
        backgroundColor: '#3877ff',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5
       },    
     });