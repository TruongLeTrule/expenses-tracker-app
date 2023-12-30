import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput, Alert } from "react-native";
import { Modal } from "react-native";
import TimeRangeBottomSheet from "./TimeRangeBottomSheet";
import CustomBudgetButton from "./CustomBudgetButton";
import CategoryScreen from "./CategoryScreen";
import BottomSheetTextInput from "./BottomSheetTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import getDate from "./getDate";
import useStore from "../../data/useStore";
import {addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase";
import { icons,titles } from "../template";

const EditBudget = ({onPress}) => {
    const [timeVisible, setTimeVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const budgetName = useStore((state) => state.budgetName);
  const budgetAmount = useStore((state) => state.budgetAmount);
  const budgetTime = useStore((state) => state.budgetTime);
  const budgetCategory = useStore((state) => state.budgetCategory);
  const time = useStore((state) => state.time);
  const uid = useStore((state) => state.uid);
  const updateTimeRangeTitle = (selectedText) => {
    useStore.setState({ budgetTime: selectedText });
    setTimeVisible(false);
  };
      {/* Get date */}
      const [firstDay, lastDay] = getDate(budgetTime);

      {/* Update Category */}
      const updateCategoryTitle = (selectedText) => {
        useStore.setState({ budgetCategory: selectedText });
        setCategoryVisible(false);
      };
    
        {/* Save Budget */}
        const saveBudget = async () => {
          if (budgetName === '' || budgetAmount === '0' || budgetTime === 'Time Range' || budgetCategory === 'Categories') {
            Alert.alert('Please fill all the fields');
          } else {
            try {
              const queryData = collection(db, "Budget");
              await addDoc(queryData, {
                name: budgetName,
                value: Number(budgetAmount),
                category: budgetCategory,
                uid: uid,
                timerange: {
                  start: firstDay,
                  end: lastDay,
                  type: budgetTime,
                }
              });
        
              // Use the spread operator with the previous data
              const newData = [...useStore.getState().data, {
                name: budgetName,
                value: Number(budgetAmount),
                category: budgetCategory,
                uid: uid,
                timerange: {
                  start: firstDay,
                  end: lastDay,
                  type: budgetTime,
                }
              }];
        
              // Sort newData based on custom order
              newData.sort((a, b) => {
                const orderA = time.indexOf(a.timerange?.type);
                const orderB = time.indexOf(b.timerange?.type);
                return orderA - orderB;
              });
    
              // Update the state using the setState function
              useStore.setState({ data: newData, modalVisible: false });
              useStore.setState({
                budgetName: '',
                budgetTime: 'Time Range',
                budgetCategory: 'Categories',
                budgetAmount: ''
              });
        
              Alert.alert('Budget created successfully');
            } catch (error) {
              console.error("Error adding document: ", error);
            }
          }
        };
return (
    <Modal>
        <View className="bg-[#d1d1d1] rounded-t-xl h-3/4">
      <View style={styles.detailContainer}>
        <View style={styles.titleHeader}>
          <Ionicons name="chevron-down-outline" size={40} color="#4cb050" style={styles.icon} onPress={onPress} />
          <Text style={styles.titleText}>Create Budget</Text>
        </View>
        <View className="bg-[#fff] rounded-xl mt-16 p-6">
          <BottomSheetTextInput
            //link='https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/rename-5.png'
            placeholder="Budget Name"
            value={budgetName}
            onChangeText={(budgetName) => useStore.setState({ budgetName: budgetName })}
          />
          {/* Expense input */}
            <View className="flex-row items-center gap-4">
              <View className="rounded-full h-12 w-12 flex items-center justify-center bg-dark-green">
                <Ionicons name="cash" size={27} color={"#fff"} />
              </View>
              <View>
                <Text className="text-base text-grey-text">Amount</Text>
                <View className="flex-row">
                  <TextInput
                    className={`font-bold  text-2xl`}
                    value={String(budgetAmount)}
                    keyboardType="numeric"
                    onChangeText={(text) => useStore.setState({budgetAmount: Number(text.replace(/[^0-9]/g, ""))})
                    }
                  />
                  <Text className={`font-bold  text-2xl`}>₫</Text>
                </View>
              </View>
            </View>
          <CustomBudgetButton
            title={budgetTime}
            icon='today'
            onPress={() => {setTimeVisible(true)}}
          />
          <CustomBudgetButton
            title={budgetCategory === 'Categories' ? 'Categories' : titles[budgetCategory]}
            icon= {budgetCategory === 'Categories' ? 'grid' : icons[budgetCategory]}
            onPress={() => {setCategoryVisible(true)}}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={timeVisible}
          onRequestClose={() => {
            setTimeVisible(!timeVisible);
          }}>
          {/* Pass the callback function to update the title */}
          <TimeRangeBottomSheet onPress={updateTimeRangeTitle} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryVisible}
          onRequestClose={() => {
            setCategoryVisible(!categoryVisible);
          }}>
          <CategoryScreen onPress={updateCategoryTitle} />
        </Modal>
        
        {/* Submit */}
        <View className="items-center mt-8">
          <TouchableOpacity
            className="w-36 h-14 rounded-full bg-primary flex-row justify-center items-center"
            onPress={saveBudget}
          >
            <Ionicons name={"save"} size={30} color={"#fff"} />
            <Text className="font-bold text-2xl text-[#fff] ml-2">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </Modal>
    
  );
};
export default EditBudget;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    detailContainer:{
      backgroundColor: "#d1d1d1",
      borderRadius: 10,
    },
    titleHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    titleText:{
      fontSize: 25,
      fontWeight: "bold",
      color: "black",
      marginLeft: 120,
    },
    content:{
      marginHorizontal: 5,
      marginVertical: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
    },
    icon:{
        position: "absolute",
        left: 20
    },
});