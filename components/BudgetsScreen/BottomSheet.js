import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image ,TextInput, Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Modal } from "react-native";
import TimeRangeBottomSheet from "./TimeRangeBottomSheet";
import CustomBudgetButton from "./CustomBudgetButton";
import useStore from "../../data/useStore";
//import CategoryModal from "../CategoryModal";
import CategoryScreen from "./CategoryScreen";
import {getDocs,addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase";

const BottomSheet = ({ onPress}) => {
  const [timeVisible, setTimeVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const budgetName = useStore((state) => state.budgetName);
  const budgetAmount = useStore((state) => state.budgetAmount);
  const budgetTime = useStore((state) => state.budgetTime);
  const budgetCategory = useStore((state) => state.budgetCategory);
  const time = useStore((state) => state.time);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setData = useStore((state) => state.setData);

  const updateTimeRangeTitle = (selectedText) => {
    useStore.setState({ budgetTime: selectedText });
    setTimeVisible(false);
  };

  const updateCategoryTitle = (selectedText) => {
    useStore.setState({ budgetCategory: selectedText });
    setCategoryVisible(false);
  };


  const fetchDataFromFirestore = async () => {
    try {
      const data = [];
      for (const currentTime of time) {
        const queryData = await getDocs(collection(db, "Budget", "Time", currentTime));
        queryData.forEach((doc) => {
          const subDocData = doc.data();
          if (time.includes(subDocData.time)) {
            data.push(subDocData);
          }
        });
      }
      return data;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return [];
    }
    finally {
      setIsLoading(false);
    }
  };

  const saveBudget = async () => {
    if (budgetName === '' || budgetAmount === '' || budgetTime === 'Time Range' || budgetCategory === 'Categories') {
      Alert.alert('Please fill all the fields');
    } else {
      try {
        const queryData = collection(db, "Budget", "Time", budgetTime);
        await addDoc(queryData, {
          name: budgetName,
          amount: budgetAmount,
          time: budgetTime,
          category: budgetCategory,
        });
        Alert.alert('Budget created successfully');
        const data = await fetchDataFromFirestore();
        setData(data);
        useStore.setState({ modalVisible: false });
        useStore.setState({
          budgetName: '',
          budgetAmount: '',
          budgetTime: 'Time Range',
          budgetCategory: 'Categories',
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async() => {  
      const data =  await fetchDataFromFirestore();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.titleHeader}>
          <Ionicon name="chevron-down-outline" size={30} color="black" style={styles.icon} onPress={onPress} />
          <Text style={styles.titleText}>Create Budget</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.name}>
            <Image style={styles.image} source={{ uri: 'https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/rename-5.png' }} />
            <View style={styles.titleContainer}>
              <TextInput
                style={styles.title}
                value={budgetName}
                placeholder="Budget name"
                onChangeText={(budgetName) => useStore.setState({ budgetName: budgetName })}
              />
              <View style={styles.line} />
            </View>
          </View>
          <View style={styles.name}>
            <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/94/94661.png' }} />
            <View style={styles.titleContainer}>
              <TextInput
                style={styles.title}
                value={budgetAmount}
                placeholder="Amount"
                onChangeText={(budgetAmount) => useStore.setState({ budgetAmount: budgetAmount })}
              />
              <View style={styles.line} />
            </View>
          </View>
          <CustomBudgetButton
            title={budgetTime}
            icon='https://cdn-icons-png.flaticon.com/512/4781/4781427.png'
            onPress={() => setTimeVisible(true)}
          />
          <CustomBudgetButton
            title="Wallets"
            icon='https://cdn-icons-png.flaticon.com/512/3359/3359235.png'
          />
          <CustomBudgetButton
            title={budgetCategory}
            icon='https://cdn-icons-png.flaticon.com/512/2603/2603910.png'
            onPress={() => setCategoryVisible(true)}
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
          {/* <CategoryModal/> */}
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
    name:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
    title:{
        fontSize: 20,
        color: "gray",
        marginTop: 10,
    },
    titleContainer:{
        marginLeft: 10,
    },
    line:{
        height: 1,
        width: 350,
        backgroundColor: '#ccc',
        marginVertical: 12,
        
    },
    image:{
        width: 30,
        height: 30,
    }
});