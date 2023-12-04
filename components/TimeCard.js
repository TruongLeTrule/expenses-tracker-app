import { View, Text } from "react-native";
import React from "react";

export default function DayCard() {
  return (
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
  );
}
