import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Modal } from "react-native";
import TimeRangeBottomSheet from "./TimeRangeBottomSheet";
import CustomBudgetButton from "./CustomBudgetButton";
import useStore from "../../data/useStore";
import CategoryScreen from "./CategoryScreen";
import {addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase";
import BottomSheetTextInput from "./BottomSheetTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomSheet = ({ onPress}) => {
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
    const getDate = (interval) => {
      const currentDate = new Date();
      const firstDay = new Date(currentDate);
      const lastDay = new Date(firstDay);

      const setTime = (first, last) => {
        first.setHours(0, 0, 0, 0);
        last.setHours(23, 59, 59, 999);
      };
      // Adjust the date based on the specified interval
      switch (interval) {
        case 'Weekly':
          firstDay.setDate(currentDate.getDate() - currentDate.getDay() + 1);
          lastDay.setDate(firstDay.getDate() + 6);
          break;
        case 'Monthly':
          firstDay.setMonth(currentDate.getMonth(), 1);
          lastDay.setMonth(firstDay.getMonth() + 1, 0);
          break;
        case 'Quarterly':
          firstDay.setMonth(Math.floor(currentDate.getMonth() / 3) * 3 , 1);
          lastDay.setMonth(firstDay.getMonth() + 3, 0);
          break;
        case 'Half Yearly':
          firstDay.setMonth(currentDate.getMonth() < 6 ? 0 : 6, 1);
          lastDay.setMonth(firstDay.getMonth() + 6, 0);
          break;
        case 'Yearly':
          firstDay.setMonth(0, 1);
          lastDay.setMonth(11, 31);
          break;
        default:
          // Default to weekly if no or invalid interval provided
          firstDay.setDate(currentDate.getDate() - currentDate.getDay() + 1);
          break;
      }
      setTime(firstDay, lastDay);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Ho_Chi_Minh',
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedFirstDay = formatter.format(firstDay);
      const formattedLastDay = formatter.format(lastDay);

      return [formattedFirstDay, formattedLastDay];
    };

    const [firstDay, lastDay] = getDate(budgetTime);

  {/* Update Category */}
  const updateCategoryTitle = (selectedText) => {
    useStore.setState({ budgetCategory: selectedText });
    setCategoryVisible(false);
  };

    {/* Save Budget */}
    const saveBudget = async () => {
      if (budgetName === '' || budgetAmount === '' || budgetTime === 'Time Range' || budgetCategory === 'Categories') {
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
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.titleHeader}>
          <Ionicon name="chevron-down-outline" size={40} color="#4cb050" style={styles.icon} onPress={onPress} />
          <Text style={styles.titleText}>Create Budget</Text>
        </View>
        <View style={styles.content}>
          <BottomSheetTextInput
            link='https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/rename-5.png'
            placeholder="Budget Name"
            value={budgetName}
            onChangeText={(budgetName) => useStore.setState({ budgetName: budgetName })}
          />
          <BottomSheetTextInput
            link='https://cdn-icons-png.flaticon.com/512/94/94661.png'
            placeholder={"Amount"}
            value={String(budgetAmount)}
            onChangeText={(text) => useStore.setState({budgetAmount: text.replace(/[^0-9]/g, "")})}
            keyboardType={'numeric'}
          />
          <CustomBudgetButton
            title={budgetTime}
            icon='https://cdn-icons-png.flaticon.com/512/4781/4781427.png'
            onPress={() => {setTimeVisible(true)}}
          />
          <CustomBudgetButton
            title={budgetCategory}
            icon='https://cdn-icons-png.flaticon.com/512/2603/2603910.png'
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
  );
};
export default BottomSheet;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    titleHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    icon:{
        position: "absolute",
        left: 20
    },
    content:{
        marginHorizontal: 5,
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    titleText:{
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        marginLeft: 120,
    },
    detailContainer:{
        backgroundColor: "#d1d1d1",
        borderRadius: 10,
        height: 500,
    },
    header: {
        height: 50,
    },
    button:{
        marginTop: 50,
        backgroundColor: "#4cb050",
        height: 50,
        width: 150,
        alignSelf: "center",
        borderRadius: 30,
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 10,
    },
});