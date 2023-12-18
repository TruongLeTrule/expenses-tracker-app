import { View, Text } from "react-native";
import React from "react";

import { commafy } from "../formatCurrency";

const Overall = ({ total }) => {
  return (
    //  <View className="flex-row justify-between">
    //         <Text className="text-xl ">Income</Text>
    //         <Text className="text-xl text-primary">0₫</Text>
    //       </View>
    //        <View className="flex-row justify-between border-t pt-2 mt-2">
    //         <Text className="text-xl">Total</Text>
    //         <Text className="text-xl">0₫</Text>
    //       </View>
    <View className="flex-row justify-between">
      <Text className="text-xl">Total</Text>
      <Text className="text-xl text-danger-red font-bold" numberOfLines={1}>
        {total ? `-${commafy(total)}` : 0}₫
      </Text>
    </View>
  );
};

export default Overall;