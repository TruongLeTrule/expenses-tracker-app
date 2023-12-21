import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import useStore from "../data/useStore";
import { icons, titles, categories } from "./template";
import { FlatList } from "react-native-gesture-handler";

const CategoryModal = ({ setCategory }) => {
  const categoryModalVisible = useStore((state) => state.categoryModalVisible);
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );

  const handlePress = (category) => {
    setCategory(category);
    toggleCategoryModalVisible();
  };

  return (
    <Modal
      isVisible={categoryModalVisible}
      onBackdropPress={toggleCategoryModalVisible}
      className="flex-1 m-0 justify-end"
      onBackButtonPress={toggleCategoryModalVisible}
    >
      <View className="bg-[#d1d1d1] rounded-t-xl h-full">
        {/* Heading section */}
        <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
          <Pressable onPress={toggleCategoryModalVisible}>
            <Ionicons name="chevron-down" size={35} color={"#4cb050"} />
          </Pressable>
          <Text className="text-2xl font-bold">Select Category</Text>
          <Text></Text>
        </View>

        {/* Body */}
        <View className="pb-28">
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="px-6">
                <TouchableOpacity
                  className="flex-row items-center mt-6 bg-[#fff] py-4 px-7 rounded-xl"
                  onPress={() => handlePress(item)}
                >
                  <View className="flex-row items-center gap-6">
                    <View className="rounded-full h-14 w-14 flex items-center justify-center bg-light-green">
                      <Ionicons name={icons[item]} size={34} />
                    </View>
                    <Text className="text-2xl font-bold">{titles[item]}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
