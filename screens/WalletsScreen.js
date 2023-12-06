import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "../hooks/useFetch";
import useStore from "../hooks/useStore";

import DayOverall from "../components/WalletsScreen/DayOverall";
import Expense from "../components/WalletsScreen/Expense";
import WhiteBox from "../components/WalletsScreen/WhiteBox";

export default function Wallets() {
  const data = useFetch();

  const [isLoading, setIsLoading] = useState(true);

  const sortDateExpenses = useStore((state) => state.sortDateExpenses);
  const setSortDateExpenses = useStore((state) => state.setSortDateExpenses);
  const allExpenses = useStore((state) => state.allExpenses);
  const setAllExpenses = useStore((state) => state.setAllExpenses);

  // Get day total
  const getDayTotal = useCallback(
    (expenses) => {
      return expenses.reduce((result, expense) => result + expense.value, 0);
    },
    [sortDateExpenses]
  );

  // Get total
  const getTotal = useCallback(
    (expenses) => {
      return expenses.reduce((result, expense) => result + expense.value, 0);
    },
    [sortDateExpenses]
  );

  // Create an array containing expenses group by date
  const groupExpensesByDate = (expenses) => {
    // Set last date to the last date of expenses
    let lastDate = new Date(expenses[0].date.seconds * 1000);
    let groupedExpenses = [expenses[0]];
    let result = [];

    for (let i = 0; i < expenses.length; i++) {
      const expenseDate = new Date(expenses[i].date.seconds * 1000);

      // Push grouped expenses into result if current expense has different date
      if (lastDate.toDateString() !== expenseDate.toDateString()) {
        result.push({
          title: lastDate,
          data: [...groupedExpenses],
        });

        // Set last date to current expense date and empty the array
        lastDate = expenseDate;
        groupedExpenses = [];
      }

      // Don't push into grouped expenses if this is the first element,
      // cause is already pushed in the declaration
      if (i !== 0) {
        groupedExpenses.push(expenses[i]);
      }

      // Push grouped expenses into result if this is the last element
      if (i === expenses.length - 1) {
        result.push({
          title: lastDate,
          data: [...groupedExpenses],
        });
      }
    }

    return result;
  };

  useEffect(() => {
    if (data) {
      data.sortDateExpenses
        ? setSortDateExpenses(groupExpensesByDate(data.sortDateExpenses))
        : null;
      data.allExpenses ? setAllExpenses(data.allExpenses) : null;
      setIsLoading(false);
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#3a833c"} />

      {/* Header */}
      <View className="bg-primary h-40 px-4 justify-center">
        <WhiteBox>
          <View className="flex-row items-center gap-3">
            <View className="bg-dark-green rounded-full h-11 w-11 flex items-center justify-center">
              <Ionicons name="cash" size={24} color={"#fff"} />
            </View>
            <Text className="text-2xl text-grey-text font-normal">Cash</Text>
          </View>
          <Text className="text-4xl font-bold mt-2">0₫</Text>
        </WhiteBox>
      </View>

      {/* Body */}
      <View className="mt-5 px-4" style={{ flex: 1 }}>
        {/* Filter by time */}
        <View className="flex-row items-center justify-between px-8">
          <Ionicons name="chevron-back" size={28} color={"#4cb050"} />
          <View className="flex-row items-end gap-3">
            <Text className="text-2xl text-primary font-bold">This month</Text>
          </View>
          <Ionicons name="chevron-forward" size={28} color={"#4cb050"} />
        </View>

        {/* Overall section */}
        <WhiteBox mt={"mt-4"}>
          {/* <View className="flex-row justify-between">
            <Text className="text-xl ">Income</Text>
            <Text className="text-xl text-primary">0₫</Text>
          </View> */}
          {/* <View className="flex-row justify-between border-t pt-2 mt-2">
            <Text className="text-xl">Total</Text>
            <Text className="text-xl">0₫</Text>
          </View> */}
          <View className="flex-row justify-between">
            <Text className="text-xl">Total</Text>
            <Text className="text-xl text-danger-red font-bold">
              {allExpenses ? getTotal(allExpenses) : 0}₫
            </Text>
          </View>
        </WhiteBox>

        <View className="items-center justify-center mt-5" style={{ flex: 1 }}>
          {/* All transactions show btn */}
          <View className="flex-row items-end gap-1">
            <Text className="text-lg text-primary font-normal">
              All transactions
            </Text>
            <Ionicons name="chevron-down" size={20} color={"#4cb050"} />
          </View>

          {/* Specific date show */}
          <SafeAreaView style={{ flex: 1 }} className="w-full mb-4">
            {!isLoading && sortDateExpenses ? (
              <FlatList
                data={sortDateExpenses}
                extraData={sortDateExpenses}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <WhiteBox mt={"mt-4"}>
                    <DayOverall
                      inputDate={item.title}
                      value={getDayTotal(item.data)}
                    />
                    {item.data.map((expense) => (
                      <Expense
                        key={expense.id}
                        category={expense.category}
                        value={expense.value}
                      />
                    ))}
                  </WhiteBox>
                )}
              />
            ) : (
              <ActivityIndicator />
            )}
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}
