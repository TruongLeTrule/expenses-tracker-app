import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useStore from "../../data/useStore";
import { commafy } from "../formatCurrency";
import { icons, titles } from "../template";

export default function Expense({ expense }) {
  const toggleEditModalVisible = useStore(
    (state) => state.toggleEditModalVisible
  );
  const setEditingExpense = useStore((state) => state.setEditingExpense);

  const handlePress = () => {
    setEditingExpense({ ...expense });
    toggleEditModalVisible();
  };

  return (
    <Pressable
      className="flex-row justify-between items-center mt-4"
      onPress={handlePress}
    >
      <View className="flex-1 flex-row justify-between items-center gap-4">
        <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
          <Ionicons name={icons[expense.category]} size={27} />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-normal">
            {titles[expense.category]}
          </Text>
          {expense.note ? (
            <Text className="text-lg text-grey-text" numberOfLines={1}>
              {expense.note}
            </Text>
          ) : null}
        </View>
      </View>
      <Text className="font-bold  text-xl text-danger-red">
        -{commafy(expense.value)}₫
      </Text>
    </Pressable>
  );
}
