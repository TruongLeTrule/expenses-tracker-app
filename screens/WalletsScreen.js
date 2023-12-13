import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "../data/fetchData";
import useStore from "../data/useStore";

import Header from "../components/WalletsScreen/Header";
import FilterSection from "../components/WalletsScreen/FilterSection";
import DayOverall from "../components/WalletsScreen/DayOverall";
import Expense from "../components/WalletsScreen/Expense";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import Overall from "../components/WalletsScreen/Overall";
import EditModal from "../components/WalletsScreen/EditModal";
import { commafy } from "../components/formatCurrency";

export default function Wallets() {
  const { getAllExpenses } = useFetch();

  const sortDateExpenses = useStore((state) => state.sortDateExpenses);
  const total = useStore((state) => state.total);
  const isLoading = useStore((state) => state.isLoading);
  const allExpenses = useStore((state) => state.allExpenses);
  const setSortDateExpenses = useStore((state) => state.setSortDateExpenses);
  const setTotal = useStore((state) => state.setTotal);

  useEffect(() => {
    getAllExpenses();
  }, []);

  useEffect(() => {
    if (allExpenses) {
      setSortDateExpenses(allExpenses);
      setTotal(allExpenses);
    }
  }, [allExpenses]);

  // Render loading circle if haven't got data yet
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusBar backgroundColor={"#3a833c"} />
        <ActivityIndicator size={"large"} color={"#4cb050"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#3a833c"} />

      {/* Header */}
      <Header total={commafy(total)} />

      {/* Body */}
      <View className="mt-5 px-4" style={{ flex: 1 }}>
        {/* Filter section */}
        <FilterSection />

        {/* Overall section */}
        <WhiteBox mt={"mt-4"}>
          <Overall value={commafy(total)} />
        </WhiteBox>

        {/* Each day section */}
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
            <FlatList
              data={sortDateExpenses}
              extraData={sortDateExpenses}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <WhiteBox mt={"mt-4"}>
                  <DayOverall inputDate={item.title} expenses={item.data} />
                  {item.data.map((expense) => (
                    <Expense key={expense.id} expense={expense} />
                  ))}
                </WhiteBox>
              )}
            />
          </SafeAreaView>
        </View>
      </View>

      <EditModal />
    </View>
  );
}
