import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "../template";
import * as Progress from 'react-native-progress';

const Budgets = ({name, value, category, onPress, progress, color, unfilledColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.info}>   
                <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
                    <Ionicons name={icons[category]} size={27}/>
                </View>
                <View>   
                    <View style={styles.header}>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={[styles.text, {color: color}]}>{value}đ</Text>
                    </View>
                    <Progress.Bar progress={progress} width={300} height={7} color='#4cb050' unfilledColor={unfilledColor} borderColor="white"/>
                </View>
            </View>      
        </TouchableOpacity>       
    );
}

export default Budgets;

const styles = StyleSheet.create({
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
        fontWeight: "bold",
        color: "black",
    },
});