import { View, Text, StyleSheet,Alert,TouchableOpacity,Modal,FlatList, ActivityIndicator } from "react-native";
import { useState, useContext,useEffect } from "react";
import BottomSheet from "../components/BudgetsScreen/BottomSheet";
import Budgets from "../components/BudgetsScreen/Budgets";
import { BudgetContext } from "../components/BudgetsScreen/BudgetContext";
import { getDocs, collection} from "firebase/firestore";
import {db} from "../firebase";

export default function BudgetsScreen() {
  
  const {data,setData,modalVisible, 
    setModalVisible,setBudgetName,setBudgetAmount,setBudgetTime, 
    setBudgetCategory,isLoading,setIsLoading,time
  } = useContext(BudgetContext);

        {/* Fetch data from Firestore */}
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

  useEffect(() => {
    const fetchData = async() => {  
      const data =  await fetchDataFromFirestore();
      setData(data);
    }
    fetchData();
  }, []);
  
 {/* Loading screen */}
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"}  />
      </View>
    );
  }

  
  {/* Reset budget */}
  const reset = () => {
    setBudgetName('');
    setBudgetAmount('');
    setBudgetTime('Time Range');
    setBudgetCategory('Categories');
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Budgets</Text>
      </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Budgets
              name={item.name}
              amount={item.amount}
              time={item.time}
              wallet={item.wallet}
              category={item.category}
            />
          )}
          ListFooterComponent={
            <TouchableOpacity 
          style={styles.button}
          onPress={() => setModalVisible(true)}
          >
          <Text style={styles.text}>Add Budget</Text>
            </TouchableOpacity>
          }
        />
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
              setModalVisible(!modalVisible);
          }}
      >
          <BottomSheet onPress={reset}/>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#4cb050",
    height: 50,
  },

  button:{
    backgroundColor: "#4cb050",
    width: 150,
    alignSelf: "center",
    borderRadius: 10,
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  modalContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  close:{
    marginTop: 50,
    backgroundColor: "#4cb050",
    height: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  }
});
