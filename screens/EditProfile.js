import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStore from "../data/useStore";

export default function EditProfile({ navigation }) {
  // State for loading user info from database
  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  //   const handleEditProfile = () => {
  //     //functions to upload user's saved data to database
  //     //setUserInfo(data)
  //     navigation.goBack();
  //   };

  //   const handleTextChange = (type, text) => {
  //     let newUserInfo = {};
  //     if (type === "firstname" || type === "lastname") {
  //       newUserInfo = {
  //         ...tempUserInfo,
  //         name: { ...tempUserInfo.name, [type]: text },
  //       };
  //       setTempUserInfo(newUserInfo);
  //       return;
  //     }
  //     if (type === "number") {
  //       newUserInfo = {
  //         ...tempUserInfo,
  //         address: {
  //           ...tempUserInfo.address,
  //           [type]: isNaN(parseInt(text)) ? "" : parseInt(text),
  //         },
  //       };
  //       setTempUserInfo(newUserInfo);
  //       return;
  //     }
  //     if (type === "street" || type === "city") {
  //       newUserInfo = {
  //         ...tempUserInfo,
  //         address: { ...tempUserInfo.address, [type]: text },
  //       };
  //       setTempUserInfo(newUserInfo);
  //     } else {
  //       newUserInfo = { ...tempUserInfo, [type]: text };
  //       setTempUserInfo(newUserInfo);
  //     }
  //   };

  // UseEffect to make SAVE button update the latest state

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleEditProfile()}>
          <Text
            style={{
              marginRight: 20,
              fontSize: 17,
              fontWeight: 500,
              color: "blue",
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [tempUserInfo]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.fullName}>
          <View style={styles.firstName}>
            <Text style={styles.title}>First Name:</Text>
            <TextInput
              //   value={tempUserInfo?.name.firstname}
              style={styles.input}
              //   onChangeText={(text) => handleTextChange("firstname", text)}
            />
          </View>
          <View style={styles.lastName}>
            <Text style={styles.title}>Last Name:</Text>
            <TextInput
              //   value={tempUserInfo?.name.lastname}
              style={styles.input}
              //   onChangeText={(text) => handleTextChange("lastname", text)}
            />
          </View>
        </View>

        {/* <Text style={styles.title}>Username:</Text>
        <TextInput
          value={tempUserInfo?.username}
          style={styles.input}
          onChangeText={(text) => handleTextChange("username", text)}
        />
        <Text style={styles.title}>Email:</Text>
        <TextInput
          value={tempUserInfo?.email}
          style={styles.input}
          onChangeText={(text) => handleTextChange("email", text)}
        />
        <Text style={styles.title}>Phone Number:</Text>
        <TextInput
          value={tempUserInfo?.phone}
          style={styles.input}
          onChangeText={(text) => handleTextChange("phone", text)}
        />
        <Text style={styles.title}>House Number:</Text>
        <TextInput
          value={tempUserInfo?.address.number.toString()}
          style={styles.input}
          onChangeText={(text) => handleTextChange("number", text)}
        />
        <Text style={styles.title}>Street:</Text>
        <TextInput
          value={tempUserInfo?.address.street}
          style={styles.input}
          onChangeText={(text) => handleTextChange("street", text)}
        />
        <Text style={styles.title}>City:</Text>
        <TextInput
          value={tempUserInfo?.address.city}
          style={styles.input}
          onChangeText={(text) => handleTextChange("city", text)}
        />
		*/}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  fullName: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  firstName: {
    flex: 1,
  },
  lastName: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    width: "90%",
    borderWidth: 1,
    height: 50,
    paddingLeft: 10,
    borderRadius: 15,
  },
});
