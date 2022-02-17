import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from "react-native";

const Preload = ({navigation}) => {

    React.useEffect ( () => {

        AsyncStorage.getItem('auth').then( res => {

            if (res != null){
                navigation.replace("Home")
            }else{
                navigation.replace("Login")
            }
        })
    }, [])
    return (
        <View>
            <Text>
                App João
            </Text>
        </View>
    )
}

export default Preload