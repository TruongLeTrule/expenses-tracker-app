import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
const CustomBudgetButton = ({onPress, title, icon}) => {
    return(
        <TouchableOpacity
              className="flex-row justify-between items-center mt-4 pt-4 border-t border-grey-text"
              onPress={onPress}
            >
              <View className="flex-row items-center gap-4">
                <View className=" h-12 w-12 flex items-center justify-center">
                  <Ionicons name={icon} size={27} />
                </View>
                <Text className="text-lg font-normal">{title}</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={27}
                color={"#6d6d6d"}
              />
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