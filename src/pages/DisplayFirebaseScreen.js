import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';
import database from '../services/firebaseConfig';
import CustomModal from "../components/CustomModal";

export default function DisplayFirebaseScreen (){
  const [task, setTask] = useState([]);
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

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

  const updateModalInfo = (title, buttonText, details = []) => {
      setDetailsInfo(details)
      setModalTitle(title);
      setModalButtonText(buttonText);
      setModalInfoVisible(true);
  };

  return (
      <View>
          <CustomModal title={modalTitle} buttonText={modalButtonText} visibility={modalInfoVisible} setVisible={setModalInfoVisible} detailsInfo={detailsInfo}/>
          <FlatList
              data={task}
              keyExtractor={(item, key) => `${key}`}
              renderItem={({item}) => (
                  <View style={{flexDirection:'row', height:80, borderBottomColor:'#323ca8', borderBottomWidth:2 ,marginVertical: 5, marginBottom: 5}}>
                    <View style={{width:'20%', flexDirection:'column', padding: 5, justifyContent:'space-between', alignItems:'center'}}>
                      <TouchableOpacity onPress={() => updateModalInfo("Detalhes", "Ok", item)}>
                      <Entypo name="text-document" size={18} color="#323ca8"/>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => updateModalInfo("Editar informações", "Salvar")}>
                      <Entypo name="edit" size={18} color="#323ca8"/>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => updateModalInfo("Você quer deletar?", "Sim")}>
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
      </View>
  );
}