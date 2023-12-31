import {View, StyleSheet, TextInput, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
export default function BottomSheetTextInput({placeholder,value,onChangeText, link, keyboardType}) {
  return(
    <View className="flex-row items-center gap-4">
        <View className="rounded-full h-12 w-12 flex items-center justify-center mb-6">
            <Ionicons name="person" size={30} color="black" />
        </View>
        <View>
            <TextInput
                className="text-lg font-normal flex-1"
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"black"}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                numberOfLines={1}
            />
            <View style={styles.line} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    name:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
        width: 30,
        height: 30,
    },
    titleContainer:{
        marginLeft: 10,
    },
    title:{
        flex:1,
        fontSize: 20,
        color: "black",
        marginTop: 10,
    },
    line:{
        height: 1,
        width: 364,
        backgroundColor: '#848484',
        marginVertical: 12,
        right: 64
    },
});
