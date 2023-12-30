import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase"

import useStore from "../data/useStore";
import useLocal from "../data/localData";


export default function MoreScreen({ navigation }) {
  const { removeLocalUID, removeLocalExpenses, removeLocalIncomes } =
    useLocal();
  const setUID = useStore((state) => state.setUID);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const setFilteredList = useStore((state) => state.setFilteredList);
  const setRenderList = useStore((state) => state.setRenderList);

  const handleSignOut = async () => {
    await auth.signOut()
      .then(() => Alert.alert("Signed out successfully"))
      .catch((error) => Alert.alert(error.message))
    setUID(null);
    setAllExpenses(null);
    setAllIncomes(null);
    setFilteredList(null);
    setRenderList(null);
    await removeLocalUID();
    await removeLocalExpenses();
    await removeLocalIncomes();
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/*Insert user's image */}
      <View style={styles.ImagePlaceHolder}></View>

      {/*Insert user's username */}
      <Text style={styles.userNamePlaceHolder}>USERNAME</Text>
      <TouchableOpacity
        style={[styles.Btn, { backgroundColor: 'white', borderColor: 'rgb(40, 230, 40)', borderWidth: 1 }]}
        onPress={() => navigation.navigate("Edit Profile")}
      >
        <Text style={[styles.signOut, { color: 'rgb(40, 230, 40)' }]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Btn, { backgroundColor: 'white', borderColor: 'rgb(40, 230, 40)', borderWidth: 1 }]}
        onPress={() => navigation.navigate("Change Password")}
      >
        <Text style={[styles.signOut, { color: 'rgb(40, 230, 40)' }]}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Btn, { backgroundColor: 'white', borderColor: 'rgb(40, 230, 40)', borderWidth: 1 }]}
        onPress={() => Alert.alert("Error getting policies")}
      >
        <Text style={[styles.signOut, { color: 'rgb(40, 230, 40)' }]}>Terms & Policies</Text>
      </TouchableOpacity><TouchableOpacity
        style={[styles.Btn, { backgroundColor: 'white', borderColor: 'rgb(40, 230, 40)', borderWidth: 1 }]}
        onPress={() => Alert.alert("This app is created by L.Q.Truong, P.M.Triet and N.Q.Vu of UIT")}
      >
        <Text style={[styles.signOut, { color: 'rgb(40, 230, 40)' }]}>About Us</Text>
      </TouchableOpacity><TouchableOpacity
        style={styles.Btn}
        onPress={handleSignOut}
      >
        <Text style={styles.signOut}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  Btn: {
    width: '60%',
    height: 50,
    backgroundColor: 'rgb(40, 230, 40)',
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: 20
  },
  signOut: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  ImagePlaceHolder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 20
  },
  userNamePlaceHolder: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold'
  },
})