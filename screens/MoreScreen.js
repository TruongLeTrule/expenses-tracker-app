import { View, Text, Button } from "react-native";
import React from "react";

import useStore from "../data/useStore";
import useLocal from "../data/localData";

export default function MoreScreen() {
  const { removeLocalUID, removeLocalExpenses, removeLocalIncomes } =
    useLocal();

  const setUID = useStore((state) => state.setUID);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const setFilteredList = useStore((state) => state.setFilteredList);

  const handleSignOut = async () => {
    setUID(null);
    setAllExpenses(null);
    setAllIncomes(null);
    setFilteredList(null);
    await removeLocalUID();
    await removeLocalExpenses();
    await removeLocalIncomes();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Sign out</Text>
      <Button
        title="Sign out"
        onPress={handleSignOut}
        color={"#f04433"}
      ></Button>
    </View>
  );
}
