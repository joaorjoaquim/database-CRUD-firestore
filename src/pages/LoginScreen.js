import React, { useState, useEffect} from "react";
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({navigation}){

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x: 220, y: 200}))
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', KeyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', KeyboardDidHide)
    
    Animated.parallel([
      Animated.spring(offset.y,{
        toValue: 0,
        speed: 4,
        useNativeDriver: true,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })

    ]).start()
    
  },[])

  function KeyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 150,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(logo.y,{
        toValue: 130,
        duration: 150,
        useNativeDriver: false
      })
    ]).start()
  }

  function KeyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 220,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(logo.y,{
        toValue: 200,
        duration: 150,
        useNativeDriver: false
      })
    ]).start()
  }

  function handleLogin(){
    const storeData = async (x) => {
        try {
          await AsyncStorage.setItem('auth', `${user}:${password}`);
          navigation.replace("Home")
        } catch (e) {
          // saving error
        }
      }
      storeData()
  }

  return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('../assets/techlogo.png')}
        />
      </View>

      <Animated.View style={[
        styles.containerForm,
        {
          opacity: opacity,
          transform: [{
            translateY: offset.y
          }]
        }
        ]}>
        <TextInput
        style={styles.input}
        placeholder="Username"
        autoCorrect={false}
        onChangeText={(valor) => {setUser(valor)}}
        />
        <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(valor) => {setPassword(valor)}}
        />
        <TouchableOpacity 
        style={styles.btnSubmit}
        onPress={() => handleLogin()}
        >
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#5e678f'
  },
  containerLogo:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',   
  },
  containerForm:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 30
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit:{
    backgroundColor: '#949a8e',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop: 10
  },
  registerText:{
    color: '#FFF'
  }
});