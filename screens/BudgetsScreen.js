import { View, Text, StyleSheet,Alert,TouchableOpacity } from "react-native";
import React from "react";


export default function BudgetsScreen() {
  return (
    <View className="justify-center">
      <View style={styles.header}>
        <Text style={styles.text}>Budgets</Text>
      </View>
      <View style={styles.content} >
        <Text>Content</Text>
      </View>
      <TouchableOpacity 
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}
          >
        <Text style={styles.text}>Add Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4cb050",
    height: 50,
  },
  content:{
    backgroundColor: "#fff",
    height: 50,
  },
  button:{
    marginTop: 50,
    backgroundColor: "#4cb050",
    height: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  }
});
