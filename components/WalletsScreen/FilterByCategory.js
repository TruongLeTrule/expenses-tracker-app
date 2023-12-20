import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";

import useStore from "../../data/useStore";

import CategoryModal from "../CategoryModal";
import { titles, icons } from "../template";

const FilterByCategory = () => {
  const allExpenses = useStore((state) => state.allExpenses);
  const filteredExpenses = useStore((state) => state.filteredExpenses);
  const setFilteredExpenses = useStore((state) => state.setFilteredExpenses);
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );

  const [categoryPickVisible, setCategoryPickVisible] = useState(false);
  const [category, setCategory] = useState("food");

  //   Handle apply change
  const handleApplyChange = () => {
    if (allExpenses) {
      // If there are already filtered expenses, use it to filter
      const chosenExpenses = filteredExpenses ? filteredExpenses : allExpenses;

      const newExpenses = chosenExpenses.filter(
        (expense) => expense.category === category
      );
      setFilteredExpenses(newExpenses);
    } else {
      Alert.alert("Error", "There is no expenses to filter");
    }

    console.log("Filter expenses by category: ");
    setCategoryPickVisible(false);
  };

  return (
    <View className="flex-row items-center justify-center mt-2">
      <TouchableOpacity
        className="flex-row justify-center items-center"
        onPress={() => {
          setCategoryPickVisible(true);
          toggleCategoryModalVisible();
        }}
      >
        <Text className="text-lg font-bold mr-2">By category</Text>
        <Ionicons name="grid" size={25} />
      </TouchableOpacity>

      {/* Pick category modal */}
      <Modal
        isVisible={categoryPickVisible}
        onBackdropPress={() => setCategoryPickVisible(false)}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-[#fff]  w-4/6 rounded-lg p-4 justify-center items-center">
          <TouchableOpacity
            className="flex-row justify-center items-center"
            onPress={toggleCategoryModalVisible}
          >
            <View className="rounded-full h-10 w-10 flex items-center justify-center bg-light-green">
              <Ionicons name={icons[category]} size={28} />
            </View>
            <Text className="text-xl font-bold ml-2">{titles[category]}</Text>
          </TouchableOpacity>

          {/* Apply filter button */}
          <TouchableOpacity
            className="bg-primary rounded-lg p-2 justify-center items-center w-14 mt-5"
            onPress={handleApplyChange}
          >
            <Text className="text-[#fff] font-bold text-normal">Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Category modal */}
      <CategoryModal setCategory={setCategory} />
    </View>
  );
};

export default FilterByCategory;
