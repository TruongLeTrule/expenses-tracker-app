import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useState } from "react";

import useStore from "../../data/useStore";

import WhiteBox from "./WhiteBox";
import FilterByDate from "./FilterByDate";
import FilterByCategory from "./FilterByCategory";
import { commafy } from "../formatCurrency";

const Header = ({ total }) => {
	const setFilteredList = useStore((state) => state.setFilteredList);

	const [filterModalVisible, setFilterModalVisible] = useState(false);

	return (
		<View className="bg-primary h-40 px-4 justify-center">
			<WhiteBox style={{ position: "relative" }}>
				<View className="flex-row justify-between">
					{/* Wallet group */}
					<View>
						<View className="flex-row items-center gap-3">
							<View className="bg-dark-green rounded-full h-11 w-11 flex items-center justify-center">
								<Ionicons
									name="cash"
									size={24}
									color={"#fff"}
								/>
							</View>
							<Text className="text-2xl text-grey-text font-normal">Cash</Text>
						</View>
						<Text
							className="text-4xl font-bold mt-2"
							style={{ color: total < 0 ? "#f04433" : "#4cb050" }}
							numberOfLines={1}>
							{commafy(total)}₫
						</Text>
					</View>

					{/* Filter button */}
					<Pressable
						className="rounded-full h-11 w-11 flex items-center justify-center"
						onPress={() => setFilterModalVisible(true)}
						style={{ position: "absolute", top: 0, right: 0 }}>
						<Ionicons
							name="filter"
							size={40}
							color={"#4cb050"}
						/>
					</Pressable>
				</View>
			</WhiteBox>

			{/* Filter modal */}
			<Modal
				isVisible={filterModalVisible}
				onBackdropPress={() => setFilterModalVisible(false)}
				animationIn={"fadeIn"}
				animationOut={"fadeOut"}
				className="flex-1 justify-center items-center">
				<View className="bg-[#fff] justify-center items-center w-4/6 rounded-lg p-6">
					{/* Title */}
					<View className="flex-row justify-center items-center">
						<Text className="text-2xl text-primary font-bold mr-2">Filter</Text>
						<Ionicons
							name="filter"
							size={32}
							color={"#4cb050"}
						/>
					</View>

					{/* Settings group */}
					<View className="mt-6">
						{/* Filter by date */}
						<FilterByDate />

						{/* Filter by category */}
						<FilterByCategory />

						{/* Show all */}
						<TouchableOpacity
							className="flex-row justify-center items-center mt-2"
							onPress={() => {
								setFilteredList(null);
								setFilterModalVisible(false);
							}}>
							<Text className="text-lg font-bold mr-2">Show all</Text>
							<Ionicons
								name="eye"
								size={25}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default Header;
