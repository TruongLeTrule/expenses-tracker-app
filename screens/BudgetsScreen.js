import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Modal from "react-native-modal"
import { useEffect, useState } from "react";
import BottomSheet from "../components/BudgetsScreen/BottomSheet";
import Budgets from "../components/BudgetsScreen/Budgets";
import useFetch from "../data/fetchData";
import useStore from "../data/useStore";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import AddButton from "../components/BudgetsScreen/AddButton";
import { commafy } from "../components/formatCurrency";

export default function BudgetsScreen() {
  const editMode = useStore((state) => state.editMode);
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

  const handleItemClick = (item) => {
    // Set the data of the clicked item in the store
    useStore.setState({
      budgetId: item.id,
      budgetName: item.name,
      budgetAmount: item.value.toString(),
      budgetTime: item.timerange?.type || 'Time Range',
      budgetCategory: item.category || 'Categories',
      modalVisible: true,
      editMode: true
    });
    console.log(item)
  };

  //Get expense
  const getExpense = (category, start, end) => {
    let totalExpense = 0;
    if (allExpenses && Array.isArray(allExpenses)) {
      allExpenses.map((expense) => {
        if (category === expense.category  && expense.date?.seconds*1000 >= start*1000 && expense.date?.seconds*1000 <= end*1000) {
          totalExpense += expense.value;
        }
      });
    }

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
      budgetId: '',
      budgetName: '',
      budgetAmount: '0',
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
          renderItem={({ item, index }) => {
            const budgetsForTimeRange = data.filter(budget => budget.timerange?.type === item);
            const totalBudget = (value, category, start, end) => {
              let totalBudget = 0;
              totalBudget = value - getExpense(category, start, end);
              return totalBudget;
            }
            if (budgetsForTimeRange.length > 0) {
              return (
                <WhiteBox mt={"mt-4"} key={index}>
                  <View style={styles.boxContainer}>
                    <View>
                      <Text style={styles.boxText}>{item}</Text>
                      <View style={styles.line} />
                    </View>
                    {budgetsForTimeRange.map((budget) => (
                      <Budgets
                        key={budget.id}
                        name={budget.name}
                        value={commafy(totalBudget(budget.value, budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds))}
                        category={budget.category}
                        onPress={() => handleItemClick(budget)}
                        progress={
                          totalBudget(budget.value, budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds) < 0
                            ? 1 - (getExpense(budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds) / 1000000)
                            : getExpense(budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds) / budget.value
                        }
                        color={totalBudget(budget.value, budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds) < 0 ? '#eb3700' : '#4cb050'}
                        unfilledColor={totalBudget(budget.value, budget.category, budget.timerange?.start.seconds, budget.timerange?.end.seconds) < 0 ? '#eb3700' : '#f2f2f2'} //Budget exceeded
                      />
                    ))}
                  </View>
                </WhiteBox>
              )
            }
            else {
              return null;
            }
          }}
          ListFooterComponent={
            (data && data.length !== 0) && (
              <View className="items-center mt-8">
                <AddButton onPress={() => { useStore.setState({ modalVisible: true }), useStore.setState({ editMode: false }) }} />
              </View>
            )
          }
        />
        {(!data || data.length === 0) && (
          <View className="items-center mt-8 flex-1">
            <Text className='text-lg text-center mb-5'>You have not created any budget yet</Text>
            <AddButton onPress={() => { useStore.setState({ modalVisible: true }), useStore.setState({ editMode: false }) }} />
          </View>
        )}
        <Modal
          swipeDirection="down"
          onBackdropPress={() => { useStore.setState({ modalVisible: false }) }}
          onSwipeComplete={() => { useStore.setState({ modalVisible: false }) }}
          //style={styles.modalContainer}
          className="flex-1 m-0 justify-end"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            useStore.setState({ modalVisible: false });
          }}
        >
          {
            editMode
              ? <BottomSheet onPress={reset} title="Edit Budget" />
              : <BottomSheet onPress={reset} title="Add Budget" />
          }
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
