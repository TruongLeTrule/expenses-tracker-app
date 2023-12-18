import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import WhiteBox from "./WhiteBox";
import { commafy } from "../formatCurrency";

const Header = ({ total }) => {
  return (
    <View className="bg-primary h-40 px-4 justify-center">
      <WhiteBox>
        <View className="flex-row items-center gap-3">
          <View className="bg-dark-green rounded-full h-11 w-11 flex items-center justify-center">
            <Ionicons name="cash" size={24} color={"#fff"} />
          </View>
          <Text className="text-2xl text-grey-text font-normal">Cash</Text>
        </View>
        <Text
          className="text-4xl text-danger-red font-bold mt-2"
          numberOfLines={1}
        >
          {total ? `-${commafy(total)}` : 0}₫
        </Text>
      </WhiteBox>
    </View>
  );
};

export default Header;
