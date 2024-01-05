import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import Modal from "react-native-modal";
import TimeRangeBottomSheet from "./TimeRangeBottomSheet";
import CustomBudgetButton from "./CustomBudgetButton";
import CategoryScreen from "./CategoryScreen";
import BottomSheetTextInput from "./BottomSheetTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import getDate from "./getDate";
import useStore from "../../data/useStore";
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { icons, titles } from "../template";

const BottomSheet = ({ onPress, title }) => {
	const [timeVisible, setTimeVisible] = useState(false);
	const [categoryVisible, setCategoryVisible] = useState(false);
	const [alertVisible, setAlertVisible] = useState(false);
	const budgetId = useStore((state) => state.budgetId);
	const budgetName = useStore((state) => state.budgetName);
	const budgetAmount = useStore((state) => state.budgetAmount);
	const budgetTime = useStore((state) => state.budgetTime);
	const budgetCategory = useStore((state) => state.budgetCategory);
	const editMode = useStore((state) => state.editMode);
	const time = useStore((state) => state.time);
	const uid = useStore((state) => state.uid);
	const data = useStore((state) => state.data);
	const updateTimeRangeTitle = (selectedText) => {
		useStore.setState({ budgetTime: selectedText });
		setTimeVisible(false);
	};

	{
		/* Get date */
	}
	const [firstDay, lastDay] = getDate(budgetTime);
	const firstDate = new Date(firstDay);
	const lastDate = new Date(lastDay);

	{
		/* Update Category */
	}
	const updateCategoryTitle = (selectedText) => {
		useStore.setState({ budgetCategory: selectedText });
		setCategoryVisible(false);
	};

	{
		/* Save Budget */
	}
	const saveBudget = async () => {
		if (
			budgetName === "" ||
			budgetAmount === "0" ||
			budgetTime === "Time Range" ||
			budgetCategory === "Categories"
		) {
			Alert.alert("Please fill all the fields");
		} else {
			try {
				const queryData = collection(db, "Budget");
				if (editMode) {
					const budgetDocRef = doc(queryData, budgetId);
					await updateDoc(budgetDocRef, {
						name: budgetName,
						value: Number(budgetAmount),
						category: budgetCategory,
						uid: uid,
						timerange: {
							start: firstDate,
							end: lastDate,
							type: budgetTime,
						},
					});

					// Update the budget
					const newData = [...useStore.getState().data];
					const index = newData.findIndex((obj) => obj.id === budgetId);
					newData[index] = {
						id: budgetId,
						name: budgetName,
						value: Number(budgetAmount),
						category: budgetCategory,
						uid: uid,
						timerange: {
							start: firstDate,
							end: lastDate,
							type: budgetTime,
						},
					};
					// Sort newData based on custom order
					newData.sort((a, b) => {
						const orderA = time.indexOf(a.timerange?.type);
						const orderB = time.indexOf(b.timerange?.type);
						return orderA - orderB;
					});
					useStore.setState({ data: newData, modalVisible: false });
					useStore.setState({
						budgetId: "",
						budgetName: "",
						budgetTime: "Time Range",
						budgetCategory: "Categories",
						budgetAmount: "0",
					});
					Alert.alert("Budget updated successfully");
					return;
				} else {
					const newBudgetDocRef = await addDoc(queryData, {
						name: budgetName,
						value: Number(budgetAmount),
						category: budgetCategory,
						uid: uid,
						timerange: {
							start: firstDate,
							end: lastDate,
							type: budgetTime,
						},
					});

					const newId = newBudgetDocRef.id;
					// Use the spread operator with the previous data
					const newData = [
						...useStore.getState().data,
						{
							id: newId,
							name: budgetName,
							value: Number(budgetAmount),
							category: budgetCategory,
							uid: uid,
							timerange: {
								start: firstDate,
								end: lastDate,
								type: budgetTime,
							},
						},
					];

					// Sort newData based on custom order
					newData.sort((a, b) => {
						const orderA = time.indexOf(a.timerange?.type);
						const orderB = time.indexOf(b.timerange?.type);
						return orderA - orderB;
					});

					// Update the state using the setState function
					useStore.setState({ data: newData, modalVisible: false });
					useStore.setState({
						budgetName: "",
						budgetTime: "Time Range",
						budgetCategory: "Categories",
						budgetAmount: "0",
					});

					Alert.alert("Budget created successfully");
				}
			} catch (error) {
				console.error("Error adding document: ", error);
			}
		}
	};

	const handleDeleteBtnPress = async () => {
		const queryData = collection(db, "Budget");
		try {
			const budgetDocRef = doc(queryData, budgetId);
			await deleteDoc(budgetDocRef);
			// Update the budget
			const newData = useStore
				.getState()
				.data.filter((item) => item.id !== budgetId);
			useStore.setState({ data: newData });
			// Sort newData based on custom order
			newData.sort((a, b) => {
				const orderA = time.indexOf(a.timerange?.type);
				const orderB = time.indexOf(b.timerange?.type);
				return orderA - orderB;
			});
			useStore.setState({ data: newData, modalVisible: false });
			useStore.setState({
				budgetId: "",
				budgetName: "",
				budgetTime: "Time Range",
				budgetCategory: "Categories",
				budgetAmount: "0",
			});
			Alert.alert("Budget deleted successfully");
			return;
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	};

	return (
		<View className="bg-[#d1d1d1] rounded-t-xl h-3/4">
			<View style={styles.detailContainer}>
				<View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
					<Ionicons
						name="chevron-down-outline"
						size={40}
						color="#4cb050"
						style={styles.icon}
						onPress={onPress}
					/>
					<Text style={styles.titleText}>{title}</Text>
					{editMode && (
						<TouchableOpacity onPress={() => setAlertVisible(true)}>
							<Ionicons
								name="trash-outline"
								size={30}
								color={"#eb3700"}
							/>
						</TouchableOpacity>
					)}
					{/* Delete confirm alert */}
					<Modal
						isVisible={alertVisible}
						onBackdropPress={() => setAlertVisible(false)}
						animationIn={"fadeIn"}
						animationOut={"fadeOut"}
						className="flex-1 justify-center items-center">
						<View className="bg-[#fff] justify-center items-center w-4/6 rounded-lg p-6">
							{/* Title */}
							<Text className="text-lg font-bold">Are you sure to delete?</Text>
							{/* Cancel button */}
							<View className="flex-row justify-between w-4/5 mt-5">
								<TouchableOpacity
									className="bg-[#d1d1d1] rounded-lg p-2"
									onPress={() => setAlertVisible(false)}>
									<Text className="text-[#fff] font-bold">Cancel</Text>
								</TouchableOpacity>
								{/* Confirm button */}
								<TouchableOpacity
									className="bg-[#eb3700] rounded-lg p-2"
									onPress={handleDeleteBtnPress}>
									<Text className="text-[#fff] font-bold">Delete</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</View>
				<View className="bg-[#fff] rounded-xl mt-16 p-6">
					<BottomSheetTextInput
						//link='https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/rename-5.png'
						placeholder="Budget Name"
						value={budgetName}
						onChangeText={(budgetName) =>
							useStore.setState({ budgetName: budgetName })
						}
					/>
					{/* Expense input */}
					<View className="flex-row items-center gap-4">
						<View className="rounded-full h-12 w-12 flex items-center justify-center bg-dark-green">
							<Ionicons
								name="cash"
								size={27}
								color={"#fff"}
							/>
						</View>
						<View>
							<Text className="text-base text-grey-text">Amount</Text>
							<View className="flex-row">
								<TextInput
									className={`font-bold  text-2xl`}
									value={String(budgetAmount)}
									keyboardType="numeric"
									onChangeText={(text) =>
										useStore.setState({
											budgetAmount: Number(text.replace(/[^0-9]/g, "")),
										})
									}
								/>
								<Text className={`font-bold  text-2xl`}>₫</Text>
							</View>
						</View>
					</View>

					<CustomBudgetButton
						title={budgetTime}
						icon="today"
						onPress={() => {
							setTimeVisible(true);
						}}
					/>
					<CustomBudgetButton
						title={
							budgetCategory === "Categories"
								? "Categories"
								: titles[budgetCategory]
						}
						icon={
							budgetCategory === "Categories" ? "grid" : icons[budgetCategory]
						}
						onPress={() => {
							setCategoryVisible(true);
						}}
					/>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={timeVisible}
					className="flex-1 m-0 justify-end"
					onRequestClose={() => {
						setTimeVisible(!timeVisible);
					}}>
					{/* Pass the callback function to update the title */}
					<TimeRangeBottomSheet onPress={updateTimeRangeTitle} />
				</Modal>

				<Modal
					animationType="slide"
					transparent={true}
					visible={categoryVisible}
					className="flex-1 m-0 justify-end"
					onRequestClose={() => {
						setCategoryVisible(!categoryVisible);
					}}>
					<CategoryScreen onPress={updateCategoryTitle} />
				</Modal>

				{/* Submit */}
				<View className="items-center mt-8">
					<TouchableOpacity
						className="w-36 h-14 rounded-full bg-primary flex-row justify-center items-center"
						onPress={saveBudget}>
						<Ionicons
							name={"save"}
							size={30}
							color={"#fff"}
						/>
						<Text className="font-bold text-2xl text-[#fff] ml-2">Save</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
export default BottomSheet;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	detailContainer: {
		borderRadius: 10,
	},
	titleText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "black",
		marginLeft: 120,
	},
	icon: {
		position: "absolute",
		left: 20,
	},
});
