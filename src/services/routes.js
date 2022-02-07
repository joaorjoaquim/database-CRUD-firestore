import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, Feather} from '@expo/vector-icons';
import HomeScreen from '../pages/HomeScreen';
import RouteScreen from '../pages/RouteScreen';
import SettingScreen from '../pages/SettingScreen';
import ProfileScreen from '../pages/ProfileScreen';
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
            style={{ width: 35, height: 30 }}
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
            tabBarInactiveTintColor: '#121212',
            headerStyle: {
                height: 60,
                backgroundColor: '#121212'
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
            tabBarActiveTintColor: '#c9e0f2',
            tabBarInactiveTintColor: '#FFF',
            tabBarStyle: {
                paddingBottom: 5, 
                paddingTop: 5,
                backgroundColor: '#121212'
            },         
        }}
        
    >
        <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="database" size={size} color={color} />
            ),
            title: 'Firebase'
        }}
        />
        
        <Tab.Screen 
        name="Route" 
        component={RouteScreen} 
        options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="rocket" size={size} color={color} />
            )
        }}
        />
        
        <Tab.Screen 
        name="Setting" 
        component={SettingScreen} 
        options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="star" size={size} color={color} />
            )
        }}
        />
        
        <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
            tabBarIcon: ({size, color}) => (
                <Entypo name="time-slot" size={size} color={color} />
            )
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