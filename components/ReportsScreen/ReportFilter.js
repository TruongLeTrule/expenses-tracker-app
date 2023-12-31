import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import useStore from "../../data/useStore";

function ReportFilter({
	handleReportByDay,
	handleReportByMonth,
	handleReportByYear,
}) {
	let reportFilterVisible = useStore((state) => state.reportFilterVisible);
	let setReportFilterVisible = useStore(
		(state) => state.setReportFilterVisible,
	);
	return (
		<Modal
			isVisible={reportFilterVisible}
			onBackdropPress={() => setReportFilterVisible(false)}
			onSwipeComplete={() => setReportFilterVisible(false)}
			onBackButtonPress={() => setReportFilterVisible(false)}
			className="flex-1 m-0 justify-end">
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.filterButton}
					onPress={handleReportByDay}>
					<Text style={styles.textStyle}>Reports by Day</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.filterButton}
					onPress={handleReportByMonth}>
					<Text style={styles.textStyle}>Reports by Month</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.filterButton}
					onPress={handleReportByYear}>
					<Text style={styles.textStyle}>Reports by Year</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

export default ReportFilter;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: "100%",
		height: 600,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	filterButton: {
		backgroundColor: "#4cb050",
		borderStyle: "solid",
		padding: 20,
		borderRadius: 20,
		margin: 50,
		width: 220,
		height: 75,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	textStyle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
});
