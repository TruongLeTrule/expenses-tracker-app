import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth, EmailAuthProvider } from '../firebase'
import useStore from "../data/useStore";
import useLocal from "../data/localData";


export default function ChangePasswordScreen() {
  const { removeLocalUID, removeLocalExpenses, removeLocalIncomes } =
    useLocal();
  const setUID = useStore((state) => state.setUID);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const setFilteredList = useStore((state) => state.setFilteredList);
  const setRenderList = useStore((state) => state.setRenderList);

  const handleSignOut = async () => {
    await auth.signOut()
      .then(() => Alert.alert('Password updated successfully. Please log in again'))
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

  const [resetPassword, setResetPassword] = useState({
    "currentPass": "",
    "newPass": "",
    "confirmPass": ""
  })
  const handleChangePassword = () => {
    if (resetPassword.newPass !== resetPassword.confirmPass) {
      Alert.alert("New password does not match")
      return
    }
    const user = auth.currentUser;
    if (user === undefined) {
      Alert.alert("Error getting user's information")
      return
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      resetPassword.currentPass
    );

    // Re-authenticate the user
    user.reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated, now change the password
        return user.updatePassword(resetPassword.newPass);
      })
      .then(() => {
        // Password updated successfully
        handleSignOut()
      })
      .catch(() => {
        // Handle errors
        Alert.alert("Error: Wrong current password");
      });
  }
  const handleChangeInput = (type, text) => {
    let newResetPass = { ...resetPassword, [type]: text }
    setResetPassword(newResetPass)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.textInput}
        value={resetPassword.currentPass}
        onChangeText={(text) => handleChangeInput("currentPass", text)}
      />
      <Text style={styles.title}>New Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.textInput}
        value={resetPassword.newPassPass}
        onChangeText={(text) => handleChangeInput("newPass", text)}
      />
      <Text style={styles.title}>Confirm New Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.textInput}
        value={resetPassword.confirmPass}
        onChangeText={(text) => handleChangeInput("confirmPass", text)}
      />
      <TouchableOpacity
        style={styles.changePassBtn}
        onPress={handleChangePassword}
      >
        <Text
          style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold' }}
        >
          Change password
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textInput: {
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 20,
    width: '70%',
    height: 40,
    paddingLeft: 20,
    fontSize: 20,
    margin: 10,
    backgroundColor: '#fff'
  },
  changePassBtn: {
    width: '50%',
    height: 50,
    backgroundColor: 'rgb(40, 230, 40)',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 15
  }
})