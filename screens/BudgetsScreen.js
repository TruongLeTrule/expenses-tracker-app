import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import Modal  from "react-native-modal"
import { useEffect } from "react";
import BottomSheet from "../components/BudgetsScreen/BottomSheet";
import Budgets from "../components/BudgetsScreen/Budgets";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useStore from "../data/useStore";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import { commafy } from "../components/formatCurrency";
import { Ionicons } from "@expo/vector-icons";
export default function BudgetsScreen() {
  const data = useStore((state) => state.data);
  const modalVisible = useStore((state) => state.modalVisible);
  const time = useStore((state) => state.time);
  const isLoading = useStore((state) => state.isLoading);
  const uid = useStore((state) => state.uid);
  const allExpenses = useStore((state) => state.allExpenses);

  {/* Fetch data from Firestore */ }
  const fetchDataFromFirestore = async () => {
    try {
      const data = [];
      const budgetRef = collection(db, "Budget");
      const q = query(budgetRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          category: docData.category,
          name: docData.name,
          timerange: docData.timerange,
          uid: docData.uid,
          value: docData.value,
        });
      });

      // Sort data by custom order  
      data.sort((a, b) => {
        const orderA = time.indexOf(a.timerange?.type);
        const orderB = time.indexOf(b.timerange?.type);
        return orderA - orderB;
      });
      console.log('Budgets fetched')
      return data;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return [];
    } finally {
      useStore.setState({ isLoading: false });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFirestore();
      useStore.setState({ data: data });
    }
    fetchData();
  }, []);

    //Get expense
  const getExpense = (category) => {
    let totalExpense = 0;
    allExpenses.map((expense) => {
      if (category === expense.category) {
        totalExpense += expense.value;
      }
    });
    return totalExpense;
  };

  {/* Loading screen */ }
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={'#4cb050'} />
      </View>
    );
  }


  {/* Reset budget */ }
  const reset = () => {
    useStore.setState({
      budgetName: '',
      budgetAmount: '',
      budgetTime: 'Time Range',
      budgetCategory: 'Categories',
      modalVisible: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Budgets</Text>
      </View>
        <View style={styles.container}>
          <FlatList
            data={time}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const budgetsForTimeRange = data.filter(budget => budget.timerange?.type === item);
              const totalBudget = (value, category) => {
                let totalBudget = 0;
                totalBudget = value - getExpense(category);
                return totalBudget;
              }
                if (budgetsForTimeRange.length > 0) {
                  return (
                    <WhiteBox mt={"mt-4"}>
                      <View style={styles.boxContainer}>
                          <View>
                            <Text style={styles.boxText}>{item}</Text>
                            <View style={styles.line} />
                          </View>
                          {budgetsForTimeRange.map((budget) => (
                            <Budgets
                              key={budget.name}
                              name={budget.name}
                              value={commafy(totalBudget(budget.value, budget.category))}
                              category={budget.category}
                              onPress={() => {Alert.alert(budget.name,`budget value: ${budget.value}đ`)}}
                              progress={
                                totalBudget(budget.value, budget.category) < 0 
                                ? 1 - (getExpense(budget.category) / 1000000) 
                                : getExpense(budget.category) / budget.value
                              }
                              color={totalBudget(budget.value, budget.category) < 0 ? '#eb3700': '#4cb050'}
                              unfilledColor={totalBudget(budget.value, budget.category) < 0 ? '#eb3700' : '#f2f2f2'} //Budget exceeded
                            />
                          ))}
                      </View>
                    </WhiteBox>
                  )}
                  
                  else{
                    return null;
                  }
                  }}
                ListFooterComponent={
                  (data && data.length !== 0) && (
                  <View className="items-center mt-8">
                    <TouchableOpacity
                      className="w-70 h-14 rounded-full bg-primary flex-row items-center p-2"
                      onPress={() => {useStore.setState({ modalVisible: true })}}
                    >
                      <Ionicons name={"add"} size={30} color={"#fff"} />
                      <Text className="font-bold text-xl text-[#fff] ml-2">Add Budget</Text>
                    </TouchableOpacity>
                  </View>
                  )
                }
          />
          {(!data || data.length === 0) && (
            <View className=' flex-1'>
              <Text className='text-lg text-center mb-5'>You have not created any budget yet</Text>
              <TouchableOpacity style={styles.button} onPress={() => { useStore.setState({ modalVisible: true })}}>
                <Ionicons name={"add"} size={30} color={"#fff"} />
                <Text className="font-bold text-xl text-[#fff] ml-2">Add Budget</Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal
            swipeDirection="down"
            onBackdropPress={() => { useStore.setState({ modalVisible: false })}}
            onSwipeComplete={() => { useStore.setState({ modalVisible: false })}}
            style={styles.modalContainer}
            className="flex-1 m-0 justify-end"
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              useStore.setState({ modalVisible: false });
            }}
          >
            <BottomSheet onPress={reset} />
          </Modal>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "#4cb050",
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    backgroundColor: "#4cb050",
    width: 150,
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  modalContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  close: {
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
  },
  boxContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 10,
  },
  line: {
    borderWidth: 0.2,
    backgroundColor: "#f2f2f2",
    marginVertical: 5,
    width: "100%",
  },
  boxText: {
    fontSize: 15,
    color: "black",
  }
});
