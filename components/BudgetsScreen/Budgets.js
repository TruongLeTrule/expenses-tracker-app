import {View, Text, StyleSheet} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "../template";
import * as Progress from 'react-native-progress';

const Budgets = ({name, value, category}) => {
    return (
        <View style={styles.info}>   
            <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
                <Ionicons name={icons[category]} size={27}/>
            </View>
            <View>   
                <View style={styles.header}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={[styles.text, {color:'#4cb050'}]}>đ{value}</Text>
                </View>
                <Progress.Bar progress={0.1} width={300} height={5} color="#4cb050"/>
            </View>
        </View>             
    );
}

export default Budgets;

const styles = StyleSheet.create({

    icon:{
        color: "#4cb050",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    info:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    text:{
        fontSize: 15,
        color: "black",
    },
});