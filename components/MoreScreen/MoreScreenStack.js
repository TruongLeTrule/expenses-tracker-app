import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../../screens/MoreScreen";
import ChangePasswordScreen from "../../screens/ChangePasswordScreen";
import EditProfile from "../../screens/EditProfile";
import ProfileDetail from "../../screens/ProfileDetail";
import useStore from "../../data/useStore";

const Stack = createStackNavigator();
export default function MoreScreenStack() {
	const userInfo = useStore((state) => state.userInfo);
	const setUserInfo = useStore((state) => state.setUserInfo);

	useEffect(() => {
		//functions to retrieve user's data from database
		//after getting data, set the data to state:
		//setUserInfo(data)
	}, [userInfo]);
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="MoreScreen"
				component={MoreScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Profile" component={ProfileDetail} />
			<Stack.Screen name="Edit Profile" component={EditProfile} />
			<Stack.Screen name="Change Password" component={ChangePasswordScreen} />
		</Stack.Navigator>
	);
}
