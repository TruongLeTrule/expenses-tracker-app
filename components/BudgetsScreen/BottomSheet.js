import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Modal } from "react-native";
import TimeRangeBottomSheet from "./TimeRangeBottomSheet";
import CustomBudgetButton from "./CustomBudgetButton";
import useStore from "../../data/useStore";
import CategoryScreen from "./CategoryScreen";
import {getDocs,addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase";
import BottomSheetTextInput from "./BottomSheetTextInput";

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
      const nextDate = new Date();
      // Adjust the date based on the specified interval
      switch (interval) {
        case 'Weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'Monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'Yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
        case 'Half Yearly':
          nextDate.setMonth(nextDate.getMonth() + 6);
          break;
        case 'Quarterly':
          nextDate.setMonth(nextDate.getMonth() + 3);
          break;
        default:
          // Default to weekly if no or invalid interval provided
          nextDate.setDate(nextDate.getDate() + 7);
      }
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
      const formattedCurrentDate = formatter.format(currentDate);
      const formattedNextdate = formatter.format(nextDate);

      return [formattedCurrentDate, formattedNextdate];
    };

    const [currentDate, nextDate] = getDate(budgetTime);

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
              start: currentDate,
              end: nextDate,
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
              start: currentDate,
              end: nextDate,
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
          <Ionicon name="chevron-down-outline" size={30} color="black" style={styles.icon} onPress={onPress} />
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
        
        <TouchableOpacity style={styles.button} onPress={saveBudget}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
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
        padding:10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    content:{
        marginHorizontal: 5,
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 0.2,
    },
    titleText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginLeft: 100,
    },
    detailContainer:{
        backgroundColor: "#f1f1f1",
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