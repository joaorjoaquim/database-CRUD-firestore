import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel'; //tem que instalar o repositorio snap carousel no servidor
import OutlineInput from 'react-native-outline-input';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
const {width: screenWidth, height: screenHeight} = Dimensions.get('window'); //pega dimensoes na tela e joga para uma variavel
import { Entypo, Feather} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Select } from 'native-base';
import database from '../services/firebaseConfig'


export default function DisplayFirebaseScreen (){
  const [task, setTask] = useState([]);

  useEffect( () => {
      database.collection("Tasks").get()
          .then((querySnapshot) =>{
              let list = []
              querySnapshot.forEach(onSnapshot => {
                  let data = onSnapshot.data();
                  list.push(data)
              })
              setTask(list);
          })
  }, []);

  return (
      <View>
          <FlatList
              data={task}
              keyExtractor={(item, key) => `${key}`}
              renderItem={({item}) => (
                  <View style={{flexDirection:'row', height:80, borderBottomColor:'#323ca8', borderBottomWidth:2 ,marginVertical: 5, marginBottom: 5}}>
                    <View style={{width:'20%', flexDirection:'column', padding: 5, justifyContent:'center', alignItems:'center'}}>
                      <TouchableOpacity>
                        <Text>Detalhes</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity>
                        <Text>Editar</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity>
                        <Text>Excluir</Text>
                      </TouchableOpacity>
                      
                    </View>

                    <View style={{width: '80%', flexDirection:'column', marginVertical: 1, marginBottom:10, alignItems:'flex-start', justifyContent:'center', borderLeftWidth:1, paddingLeft: 10}}>
                    <Text>Prestador do Serviço: {item.username}</Text>
                    <Text>Codigo: {item.codigo}</Text>
                    <Text>Data: {item.date}</Text>
                    <Text>Cidade: {item.cidade}</Text>
                    </View>  
                  </View>
                  
              )}
          />
      </View>
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