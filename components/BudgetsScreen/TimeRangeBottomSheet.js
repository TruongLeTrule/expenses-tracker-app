import {View, Text, StyleSheet} from "react-native";
import React,{useContext} from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import CustomBudgetButton from "./CustomBudgetButton";
import useStore from "../../data/useStore";
const TimeRangeBottomSheet = ({onPress}) => {
    const budgetTime = useStore((state) => state.budgetTime);
    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <View style={styles.titleHeader}>
                        <Ionicon name="chevron-down-outline" size={30} color="#4cb050" onPress={() => onPress(budgetTime)}/>
                        <Text style={styles.titleText}>Time Range</Text>
                </View>
                <View style={styles.content} >
                    <CustomBudgetButton title="Weekly" onPress={() => onPress("Weekly")} />
                    <CustomBudgetButton title="Monthly" onPress={() => onPress("Monthly")} />
                    <CustomBudgetButton title="Quarterly" onPress={() => onPress("Quarterly")} />
                    <CustomBudgetButton title="Half Yearly" onPress={() => onPress("Half Yearly")} />
                    <CustomBudgetButton title="Yearly" onPress={() => onPress("Yearly")} />
                </View>
            </View>
        </View>
    );
}
export default TimeRangeBottomSheet;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
        
    },
    detailContainer:{
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 450,
    },
    titleHeader: {
        flexDirection: "row",
        margin:10
    },
    titleText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginLeft: 100,
    },
    content:{
        margin: 10,
    },
});