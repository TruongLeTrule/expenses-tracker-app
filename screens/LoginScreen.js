import { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { auth } from "../firebase";
import useLocal from "../data/localData";
import useStore from "../data/useStore";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { setLocalUID } = useLocal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUID = useStore((state) => state.setUID);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;

        setLocalUID(uid);
        setUID(uid);

        console.log("Save uid into storage");
        // Alert.alert(`Welcome back ${userCredentials.user.email}`);
      })
      .catch(() => Alert.alert("Invalid email or password!"));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/000/287/227/original/wallet-vector-icon.jpg",
        }}
      />
      <Text style={styles.text}>Log In</Text>
      {/* Input group */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sectionStyle}>
          <Feather
            name="mail"
            size={30}
            color="black"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.sectionStyle}>
          <MaterialIcons
            name="lock-outline"
            size={30}
            color="black"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
      </View>

      {/* Submit btn */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.LogInButton}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          LOG IN
        </Text>
      </TouchableOpacity>

      {/* Navigate group */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ ...styles.text, fontSize: 20 }}>OR</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontSize: 22,
              fontWeight: "bold",
              textDecorationLine: "underline",
              marginTop: 10,
            }}
          >
            Create account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              color: 'white',
              fontStyle: 'italic',
              fontWeight: 'bold'
            }}
          >
            Forget password?
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
    height: 50,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'darkgreen',
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15
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
