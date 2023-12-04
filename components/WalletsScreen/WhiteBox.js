import { View, Text } from "react-native";
import React from "react";

const WhiteBox = ({ children, mt }) => {
  return (
    <View className={`bg-[#fff] w-full py-3 px-4 rounded-2xl ${mt ? mt : ""}`}>
      {children}
    </View>
  );
};

export default WhiteBox;
