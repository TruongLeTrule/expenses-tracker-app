import { View } from "react-native";

const WhiteBox = ({ children, mt }) => {
  return (
    <View className={`bg-[#fff] w-full py-3 px-4 rounded-2xl ${mt ? mt : ""}`}>
      {children}
    </View>
  );
};

export default WhiteBox;
