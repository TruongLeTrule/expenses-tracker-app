import {View, Text, StyleSheet} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { icons, titles } from "../template";
import * as Progress from 'react-native-progress';

const Budgets = ({name, amount, time, wallet, category}) => {
    return (
        <View style={styles.container}>
            <View style={styles.box} >
                <View>
                    <Text style={styles.text}>{time}</Text>
                    <View style={styles.line}/>
                </View>
                <View style={styles.info}>
                    <Ionicons name={icons[category]} size={27} style={styles.icon} />
                    <View style={styles.bar}>   
                        <View style={styles.header}>
                            <Text style={styles.text}>{name}</Text>
                            <Text style={[styles.text, {color:'#4cb050'}]}>đ{amount}</Text>
                        </View>
                        <Progress.Bar progress={0.5} width={300} height={5} color="#4cb050"/>
                    </View>
                </View>  
            </View>
        </View>
        
    );
}

export default Budgets;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    box:{
        marginVertical: 5,
        borderWidth: 0.2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    icon:{
        left: 10,
    },
    info:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    line:{
        borderWidth: 0.2,
        backgroundColor: "#f2f2f2",
        marginVertical: 5,
        width: "100%",
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    bar:{
        flexDirection: "column",
        alignSelf: "flex-end",

    },
    text:{
        fontSize: 15,
        color: "black",
    },
});