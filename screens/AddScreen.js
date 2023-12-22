import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AddTransactionModal from "../components/WalletsScreen/AddTransactionModal";

const AddScreen = () => {
  const navigation = useNavigation();

  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  return (
    <View className="flex-1">
      {/* Heading section */}
      <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
        <View></View>
        <Text className="text-2xl font-bold ml-7">Create transaction</Text>
        <Pressable onPress={() => navigation.navigate("MainBottomTab")}>
          <Ionicons name="close-sharp" size={32} color={"#eb3700"} />
        </Pressable>
      </View>

      {/* Option */}
      <View className="items-center justify-center flex-1">
        {/* Add expense */}
        <Pressable
          className="rounded-full bg-primary w-32 h-14 items-center justify-center"
          onPress={() => {
            setTransactionType("out");
            setTransactionModalVisible(true);
          }}
        >
          <Text className="text-xl font-bold text-[#fff]">Expense</Text>
        </Pressable>
        {/* Add income */}
        <Pressable
          className="rounded-full bg-primary w-32 h-14 items-center justify-center mt-6"
          onPress={() => {
            setTransactionType("in");
            setTransactionModalVisible(true);
          }}
        >
          <Text className="text-xl font-bold text-[#fff]">Income</Text>
        </Pressable>
      </View>

      <AddTransactionModal
        transactionModalVisible={transactionModalVisible}
        setTransactionModalVisible={setTransactionModalVisible}
        type={transactionType}
      />
    </View>
  );
};

export default AddScreen;
