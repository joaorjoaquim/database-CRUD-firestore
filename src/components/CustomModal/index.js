import {Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import database from '../../services/firebaseConfig';

const CustomModal = ({option, title, buttonText, visibility, setVisible, detailsInfo = null}) => {

    const [details, setDetails] = useState(detailsInfo);

    const [userEdit, setUserEdit] = useState('');
    const [codigoEdit, setCodigoEdit] = useState(null);
    const [dateEdit, setDateEdit] = useState(null);
    const [cepEdit, setCepEdit] = useState(null);
    const [logradouroEdit, setLogradouroEdit] = useState('');
    const [numeroEdit, setNumeroEdit] = useState(null);
    const [complementoEdit, setComplementoEdit] = useState('');
    const [bairroEdit, setBairroEdit] = useState('');
    const [cidadeEdit, setCidadeEdit] = useState('');
    const [estadoEdit, setEstadoEdit] = useState('');
    const [descricaoEdit, setDescricaoEdit] = useState('');

    useEffect( () => {
        setDetails(detailsInfo)
    }, []);

    const editDetails = (key, value) => {
        const tmpDetails = details
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

    function deleteTask(id) {
        console.log(id)
        database.db.collection("Tasks").doc(id).delete(); //testar comando aindarr
        setVisible(!visibility)
      }

    function editTask(id){
        database.db.collection("Tasks").doc(id).update({
            username: userEdit,
            numero: numeroEdit,
            logradouro: logradouroEdit,
            estado: estadoEdit,
            descricao: descricaoEdit,
            date: dateEdit,
            complemento: complementoEdit,
            codigo: codigoEdit,
            cidade: cidadeEdit,
            cep: cepEdit,
            bairro: bairroEdit
        })
    }

    const ShowDetailsInfo = () => {
        
        var listText = [];
        Object.entries(dicionario).forEach(([key, value])=>{
            listText.push(<Text key={key} style={styles.modalText}>{`${value}: ${detailsInfo[key]}`}</Text>)
        })
        return listText
    }

    const ShowEditInfo = () => {
        console.log(details)

        var listText = [];
        Object.entries(dicionario).forEach(([key, value])=>{
            listText.push(
                <View key={key} style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.modalText}>{`${value}: `}</Text>
                    <View style={{borderBottomWidth: 2, borderBottomColor: '#323ca8', flex: 1}}>   
                        <TextInput
                            style={{paddingLeft:5}}
                            placeholder={value}
                            secureTextEntry={false}
                            autoCorrect={false}
                            onChangeText={(val) => editDetails(key, val)}
                            value={details[key]}
                        />
                    </View> 
                </View>
            )
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

                        {option == 1 && detailsInfo && (
                            <View style={styles.modalText}>
                                <ShowDetailsInfo/>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setVisible(!visibility)}
                                >
                                    <Text style={styles.textStyle}>{buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                            
                        )}
                        {option == 2 && detailsInfo && (
                            <View style={styles.modalText}>
                                <ShowEditInfo/>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setVisible(!visibility)}
                                >
                                    <Text style={styles.textStyle}>{buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {option == 3 && detailsInfo && (
                            <View style={styles.modalText}>
                                <ShowDetailsInfo/>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setVisible(!visibility)}
                                    >
                                        <Text style={styles.textStyle}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => deleteTask(details.id)}
                                    >
                                        <Text style={styles.textStyle}>{buttonText}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        
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
