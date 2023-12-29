import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import Modal  from "react-native-modal"
import { useEffect } from "react";
import BottomSheet from "../components/BudgetsScreen/BottomSheet";
import Budgets from "../components/BudgetsScreen/Budgets";
import useFetch from "../data/fetchData";
import useStore from "../data/useStore";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import AddButton from "../components/BudgetsScreen/AddButton";
import { commafy } from "../components/formatCurrency";

export default function BudgetsScreen() {
  const data = useStore((state) => state.data);
  const modalVisible = useStore((state) => state.modalVisible);
  const time = useStore((state) => state.time);
  const isLoading = useStore((state) => state.isLoading);
  const uid = useStore((state) => state.uid);
  const allExpenses = useStore((state) => state.allExpenses);
  const { getBudgets } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBudgets(uid, time);
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
                    <AddButton onPress={() => {useStore.setState({ modalVisible: true })}} />
                  </View>
                  )
                }
          />
          {(!data || data.length === 0) && (
            <View className="items-center mt-8 flex-1">
              <Text className='text-lg text-center mb-5'>You have not created any budget yet</Text>
              <AddButton onPress={() => {useStore.setState({ modalVisible: true })}} />
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
