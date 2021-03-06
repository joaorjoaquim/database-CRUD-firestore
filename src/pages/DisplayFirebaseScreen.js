import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';
import database from '../services/firebaseConfig';
import CustomModal from "../components/CustomModal";
import { RootContext } from '../services/RootProvider';

export default function DisplayFirebaseScreen (){
  const {taskList, setTaskList} = useContext(RootContext);
  const [detailsInfo, setDetailsInfo] = useState();
  const [modalOption, setModalOption] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  useEffect( () => {
      database.db.collection("Tasks").get()
          .then((querySnapshot) =>{
              let list = []
              querySnapshot.forEach(onSnapshot => {
                  let data = onSnapshot.data();
                  list.push({...data, id: onSnapshot.id}) //dados + document id
              })
              setTaskList(list);
          })
  }, []);

  const updateModalInfo = (option, title, buttonText, details = null) => {
      setDetailsInfo(details);
      setModalOption(option);
      setModalTitle(title);
      setModalButtonText(buttonText);
      setModalInfoVisible(true);
  };

    function deleteTask(details) {
        database.db.collection("Tasks").doc(details.id).delete();
        const tmpList = taskList.filter(ele => ele.id !== details.id)
        setTaskList(tmpList)
    }

    function editTask(details){
        database.db.collection("Tasks").doc(details.id).update(details)
        const tmpList = taskList.map(ele => ele.id === details.id ? details : ele)
        setTaskList(tmpList)
    }

  return (
      <View>
          <CustomModal option={modalOption} title={modalTitle} buttonText={modalButtonText} visibility={modalInfoVisible} setVisible={setModalInfoVisible} detailsInfo={detailsInfo} editTask={editTask} deleteTask={deleteTask}/>
          <FlatList
              data={taskList}
              keyExtractor={item => taskList.indexOf(item)}
              renderItem={({item}) => (
                  <View style={{flexDirection:'row', height:80, borderBottomColor:'#323ca8', borderBottomWidth:2 ,marginVertical: 5, marginBottom: 5}}>
                    <View style={{width:'20%', flexDirection:'column', padding: 5, justifyContent:'space-between', alignItems:'center'}}>
                      <TouchableOpacity onPress={() => updateModalInfo(1, "Detalhes", "Ok", item)}>
                      <Entypo name="text-document" size={18} color="#323ca8"/>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => updateModalInfo(2, "Editar informa????es", "Salvar", item)}>
                      <Entypo name="edit" size={18} color="#323ca8"/>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => updateModalInfo(3, "Voc?? quer deletar?", "Sim", item)}>
                      <AntDesign name="delete" size={18} color="#cc1d25"/>
                      </TouchableOpacity>
                    </View>

                    <View style={{width: '80%', flexDirection:'column', marginVertical: 1, marginBottom:10, alignItems:'flex-start', justifyContent:'center', borderLeftWidth:1, paddingLeft: 10}}>
                    <Text>Prestador do Servi??o: {item.username}</Text>
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
