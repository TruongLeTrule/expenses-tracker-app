import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useStore from "../data/useStore";

export default function ProfileDetail({ navigation }) {
	const userInfo = useStore((state) => state.userInfo);
	return (
		<View style={styles.info}>
			<View style={styles.section}>
				<Text style={styles.bold}>Name:</Text>
				<Text style={styles.userInfo}>
					{userInfo.name.firstname} {userInfo.name.lastname}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.bold}>Username:</Text>
				<Text style={styles.userInfo}>{userInfo.username}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.bold}>Email:</Text>
				<Text style={styles.userInfo}>{userInfo.email}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.bold}>Phone:</Text>
				<Text style={styles.userInfo}>{userInfo.phone}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.bold}>Address:</Text>
				<Text style={styles.userInfo}>
					{userInfo.address.number}, {userInfo.address.street},{" "}
					{userInfo.address.city}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.bold}>Zip code:</Text>
				<Text style={styles.userInfo}>{userInfo.address.zipcode}</Text>
			</View>
			<TouchableOpacity
				style={styles.editProfileButton}
				onPress={() => navigation.navigate("Edit Profile")}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 20,
						color: "white",
						fontWeight: "bold",
					}}>
					Edit Profile
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	info: {
		flex: 1,
		width: "100%",
	},
	section: {
		margin: 10,
		paddingLeft: 20,
	},
	bold: {
		fontSize: 17,
		fontWeight: "bold",
	},
	userInfo: {
		fontSize: 16,
		fontStyle: "italic",
	},
	editProfileButton: {
		backgroundColor: "rgb(40, 230, 40)",
		width: "40%",
		height: "7%",
		marginLeft: "auto",
		marginRight: "auto",
		display: "flex",
		justifyContent: "center",
		borderRadius: 20,
	},
});
