import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStore from "../data/useStore";
import useLocal from "../data/localData";
import useFetch from "../data/fetchData";

export default function EditProfile({ navigation }) {
  const { setLocalUserInfo } = useLocal();

  const { addUserInfoToDB } = useFetch();

  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const uid = useStore((state) => state.uid);

  const [fullName, setFullName] = useState(userInfo?.fullName);
  const [username, setUsername] = useState(userInfo?.username);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [address, setAddress] = useState(userInfo?.address);

  const handleEditProfile = () => {
    if (!fullName || !username || !phone || !address) {
      Alert.alert("Warning", "Please fill all fields");
      return;
    }

    navigation.navigate("Profile");
    const newUserInfo = {
      ...userInfo,
      fullName,
      username,
      phone,
      address,
      uid,
    };
    setUserInfo(newUserInfo);
    setLocalUserInfo(newUserInfo);
    addUserInfoToDB(newUserInfo);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          value={fullName}
          style={styles.input}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.title}>Username</Text>
        <TextInput
          value={username}
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={styles.title}>Phone Number</Text>
        <TextInput
          value={phone}
          style={styles.input}
          onChangeText={(text) => setPhone(text)}
        />
        <Text style={styles.title}>Address</Text>
        <TextInput
          value={address}
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleEditProfile}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  input: {
    marginTop: 5,
    width: "100%",
    fontSize: 18,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  editProfileButton: {
    marginTop: 40,
    backgroundColor: "#4cb050",
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
  },
});
