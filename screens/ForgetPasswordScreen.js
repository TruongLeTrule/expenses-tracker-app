import React from 'react'
import { useState } from "react";
import { auth } from '../firebase';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";

function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("")

  const handleReset = () => {
    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Please check your email to recover password")
        navigation.navigate("LoginScreen")
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/000/287/227/original/wallet-vector-icon.jpg",
        }}
      />
      <Text style={styles.text}>Password Recovery</Text>
      {/* Input group */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.37SXOl1HMjafsfpow_NjhwHaFS?pid=ImgDet&rs=1",
            }}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>

      {/* Submit btn */}
      <TouchableOpacity
        onPress={handleReset}
        style={styles.LogInButton}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >
          RESET PASSWORD
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgetPassword


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green",
  },
  Image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textinput: {
    flex: 1,
    textAlignVertical: "top",
    width: "75%",
    height: "100%",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  },
  LogInButton: {
    width: "75%",
    height: 45,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'darkgreen',
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15
  },
  iconStyle: {
    height: 25,
    width: 35,
    padding: 10,
    margin: 10,
    resizeMode: "stretch",
    alignItems: "center",
  },
  sectionStyle: {
    marginLeft: 50,
    marginRight: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
