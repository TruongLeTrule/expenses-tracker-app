import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import LogSignStack from "./screens/LogSignStack";
import MainBottomTab from "./screens/MainBottomTab";
import AddScreen from "./screens/AddScreen";

import useStore from "./data/useStore";
import useLocal from "./data/localData";

const Stack = createStackNavigator();

export default function App() {
  const { getLocalUID, getLocalExpenses, getLocalIncomes } = useLocal();

  const [isLoading, setIsLoading] = useState(false);

  const uid = useStore((state) => state.uid);
  const setUID = useStore((state) => state.setUID);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const setSortDateExpenses = useStore((state) => state.setSortDateExpenses);

  // Get data from local storage
  const getDataFromLocal = async () => {
    setIsLoading(true);

    const localUID = await getLocalUID();
    const localExpenses = await getLocalExpenses();
    const localIncomes = await getLocalIncomes();

    // Check if user has already logged in or not
    if (localUID) {
      setUID(localUID);
      console.log(`User: ${localUID} logged in`);
    } else {
      console.log("No uid in storage");
    }

    // Check if there is already expenses in storage
    if (localExpenses) {
      if (localExpenses.length) {
        setAllExpenses(localExpenses);
        console.log(`${localExpenses.length} expenses in storage`);
      } else {
        console.log("No expenses in storage");
      }
    } else {
      console.log("No expenses in storage");
    }

    // Check if there is already incomes in storage
    if (localIncomes) {
      if (localIncomes.length) {
        setAllIncomes(localIncomes);
        console.log(`${localIncomes.length} incomes in storage`);
      } else {
        console.log("No incomes in storage");
      }
    } else {
      console.log("No incomes in storage");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromLocal();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!uid ? (
            <Stack.Screen name="LogSignStack" component={LogSignStack} />
          ) : (
            <>
              <Stack.Group>
                <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="AddModal" component={AddScreen} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
