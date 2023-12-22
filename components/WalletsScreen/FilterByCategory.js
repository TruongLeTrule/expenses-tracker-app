import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";

import useStore from "../../data/useStore";

import CategoryModal from "../CategoryModal";
import { titles, icons } from "../template";

const FilterByCategory = () => {
  const allExpenses = useStore((state) => state.allExpenses);
  const allIncomes = useStore((state) => state.allIncomes);
  const filteredList = useStore((state) => state.filteredList);
  const setFilteredList = useStore((state) => state.setFilteredList);
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );

  const [categoryPickVisible, setCategoryPickVisible] = useState(false);
  const [typePickVisible, setTypePickVisible] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");

  // Set default category by type
  useEffect(() => {
    setCategory(transactionType === "out" ? "food" : "salary");
  }, [transactionType]);

  //   Handle apply change
  const handleApplyChange = () => {
    if (allExpenses || allIncomes) {
      if (transactionType === "out") {
        // If there are already filtered list, use it to filter
        let chosenExpenses;
        if (filteredList) {
          // If all items type are "in", assign array again
          const oppositeType = filteredList.every((item) => item.type === "in");
          if (oppositeType) {
            chosenExpenses = allExpenses;
          } else {
            chosenExpenses = filteredList;
          }
        } else {
          chosenExpenses = allExpenses;
        }

        // Filter the list by chosen category
        const newExpenses = chosenExpenses.filter((expense) => {
          if (category === "all") {
            return expense.type === transactionType;
          } else {
            return (
              expense.category === category && expense.type === transactionType
            );
          }
        });
        setFilteredList(newExpenses);
      } else if (transactionType === "in") {
        // If there are already filtered list, use it to filter
        let chosenIncomes;
        if (filteredList) {
          // If all items type are "out", assign array again
          const oppositeType = filteredList.every(
            (item) => item.type === "out"
          );
          if (oppositeType) {
            chosenIncomes = allIncomes;
          } else {
            chosenIncomes = filteredList;
          }
        } else {
          chosenIncomes = allIncomes;
        }

        const newIncomes = chosenIncomes.filter((income) => {
          if (category === "all") {
            return income.type === transactionType;
          } else {
            return (
              income.category === category && income.type === transactionType
            );
          }
        });
        setFilteredList(newIncomes);
      }
    }

    console.log("Filter transactions by category");
    setCategoryPickVisible(false);
    setTypePickVisible(false);
  };

  return (
    <View className="flex-row items-center justify-center mt-2">
      <TouchableOpacity
        className="flex-row justify-center items-center"
        onPress={() => setTypePickVisible(true)}
      >
        <Text className="text-lg font-bold mr-2">By category</Text>
        <Ionicons name="grid" size={25} />
      </TouchableOpacity>

      {/* Pick type modal */}
      <Modal
        isVisible={typePickVisible}
        onBackdropPress={() => setTypePickVisible(false)}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-[#fff] w-1/2 rounded-lg p-4 justify-center items-center">
          {/* Add expense */}
          <Pressable
            className="rounded-full bg-primary w-24 h-10 items-center justify-center"
            onPress={() => {
              setTransactionType("out");
              setCategoryPickVisible(true);
              toggleCategoryModalVisible();
            }}
          >
            <Text className="text-lg font-bold text-[#fff]">Expense</Text>
          </Pressable>
          {/* Add income */}
          <Pressable
            className="rounded-full bg-primary w-24 h-10 items-center justify-center mt-4"
            onPress={() => {
              setTransactionType("in");
              setCategoryPickVisible(true);
              toggleCategoryModalVisible();
            }}
          >
            <Text className="text-lg font-bold text-[#fff]">Income</Text>
          </Pressable>
        </View>
      </Modal>

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
      <CategoryModal
        setCategory={setCategory}
        type={transactionType}
        filter={true}
      />
    </View>
  );
};

export default FilterByCategory;
