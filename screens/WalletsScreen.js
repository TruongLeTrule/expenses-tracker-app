import { View, Text, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

import DayOverall from "../components/WalletsScreen/DayOverall";
import Expense from "../components/WalletsScreen/Expense";
import WhiteBox from "../components/WalletsScreen/WhiteBox";

import useFetch from "../hooks/useFetch";
import useStore from "../hooks/useStore";

export default function Wallets() {
  const data = useFetch();
  const expenses = useStore((state) => state.expenses);
  const setExpenses = useStore((state) => state.setExpenses);

  useEffect(() => {
    if (data) {
      setExpenses(data);
      console.log(expenses);
    }
  }, [data, setExpenses]);

  // temp
  const date = new Date();

  return (
    <View>
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
      <View className="mt-5 px-4">
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
            <Text className="text-xl text-danger-red">0₫</Text>
          </View>
        </WhiteBox>

        <View className="items-center justify-center mt-5">
          {/* All transactions show btn */}
          <View className="flex-row items-end gap-1">
            <Text className="text-lg text-primary font-normal">
              All transactions
            </Text>
            <Ionicons name="chevron-down" size={20} color={"#4cb050"} />
          </View>

          {/* Specific date show */}
          <WhiteBox mt={"mt-4"}>
            <DayOverall value={0} inputDate={date} />
            <Expense category="Food & drink" value={0} />
          </WhiteBox>
        </View>
      </View>
    </View>
  );
}
