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
import DayOverall from "../components/WalletsScreen/DayOverall";
import Transaction from "../components/WalletsScreen/Transaction";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
import Overall from "../components/WalletsScreen/Overall";
import EditModal from "../components/WalletsScreen/EditModal";

export default function Wallets() {
  const { getAllExpenses, getAllIncomes } = useFetch();

  const isLoadingInWalletScreen = useStore(
    (state) => state.isLoadingInWalletScreen
  );
  const allExpenses = useStore((state) => state.allExpenses);
  const allIncomes = useStore((state) => state.allIncomes);
  const filteredList = useStore((state) => state.filteredList);
  const renderList = useStore((state) => state.renderList);
  const setRenderList = useStore((state) => state.setRenderList);
  const totalExpense = useStore((state) => state.totalExpense);
  const setTotalExpense = useStore((state) => state.setTotalExpense);
  const totalIncome = useStore((state) => state.totalIncome);
  const setTotalIncome = useStore((state) => state.setTotalIncome);
  const total = useStore((state) => state.total);
  const setTotal = useStore((state) => state.setTotal);
  const uid = useStore((state) => state.uid);

  // Toggle list visible feature
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

  // If the is no expense or income in local, get them from db
  useEffect(() => {
    if (!allExpenses) {
      getAllExpenses(uid);
    }
    if (!allIncomes) {
      getAllIncomes(uid);
    }
  }, []);

  // Set render array again if income or expense has been changed
  // or there is filter feature enabled
  useEffect(() => {
    if (filteredList) {
      // Sort list every rendering
      filteredList.sort(function (a, b) {
        // Convert the date strings to Date objects
        let dateA = a.date.seconds;
        let dateB = b.date.seconds;

        // Subtract the dates to get a value that is either negative, positive, or zero
        return dateB - dateA;
      });
      setRenderList(filteredList);
    } else if (allExpenses || allIncomes) {
      let renderArr;
      if (!allExpenses && allIncomes) {
        renderArr = [...allIncomes];
      } else if (allExpenses && !allIncomes) {
        renderArr = [...allExpenses];
      } else {
        renderArr = [...allExpenses, ...allIncomes];
      }
      // Sort list every rendering
      renderArr.sort(function (a, b) {
        // Convert the date strings to Date objects
        let dateA = a.date.seconds;
        let dateB = b.date.seconds;

        // Subtract the dates to get a value that is either negative, positive, or zero
        return dateB - dateA;
      });
      setRenderList(renderArr);
    }
  }, [allExpenses, allIncomes, filteredList]);

  // Set total expense when all expenses have been changed
  useEffect(() => {
    if (allExpenses) {
      setTotalExpense(allExpenses);
    }
  }, [allExpenses]);
  // Set total income when all incomes have been changed
  useEffect(() => {
    if (allIncomes) {
      setTotalIncome(allIncomes);
    }
  }, [allIncomes]);
  // Set total if income or expense have been changed
  useEffect(() => {
    setTotal(totalIncome - totalExpense);
  }, [totalExpense, totalIncome]);

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
        {/* Overall section */}
        <WhiteBox mt={"mt-4"}>
          <Overall
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            total={total}
          />
        </WhiteBox>

        {/* Each day section */}
        {renderList ? (
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
<<<<<<< HEAD
              <FlatList
                data={renderList}
                extraData={renderList}
=======
              <FlatList showsVerticalScrollIndicator={false}
                data={sortDateExpenses}
                extraData={sortDateExpenses}
>>>>>>> origin/main
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <WhiteBox mt={"mt-4"}>
                    <DayOverall
                      inputDate={item.title}
                      transactions={item.data}
                    />
                    {item.data.map((transaction) => (
                      <Transaction
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}
                  </WhiteBox>
                )}
              />
            </Animated.View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg">
              You have not created any transaction yet
            </Text>
          </View>
        )}
      </View>

      <EditModal />
    </View>
  );
}
