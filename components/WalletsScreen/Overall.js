import { View, Text } from "react-native";
import React from "react";

import { commafy } from "../formatCurrency";

const Overall = ({ totalExpense, totalIncome, total }) => {
  return (
    <View>
      <View className="flex-row justify-between">
        <Text className="text-xl ">Income</Text>
        <Text className="text-xl text-primary font-bold" numberOfLines={1}>
          {totalIncome ? commafy(totalIncome) : 0}₫
        </Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-xl">Expense</Text>
        <Text className="text-xl text-danger-red font-bold" numberOfLines={1}>
          {totalExpense ? `-${commafy(totalExpense)}` : 0}₫
        </Text>
      </View>
      <View className="flex-row justify-between border-t pt-2 mt-2">
        <Text className="text-xl">Total</Text>
        <Text className="text-xl font-bold" numberOfLines={1}>
          {commafy(total)}₫
        </Text>
      </View>
    </View>
  );
};

export default Overall;
