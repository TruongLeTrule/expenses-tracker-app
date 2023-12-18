import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterSection = () => {
  return (
    <View className="flex-row items-center justify-between px-8">
      <Ionicons name="chevron-back" size={28} color={"#4cb050"} />
      <View className="flex-row items-end gap-3">
        <Text className="text-2xl text-primary font-bold">This month</Text>
      </View>
      <Ionicons name="chevron-forward" size={28} color={"#4cb050"} />
    </View>
  );
};

export default FilterSection;