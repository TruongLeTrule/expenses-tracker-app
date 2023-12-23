import {View, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';
export default function BottomSheetTextInput({placeholder,value,onChangeText, link, keyboardType}) {
  return(
    <View style={styles.name}>
        <Image style={styles.image} source={{ uri: link }} />
        <View style={styles.titleContainer}>
            <TextInput
                style={styles.title}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
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
        fontSize: 20,
        color: "gray",
        marginTop: 10,
    },
    line:{
        height: 1,
        width: 350,
        backgroundColor: '#ccc',
        marginVertical: 12,
    },
});