import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "./LoginScreen"
import SignUpScreen from "./SignUpScreen"

const Stack = createStackNavigator();

export default function LogSignStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
    )
}