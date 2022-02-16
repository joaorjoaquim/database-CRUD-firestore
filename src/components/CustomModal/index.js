import {Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import database from '../../services/firebaseConfig';

const ShowEditInfo = ({details, editDetails, dicionario}) => {
    var listText = [];
    details && Object.entries(dicionario).forEach(([key, value])=>{
        listText.push(
            <View key={key} style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.modalText}>{`${value}: `}</Text>
                <View style={{borderBottomWidth: 2, borderBottomColor: '#323ca8', flex: 1}}>   
                    <TextInput
                        style={{paddingLeft:5}}
                        onChangeText={(val) => editDetails(key, val, details)}
                        value={details[key].toString()}
                    />
                </View> 
            </View>
        )
    })
    return listText
}

const CustomModal = ({option, title, buttonText, visibility, setVisible, detailsInfo, editTask, deleteTask}) => {

    const [details, setDetails] = useState();

    useEffect(()=>{
        setDetails(detailsInfo)
    },[detailsInfo])

    const editDetails = (key, value, detail) => {
        const tmpDetails = JSON.parse(JSON.stringify(detail));
        tmpDetails[key] = value
        setDetails(tmpDetails)
    }
    
    const dicionario = {
        "username": "Prestador de Serviço",
        "codigo": "Código do Serviço",
        "date": "Data", 
        "cep": "CEP", 
        "logradouro": "Logradouro",
        "numero": "Número",
        "complemento": "Complemento",
        "bairro": "Bairro",
        "cidade": "Cidade",
        "estado": "Estado",
        "descricao": "Descrição do Serviço"
    };

    const ShowDetailsInfo = () => {
        var listText = [];
        Object.entries(dicionario).forEach(([key, value])=>{
            listText.push(<Text key={key} style={styles.modalText}>{`${value}: ${detailsInfo[key]}`}</Text>)
        })
        return listText
    }

    return(
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={visibility}
            onRequestClose={() => {
                Alert.alert("Ok, de volta ao Display");
                setVisible(!visibility);
            }}
        >
            <ScrollView>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        {detailsInfo && 
                            <View style={styles.modalText}>
                                { option === 2 ? <ShowEditInfo details={details ? details : detailsInfo} editDetails={editDetails} dicionario={dicionario}/> : <ShowDetailsInfo/> }
                                <View style={[{flexDirection:'row'}, option === 3 ? {justifyContent:'space-between'} : {alignSelf:'center'}]}>
                                    {option === 3 && (
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setVisible(!visibility)}>
                                            <Text style={styles.textStyle}>Não</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            if(option === 2){
                                                editTask(details)
                                            }else if(option === 3){
                                                deleteTask(details)
                                            }
                                            setVisible(!visibility)
                                        }}>
                                        <Text style={styles.textStyle}>{buttonText}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }                        
                    </View>
                </View>
            </ScrollView>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalText: {
        marginBottom: 2,
        textAlign: "center",
        fontSize: 15,
        fontWeight:'normal',
        alignItems:'flex-start'
    },
    modalTitle: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 18,
        fontWeight:'bold'
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
        width:130,
        marginTop:10,
        justifyContent:'center',
        alignSelf:'center'
    },
    buttonClose: {
        backgroundColor: "#323ca8",
        width: 130,
        marginTop:10,
        justifyContent:'center',
        alignSelf:'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default CustomModal
