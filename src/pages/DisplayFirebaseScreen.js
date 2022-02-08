import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel'; //tem que instalar o repositorio snap carousel no servidor
import OutlineInput from 'react-native-outline-input';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
const {width: screenWidth, height: screenHeight} = Dimensions.get('window'); //pega dimensoes na tela e joga para uma variavel
import { Entypo, AntDesign, Feather} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Select } from 'native-base';
import database from '../services/firebaseConfig'


export default function DisplayFirebaseScreen (){
  const [task, setTask] = useState([]);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleOnSelectItem = (item) => {
    setSelectedItem(item);
    setModalInfoVisible(true);
  };
  const handleOnCloseModal = () => {
    setSelectedItem(false);
  };

  const createList = (item) => {
    const vet = ["Prestador de Serviço", "Código do Serviço", "Data", "CEP", "Logradouro", "Número", "Complemento", "Bairro", "Cidade", "Estado", "Descrição do Serviço"]
    var listText = [];
    vet.forEach(ele=>{
      listText.push(
        <Text style={styles.modalText}>`${ele}: `</Text>
      )
    })
  };

  return (
      <View>
          <FlatList
              data={task}
              keyExtractor={(item, key) => `${key}`}
              renderItem={({item}) => (
                  <View style={{flexDirection:'row', height:80, borderBottomColor:'#323ca8', borderBottomWidth:2 ,marginVertical: 5, marginBottom: 5}}>
                 
                    <View style={{width:'20%', flexDirection:'column', padding: 5, justifyContent:'space-between', alignItems:'center'}}>
                      <TouchableOpacity onPress={() => setModalInfoVisible(true)}>
                      <Entypo name="text-document" size={18} color="#323ca8"/>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress={() => setModalEditVisible(true)}>
                      <Entypo name="edit" size={18} color="#323ca8"/>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
                      <AntDesign name="delete" size={18} color="#cc1d25"/>
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
          {/* Modal do Detalhes - Component novo*/}
          <CustomModal isVisible={modalInfoVisible} selectedItem={selectedItem} onClose={handleOnCloseModal} />
      </View>
  );
}
 {/* COMPONENT DO MODAL CUSTOMIZADO*/} 
export function CustomModal(props) {
  const { isVisible, item, onClose,  /*...*/ } = props;
  const [modalInfoVisible, setModalInfoVisible] = useState(props.isVisible);
  
  return (
    <Modal visible={modalInfoVisible} onRequestClose={onClose} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <View style={{alignItems:'flex-start'}}>
                            <Text style={styles.modalText}>Prestador de Serviço: {item}</Text>
                            <Text style={styles.modalText}>Código do Serviço: </Text>
                            <Text style={styles.modalText}>Data: </Text>
                            <Text style={styles.modalText}>CEP: </Text>
                            <Text style={styles.modalText}>Logradouro: </Text>
                            <Text style={styles.modalText}>Número: </Text>
                            <Text style={styles.modalText}>Complemento: </Text>
                            <Text style={styles.modalText}>Bairro: </Text>
                            <Text style={styles.modalText}>Cidade: </Text>
                            <Text style={styles.modalText}>Estado: </Text>
                            <Text style={styles.modalText}>Descrição do Serviço: </Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalInfoVisible(!modalInfoVisible)}
                          >
                            <Text style={styles.textStyle}>Fechar</Text>
                          </TouchableOpacity>
                        </View>
        </View>
    </Modal>
    ); // Render things inside the data
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
       centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:130
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#323ca8",
        width: 130
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }  
     });