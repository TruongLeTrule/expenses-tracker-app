import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function DaySpecific() {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row justify-between items-center gap-4">
        <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
          <Ionicons name="fast-food" size={27} />
        </View>
        <Text className="text-xl font-thin">Food & drink</Text>
      </View>
      <Text className="font-bold  text-xl text-danger-red">0₫</Text>
    </View>
  );
}
