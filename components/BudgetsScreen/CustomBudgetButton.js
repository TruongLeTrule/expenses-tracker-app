import {View, Text, StyleSheet, TouchableOpacity,Image,TextInput,Button, Alert,Modal} from "react-native";
import React,{useState} from "react";
const CustomBudgetButton = ({onPress, title,icon}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Image style={styles.image} source={{uri:icon}}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.line}/>
            </View>
        </TouchableOpacity>
    )
}
export default CustomBudgetButton;

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
    },
    title:{
        fontSize: 20,
        color: "gray",
        marginTop: 10,
    },
    titleContainer:{
        marginLeft: 10,
    },
    line:{
        height: 1,
        width: 350,
        backgroundColor: '#ccc',
        marginVertical: 12,
        
    },
    image:{
        width: 30,
        height: 30,
    }

})