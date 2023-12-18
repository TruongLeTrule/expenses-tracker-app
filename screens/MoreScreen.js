import { View, Text, Button } from "react-native";
import React from "react";

import useStore from "../data/useStore";
import useLocal from "../data/localData";

export default function MoreScreen() {
  const { removeLocalUID } = useLocal();

  const uid = useStore((state) => state.uid);
  const setUID = useStore((state) => state.setUID);

  const handleSignOut = () => {
    setUID(null);
    removeLocalUID();
    console.log("Removed local UID");
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
