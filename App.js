import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogSignStack from "./screens/LogSignStack";
import MainBottomTab from "./screens/MainBottomTab";
import AddScreen from "./screens/AddScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Thay đổi tên stack screen để coi các phần khác */}
      <Stack.Navigator initialRouteName="LoginSignStack">
        <Stack.Screen
          name="LogSignStack"
          component={LogSignStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainBottomTab"
          component={MainBottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
