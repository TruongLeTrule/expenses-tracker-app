import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WalletsScreen from "./WalletsScreen";
import BudgetsScreen from "./BudgetsScreen";
import AddScreen from "./AddScreen";
import ReportsScreen from "./ReportsScreen";
import MoreScreen from "./MoreScreen";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function MainBottomTab() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Wallets"
      screenOptions={{
        tabBarActiveTintColor: "#4cb050",
        tabBarLabelStyle: {
          fontSize: 17,
          marginBottom: 10
        },
        tabBarStyle: {
          height: 80,
          borderTopColor: 'gray',
          borderTopWidth: 0.5
        },
        tabBarIconStyle: {
          marginTop: 10
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Wallets"
        component={WalletsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" color={color} size={34} />
          ),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              className="bg-primary shadow-md rounded-full h-16 w-16 flex items-center justify-center"
              style={{ marginTop: 8 }}
              onPress={() => {
                navigation.navigate("AddModal");
              }}
            >
              <Ionicons name="add" color={"#fff"} size={34} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" color={color} size={33} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu-outline" color={color} size={47} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
