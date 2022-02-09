import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window'); //pega dimensoes na tela e joga para uma variavel
import { Entypo, Feather} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Select } from 'native-base';
import Axios from 'axios';
import database from '../services/firebaseConfig'

export default function AddFirebaseScreen (){
  
    useEffect( () => {
      
  }, []);


  let [language, setLanguage] = React.useState("");
  const carouselRef = useRef(null);

  const [user, setUser] = useState('');
  const [codigo, setCodigo] = useState(null);
  const [date, setDate] = useState('');
  const [cep, setCep] = useState(null);
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState(null);
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [descricao, setDescricao] = useState('');

  buscarCep = () => {
    console.log(cep)
    Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        console.log(response.data.logradouro)
        setLogradouro(response.data.logradouro)
        setComplemento(response.data.complemento)
        setBairro(response.data.bairro)
        setCidade(response.data.localidade)
        setEstado(response.data.uf)

      })
      .catch(error => {
        return console.log(error);
      })
  }

  function addTask(){
    database.collection('Tasks').add({
      username: user,
      numero: numero,
      logradouro: logradouro,
      estado: estado,
      descricao: descricao,
      date: date,
      complemento: complemento,
      codigo: codigo,
      cidade: cidade,
      cep: cep,
      bairro: bairro
    })
    console.log('adicionou')
    Alert.alert('Adicionado');
    setUser('');
    setCodigo(null);
    setDate('');
    setCep(null);
    setLogradouro('');
    setNumero(null);
    setComplemento('');
    setBairro('');
    setCidade('');
    setEstado('');
    setDescricao('');
  }

    return (
        <ScrollView style={styles.container}>  
          <View style={styles.input}>         
            <Entypo name="user" size={25} color="#323ca8" />
            <TextInput
              style={{paddingLeft:15}}
              placeholder="Nome completo do prestador de serviço"
              secureTextEntry={false}
              autoCorrect={false}
              onChangeText={(value) => setUser(value)}
              value={user}
              
            />
          </View>
          <View style={styles.input}>         
            <Entypo name="mail" size={25} color="#323ca8"/>
            <TextInput
              style={{paddingLeft:15}}
              placeholder="Código do serviço"
              maxLength={10}
              secureTextEntry={false}
              autoCorrect={false}
              keyboardType='numeric'
              onChangeText={(value) => setCodigo(value)}
              value={codigo}
            />
          </View>

          <View style={styles.input}>         
            <Entypo name="calendar" size={25} color="#323ca8"/>
            <TextInput
              style={{paddingLeft:15}}
              placeholder="Data de Agendamento"
              secureTextEntry={false}
              autoCorrect={false}
              autoComplete="birthdate-full"
              onChangeText={(value) => setDate(value)}
              value={date}
            />
          </View>
         
        <View style={{borderWidth:2, width:'90%', flex:1, alignSelf:'center', marginVertical:10, borderRadius:7, borderColor: '#323ca8'}}>
        <View style={{flexDirection:'row', backgroundColor:'#323ca8', paddingLeft:10, alignItems:'center'}}>
        <Entypo name="location" size={20} color='#FFF'/>
        <Text style={{padding: 3, paddingLeft:10, backgroundColor:'#323ca8', color:'#fff', fontSize:18}}>Endereço do Serviço</Text>
        </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              placeholder="CEP"
              onChangeText={(value) => setCep(value)}
              onBlur={buscarCep}
              value={cep}
              secureTextEntry={false}
              autoCorrect={false}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              placeholder="Logradouro"
              secureTextEntry={false}
              autoCorrect={false} 
              value={logradouro}
            />
          </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              onChangeText={(value) => setNumero(value)}
              placeholder="Número"
              secureTextEntry={false}
              autoCorrect={false}
              keyboardType="numeric"
              value={numero}
            />
          </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              onChangeText={(value) => setComplemento(value)}
              placeholder="Complemento"
              secureTextEntry={false}
              autoCorrect={false} 
              value={complemento}
            />
          </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              placeholder="Bairro"
              secureTextEntry={false}
              autoCorrect={false} 
              value={bairro}
            />
          </View>
          <View style={styles.inputLocation}>         
            <TextInput
              style={{paddingLeft:1}}
              placeholder="Cidade"
              secureTextEntry={false}
              autoCorrect={false} 
              value={cidade}
            />
          </View>

          <View style={styles.inputSelect}>
            <RNPickerSelect
                onValueChange={(value) => setEstado(value)}
                placeholder={{
                  label: 'Selecione um estado',
                  value: 'SC',
                  color: '#000'
                }}
                items={[
                    { label: 'Acre', value: 'AC' },
                    { label: 'Bahia', value: 'BA' },
                    { label: 'Goiás', value: 'GO' },
                    { label: 'Minas Gerais', value: 'MG' },
                    { label: 'Rio de Janeiro', value: 'RJ' },
                    { label: 'Santa Catarina', value: 'SC' },
                    { label: 'Rio Grande do Sul', value: 'RS' },
                ]}
                value={estado}
            />
          </View>

        </View>        


          <View style={styles.input}>         
            <Entypo name="v-card" size={25} color="#323ca8"/>
            <TextInput
              style={{paddingLeft:15}}
              placeholder="Descrição do Serviço"
              secureTextEntry={false}
              autoCorrect={false}
              onChangeText={(value) => setDescricao(value)}
              value={descricao}
            />
          </View>

          <TouchableOpacity 
          style={styles.btnRegister}
          onPress={() => addTask()}
          >
          <Text style={styles.registerText}>Cadastrar Serviço</Text>
          </TouchableOpacity>        

        </ScrollView>
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
         borderBottomWidth: 2,
         marginHorizontal: 20,
         marginTop: 10,
         borderRadius: 10,
         borderColor: '#323ca8'
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
        borderColor: '#323ca8'
      },
       inputSelect:{
        width: '90%',
        fontSize: 17,
        borderWidth: 2,
        marginHorizontal: 20,
        marginBottom:5,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#323ca8'
       },
       btnRegister:{
        backgroundColor: '#323ca8',
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
       registerText:{
        color: '#FFF',
        fontSize: 17
      }    
     });