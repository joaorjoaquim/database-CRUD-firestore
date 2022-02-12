import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, Feather} from '@expo/vector-icons';
import AddFirebaseScreen from '../pages/AddFirebaseScreen';
import DisplayFirebaseScreen from '../pages/DisplayFirebaseScreen';
import LoginScreen from '../pages/LoginScreen';
import Preload from './preload'
import { TouchableOpacity, Image, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomRoutes = ({navigation}) => {
    
    function LogoTitle() {
        return (
          <Image
            style={{ width: 30, height: 25 }}
            source={require('../assets/techlogo.png')}
          />
        );
    }

    async function handleLogout(){      
        AsyncStorage.removeItem('auth').then( res => {
            console.log(res)
            if (res != null){
                navigation.replace("Home")
            }else{
                navigation.replace("Login")
            }
        })
        const jsonValue = await AsyncStorage.getItem('auth')  
        console.log(jsonValue)
    }
  
    
    React.useEffect( () => {
        navigation.setOptions({
            headerShown: true,
            borderTopColor: 'transparent',
            tabBarInactiveTintColor: '#c1c7d9',
            headerStyle: {
                height: 60,
                backgroundColor: '#c1c7d9',
                
            },
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => handleLogout()}
                    style={{paddingRight:10, paddingBottom: 5}}
                >
                    <Entypo name="log-out" size={20} color="#FFF" />

                </TouchableOpacity>
            ),
        })
    }, []);
    
    return(
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
    )
}

export default function Routes (){

        
//alterar initial para Preload depois
    return(
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Preload" 
                >
                <Stack.Screen
                    name="Preload"
                    component={Preload}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="Home"
                    component={BottomRoutes}
                    options={{
                        headerShown: false
                    }}
                    
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}