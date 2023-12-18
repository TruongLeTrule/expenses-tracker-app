import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../firebase";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignIn = () => {
    if (confirmPass === regPassword) {
      auth
        .createUserWithEmailAndPassword(regEmail, regPassword)
        .then(() => {
          Alert.alert("Sign up successfully");
          navigation.navigate("LoginScreen");
        })
        .catch((error) => Alert.alert(error.message));
    } else {
      Alert.alert("Retyped password is not the same as password");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Image
          style={styles.Image}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/000/287/227/original/wallet-vector-icon.jpg",
          }}
        />
        <Text style={styles.text}>Create Account</Text>
      </View>
      {/* Input group */}
      <View style={{ marginVertical: 15 }}>
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
            value={regEmail}
            onChangeText={(text) => setRegEmail(text)}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.D8nemBhgTZk6KzU-ZSvuJAHaI6?pid=ImgDet&rs=1",
            }}
            style={[styles.iconStyle, { height: 35, width: 30 }]}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            value={regPassword}
            onChangeText={(text) => setRegPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.D8nemBhgTZk6KzU-ZSvuJAHaI6?pid=ImgDet&rs=1",
            }}
            style={[styles.iconStyle, { height: 35, width: 30 }]}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Confirm password"
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.LogInButton}>
        <Button title="SIGN UP" color="darkgreen" onPress={handleSignIn} />
      </View>
      {/* Navigate group */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ ...styles.text, fontSize: 20 }}>
          Already have account ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontSize: 22,
              marginTop: 5,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    marginLeft: "auto",
    marginRight: "auto",
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
