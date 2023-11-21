import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Wallets() {
  return (
    <View className="">
      <StatusBar backgroundColor={"#3a833c"} />
      {/* Header */}
      <View className="bg-primary h-40 px-4 justify-center">
        <View className="bg-[#fff] w-full py-3 px-4 rounded-2xl">
          <View className="flex-row items-center gap-3">
            <View className="bg-dark-green rounded-full h-11 w-11 flex items-center justify-center">
              <Ionicons name="cash" size={24} color={"#fff"} />
            </View>
            <Text className="text-2xl text-grey-text font-normal">Cash</Text>
          </View>
          <Text className="text-4xl font-bold mt-2">0₫</Text>
        </View>
      </View>

      {/* Body */}
      <View className="mt-5 px-4">
        {/* Time row */}
        <View className="flex-row items-center justify-between px-8">
          <Ionicons name="chevron-back" size={28} color={"#4cb050"} />
          <View className="flex-row items-end gap-3">
            <Text className="text-2xl text-primary font-bold">This month</Text>
          </View>
          <Ionicons name="chevron-forward" size={28} color={"#4cb050"} />
        </View>

        {/* Total card */}
        <View className="bg-[#fff] w-full p-4 rounded-xl mt-4 shadow">
          <View className="flex-row justify-between">
            <Text className="text-xl ">Income</Text>
            <Text className="text-xl text-primary">0₫</Text>
          </View>
          <View className="flex-row justify-between mt-1">
            <Text className="text-xl">Expense</Text>
            <Text className="text-xl text-danger-red">0₫</Text>
          </View>
          <View className="flex-row justify-between border-t pt-2 mt-2">
            <Text className="text-xl">Total</Text>
            <Text className="text-xl">0₫</Text>
          </View>
        </View>

        <View className="items-center justify-center mt-5">
          {/* All transactions show btn */}
          <View className="flex-row items-end gap-1">
            <Text className="text-lg text-primary font-normal">
              All transactions
            </Text>
            <Ionicons name="chevron-down" size={20} color={"#4cb050"} />
          </View>

          {/* Specific card */}
          <View className="bg-[#fff] w-full p-4 rounded-xl mt-4 shadow">
            {/* All day */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-between items-center gap-x-5">
                <Text className="font-bold text-3xl">6</Text>
                <View>
                  <Text className="font-bold text-xl">Friday</Text>
                  <Text className="font-normal text-xl text-grey-text">
                    October, 2023
                  </Text>
                </View>
              </View>
              <Text className="font-bold text-xl text-danger-red">0₫</Text>
            </View>

            {/* Specific info */}
            <View className="flex-row justify-between items-center mt-4">
              <View className="flex-row justify-between items-center gap-4">
                <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
                  <Ionicons name="fast-food" size={27} />
                </View>
                <Text className="text-xl font-thin">Food & drink</Text>
              </View>
              <Text className="font-bold  text-xl text-danger-red">0₫</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
