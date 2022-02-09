import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const CustomModal = ({option, title, buttonText, visibility, setVisible, detailsInfo = null}) => {
    
    const ShowDetailsInfo = () => {
        var dicionario = {
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
        var listText = [];
        Object.entries(dicionario).forEach(([key, value])=>{
            listText.push(<Text key={key} style={styles.modalText}>{`${value}: ${detailsInfo[key]}`}</Text>)
        })
        return listText
    }

    const ShowEditInfo = () => {
        var dicionario = {
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
        var listText = [];
        Object.entries(dicionario).forEach(([key, value])=>{
            listText.push(
                <Text key={key} style={styles.modalText}>{`${value}: ${detailsInfo[key]}`}</Text>
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
                Alert.alert("Modal has been closed.");
                setVisible(!visibility);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    {detailsInfo && (
                        <View style={styles.modalText}>
                            <ShowDetailsInfo/>
                        </View>
                    )}
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setVisible(!visibility)}
                    >
                        <Text style={styles.textStyle}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginTop:10
    },
    buttonClose: {
        backgroundColor: "#323ca8",
        width: 130,
        marginTop:10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default CustomModal
