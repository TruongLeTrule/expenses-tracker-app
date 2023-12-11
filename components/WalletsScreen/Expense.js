import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Expense({ category, value, handlePress }) {
  const icons = {
    food: "fast-food",
    drink: "wine",
    vehicle: "car",
    education: "school",
    clothing: "shirt",
    relax: "game-controller",
    healthCare: "heart-circle",
    other: "storefront",
  };

  const titles = {
    food: "Food",
    drink: "Drink",
    vehicle: "Vehicle",
    education: "Education",
    clothing: "Clothing",
    relax: "Relax",
    healthCare: "Health Care",
    other: "Other",
  };

  return (
    <Pressable
      className="flex-row justify-between items-center mt-4"
      onPress={handlePress}
    >
      <View className="flex-row justify-between items-center gap-4">
        <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
          <Ionicons name={icons[category]} size={27} />
        </View>
        <Text className="text-xl font-thin">{titles[category]}</Text>
      </View>
      <Text className="font-bold  text-xl text-danger-red">-{value}₫</Text>
    </Pressable>
  );
}
