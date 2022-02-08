import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const CustomModal = ({title, buttonText, visibility, setVisible, detailsInfo = null}) => {
    const ShowDetailsInfo = () => {
        var listText = [];
        Object.entries(detailsInfo).forEach(([key, value])=>{
            listText.push(<Text key={key} style={styles.modalText}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Text>)
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
                    <Text style={styles.modalText}>{title}</Text>
                    {detailsInfo && (
                        <View style={{alignItems:'flex-start'}}>
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
        marginBottom: 15,
        textAlign: "center"
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
        width:130
    },
    buttonClose: {
        backgroundColor: "#323ca8",
        width: 130
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default CustomModal
