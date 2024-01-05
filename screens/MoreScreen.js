import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	StyleSheet,
	Image,
	Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import useStore from "../data/useStore";
import useLocal from "../data/localData";
import useFetch from "../data/fetchData";

export default function MoreScreen({ navigation }) {
	const { removeAllLocalData, setLocalAva, getLocalAva } = useLocal();

	const { uploadAva, downloadAva, getUserInfoFroDB } = useFetch();

	const setUID = useStore((state) => state.setUID);
	const setAllExpenses = useStore((state) => state.setAllExpenses);
	const setAllIncomes = useStore((state) => state.setAllIncomes);
	const setFilteredList = useStore((state) => state.setFilteredList);
	const setRenderList = useStore((state) => state.setRenderList);
	const userInfo = useStore((state) => state.userInfo);
	const setUserInfo = useStore((state) => state.setUserInfo);
	const avaURI = useStore((state) => state.avaURI);
	const setAvaURI = useStore((state) => state.setAvaURI);
	const uid = useStore((state) => state.uid);

	useEffect(() => {
		(async () => {
			// If there no avatar, get from local
			if (!avaURI) {
				const localAvatar = await getLocalAva();
				// If no URL in local, get from db
				if (localAvatar) {
					setAvaURI(localAvatar);
				} else {
					const cloudAvatar = await downloadAva();
					if (cloudAvatar) {
						setAvaURI(cloudAvatar);
						setLocalAva(cloudAvatar);
					}
				}
			}
			if (!userInfo) {
				await getUserInfoFroDB(uid);
			}
		})();
	}, []);

	const clearStoreData = () => {
		setUID(null);
		setAllExpenses(null);
		setAllIncomes(null);
		setFilteredList(null);
		setRenderList(null);
		setAvaURI(null);
		setUserInfo(null);
	};

	const handleSignOut = async () => {
		await auth
			.signOut()
			.then(() => Alert.alert("Logged out successfully"))
			.catch((error) => Alert.alert(error.message));
		clearStoreData();
		await removeAllLocalData();
	};

	const handleChangeAvatar = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("You are not allowed to access gallery");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			const imgURL = await uploadAva(result.assets[0].uri);
			if (imgURL) {
				setAvaURI(imgURL);
				setLocalAva(imgURL);
			}
		}
	};

	return (
		<View className="flex-1 items-center justify-center">
			{/*Insert user's image */}
			<Pressable
				style={styles.ImagePlaceHolder}
				onPress={handleChangeAvatar}>
				{avaURI ? (
					<Image
						source={{ uri: avaURI }}
						className="flex-1 w-full h-full rounded-full"
					/>
				) : (
					<Ionicons
						name="person"
						size={55}
					/>
				)}
			</Pressable>

			{/*Insert user's username */}
			{userInfo?.username && (
				<Text style={styles.userNamePlaceHolder}>{userInfo?.username}</Text>
			)}
			<TouchableOpacity
				style={[
					styles.Btn,
					{
						backgroundColor: "white",
						borderColor: "#4cb050",
						borderWidth: 1,
					},
				]}
				onPress={() => navigation.navigate("Profile")}>
				<Text style={[styles.signOut, { color: "#4cb050" }]}>Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.Btn,
					{
						backgroundColor: "white",
						borderColor: "#4cb050",
						borderWidth: 1,
					},
				]}
				onPress={() => navigation.navigate("Change Password")}>
				<Text style={[styles.signOut, { color: "#4cb050" }]}>
					Change Password
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.Btn,
					{
						backgroundColor: "white",
						borderColor: "#4cb050",
						borderWidth: 1,
					},
				]}
				onPress={() =>
					Alert.alert("Using this app for commercial purposes is not allowed")
				}>
				<Text style={[styles.signOut, { color: "#4cb050" }]}>
					Terms & Policies
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.Btn,
					{
						backgroundColor: "white",
						borderColor: "#4cb050",
						borderWidth: 1,
					},
				]}
				onPress={() =>
					Alert.alert(
						"This app is created by L.Q.Truong, P.M.Triet and N.Q.Vu of UIT",
					)
				}>
				<Text style={[styles.signOut, { color: "#4cb050" }]}>About Us</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.Btn}
				onPress={handleSignOut}>
				<Text style={styles.signOut}>LOG OUT</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	Btn: {
		width: "60%",
		height: 50,
		backgroundColor: "#4cb050",
		borderRadius: 50,
		justifyContent: "center",
		marginBottom: 20,
	},
	signOut: {
		textAlign: "center",
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	ImagePlaceHolder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#d6d6d6",
	},
	userNamePlaceHolder: {
		fontSize: 30,
		marginBottom: 20,
		fontWeight: "bold",
	},
});
