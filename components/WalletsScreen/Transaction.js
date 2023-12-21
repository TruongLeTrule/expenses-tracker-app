import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useStore from "../../data/useStore";
import { commafy } from "../formatCurrency";
import { icons, titles } from "../template";

export default function Transaction({ transaction }) {
  const toggleEditModalVisible = useStore(
    (state) => state.toggleEditModalVisible
  );
  const setEditingExpense = useStore((state) => state.setEditingExpense);

  const handlePress = () => {
    setEditingExpense({ ...transaction });
    toggleEditModalVisible();
    console.log(transaction);
  };

  return (
    <Pressable
      className="flex-row justify-between items-center mt-4"
      onPress={handlePress}
    >
      <View className="flex-1 flex-row justify-between items-center gap-4">
        <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
          <Ionicons name={icons[transaction.category]} size={27} />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-normal">
            {titles[transaction.category]}
          </Text>
          {transaction.note ? (
            <Text className="text-lg text-grey-text" numberOfLines={1}>
              {transaction.note}
            </Text>
          ) : null}
        </View>
      </View>
      <View className="flex-1 items-end">
        {transaction.type === "out" ? (
          <Text className="font-bold text-xl text-danger-red" numberOfLines={1}>
            -{commafy(transaction.value)}₫
          </Text>
        ) : (
          <Text className="font-bold text-xl text-primary" numberOfLines={1}>
            {commafy(transaction.value)}₫
          </Text>
        )}
      </View>
    </Pressable>
  );
}
