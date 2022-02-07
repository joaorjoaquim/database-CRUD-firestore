import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel'; //tem que instalar o repositorio snap carousel no servidor
import MapView from 'react-native-maps';
import * as Location from 'expo-location'

import Icon from 'react-native-vector-icons/MaterialIcons'; 
const {width: screenWidth, height: screenHeight} = Dimensions.get('window'); //pega dimensoes na tela e joga para uma variavel


export default function RouteScreen (){
  
    const [location, setLocation] = useState(null)

    useEffect( () => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
  }, []);


  
  const carouselRef = useRef(null);

    

    return (
        <View style={styles.container}>  
            <MapView style={{ width:'100%', height:'100%'}}
              initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
              }}
              showsUserLocation
              loadingEnabled
            />
            <Text>Routes</Text>
        </View>
    );
}
     
     const styles = StyleSheet.create({
       container:{
         flex:1,
       }
     });