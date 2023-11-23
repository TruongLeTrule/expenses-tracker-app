import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase"
import { AuthContext } from "../AuthContext";
export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace("MainBottomTab")
    //         }
    //     })
    //     return unsubscribe
    // }, [])
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // const username = "Logged in with " + userCredentials.user.email
                // Alert.alert(username)
                navigation.replace("MainBottomTab")
            })
            .catch(() => Alert.alert("Invalid log in credentials"))
    }
    return (
        <View style={styles.container}>
            <Image style={styles.Image} source={{
                uri: "https://static.vecteezy.com/system/resources/previews/000/287/227/original/wallet-vector-icon.jpg",
            }} />
            <Text style={styles.text}>Log In</Text>
            <View style={styles.sectionStyle}>
                <Image source={{ uri: "https://th.bing.com/th/id/OIP.37SXOl1HMjafsfpow_NjhwHaFS?pid=ImgDet&rs=1" }}
                    style={styles.iconStyle} />
                <TextInput
                    style={styles.textinput}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.sectionStyle}>
                <Image source={{ uri: "https://th.bing.com/th/id/OIP.D8nemBhgTZk6KzU-ZSvuJAHaI6?pid=ImgDet&rs=1" }}
                    style={[styles.iconStyle, { height: 35, width: 30, }]} />
                <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.LogInButton}>
                <Button title="LOG IN" color="darkgreen" onPress={handleLogin} />
            </View>
            <Text style={{ ...styles.text, fontSize: 15 }}>OR</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("SignUpScreen") }}>
                <Text style={{ ...styles.text, fontSize: 15, fontStyle: "italic", textDecorationLine: "underline" }}>Create account</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: 35,
            backgroundColor: "green",
        },
        Image: {
            width: 120,
            height: 120,
            marginTop: 100,
            marginBottom: 20,
            borderRadius: 60,
            marginLeft: "auto",
            marginRight: "auto",
        },
        textinput: {
            flex: 1,
            textAlignVertical: 'top',
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
            marginTop: 10,
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
            color: "white",
        },
        // text2: {
        //   fontSize: 20,
        // },
        LogInButton: {

            width: "75%",
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
        },
        iconStyle: {
            height: 25,
            width: 35,
            padding: 10,
            margin: 10,
            resizeMode: 'stretch',
            alignItems: 'center',
        },
        sectionStyle: {
            marginLeft: 50,
            marginRight: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            margin: 10,
            borderRadius: 10,
            backgroundColor: "white",

        },
        // flexHorizontal: {
        //   flexDirection: 'row',
        //   justifyContent: 'center'
        // },
    }
)