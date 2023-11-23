import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogSignStack from "./screens/LogSignStack"
import MainBottomTab from "./screens/MainBottomTab";


const Stack = createStackNavigator();

export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSignStack" screenOptions={{ headerShown: false }}>{/* Thay đổi tên stack screen để coi các phần khác */}
        <Stack.Screen
          name="LogSignStack"
          component={LogSignStack}
        />
        <Stack.Screen
          name="MainBottomTab"
          component={MainBottomTab}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
