import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddButton = ({ onPress }) => (
	<TouchableOpacity
		className="w-70 h-14 rounded-full bg-primary flex-row items-center p-2"
		onPress={onPress}>
		<Ionicons
			name={"add"}
			size={30}
			color={"#fff"}
		/>
		<Text className="font-bold text-xl text-[#fff] ml-1 mr-2">Add Budget</Text>
	</TouchableOpacity>
);
export default AddButton;
