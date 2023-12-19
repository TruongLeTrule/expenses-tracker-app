import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

import useFetch from "../data/fetchData";
import useStore from "../data/useStore";

import Header from "../components/WalletsScreen/Header";
import FilterSection from "../components/WalletsScreen/FilterSection";
import DayOverall from "../components/WalletsScreen/DayOverall";
import Expense from "../components/WalletsScreen/Expense";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import Overall from "../components/WalletsScreen/Overall";
import EditModal from "../components/WalletsScreen/EditModal";

export default function Wallets() {
  const { getAllExpenses } = useFetch();

  const sortDateExpenses = useStore((state) => state.sortDateExpenses);
  const total = useStore((state) => state.total);
  const isLoadingInWalletScreen = useStore(
    (state) => state.isLoadingInWalletScreen
  );
  const allExpenses = useStore((state) => state.allExpenses);
  const setSortDateExpenses = useStore((state) => state.setSortDateExpenses);
  const setTotal = useStore((state) => state.setTotal);
  const uid = useStore((state) => state.uid);

  const [chevronType, setChevronType] = useState("chevron-up");

  const height = useSharedValue(100);

  const handleListVisible = () => {
    if (height.value === 100) {
      height.value = withTiming(height.value - 100, {
        duration: 340,
        easing: Easing.inOut(Easing.quad),
      });
      setChevronType("chevron-down");
    }
    if (height.value === 0) {
      height.value = withTiming(height.value + 100, {
        duration: 340,
        easing: Easing.inOut(Easing.quad),
      });
      setChevronType("chevron-up");
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
  }));

  useEffect(() => {
    if (!allExpenses) {
      getAllExpenses(uid);
    }
  }, []);

  useEffect(() => {
    if (allExpenses) {
      setSortDateExpenses(allExpenses);
      setTotal(allExpenses);
    }
  }, [allExpenses]);

  // Render loading circle if haven't got data yet
  if (isLoadingInWalletScreen) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusBar backgroundColor={"#3a833c"} />
        <ActivityIndicator size={"large"} color={"#4cb050"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#3a833c"} />

      {/* Header */}
      <Header total={total} />

      {/* Body */}
      <View className="mt-5 px-4" style={{ flex: 1 }}>
        {/* Filter section */}
        <FilterSection />

        {/* Overall section */}
        <WhiteBox mt={"mt-4"}>
          <Overall total={total} />
        </WhiteBox>

        {/* Each day section */}
        {sortDateExpenses ? (
          <View
            className="items-center justify-center flex-1"
            style={{ marginTop: 40, marginBottom: 20 }}
          >
            {/* All transactions show btn */}
            <TouchableOpacity
              className="flex-row items-end gap-1"
              onPress={handleListVisible}
            >
              <Text className="text-lg text-primary font-normal">
                All transactions
              </Text>
              <Ionicons name={chevronType} size={20} color={"#4cb050"} />
            </TouchableOpacity>

            {/* Specific date show */}
            <Animated.View style={animatedStyle} className="w-full mb-4">
              <FlatList
                data={sortDateExpenses}
                extraData={sortDateExpenses}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <WhiteBox mt={"mt-4"}>
                    <DayOverall inputDate={item.title} expenses={item.data} />
                    {item.data.map((expense) => (
                      <Expense key={expense.id} expense={expense} />
                    ))}
                  </WhiteBox>
                )}
              />
            </Animated.View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg">
              You have not create any transaction yet
            </Text>
          </View>
        )}
      </View>

      <EditModal />
    </View>
  );
}
