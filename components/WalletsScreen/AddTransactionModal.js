import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import useStore from "../../data/useStore";
import useFetch from "../../data/fetchData";
import useLocal from "../../data/localData";

import { icons, titles } from "../template";
import CategoryModal from "../CategoryModal";

const AddTransactionModal = ({
  transactionModalVisible,
  setTransactionModalVisible,
  type,
}) => {
  const navigation = useNavigation();

  const { setLocalExpenses, setLocalIncomes } = useLocal();
  const { addExpense, addIncome } = useFetch();

  const setIsLoadingInWalletScreen = useStore(
    (state) => state.setIsLoadingInWalletScreen
  );
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );
  const allExpenses = useStore((state) => state.allExpenses);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const allIncomes = useStore((state) => state.allIncomes);
  const setAllIncomes = useStore((state) => state.setAllIncomes);

  const uid = useStore((state) => state.uid);

  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerType, setDatePickerType] = useState("date");

  const handleDatePickerChange = (event, date) => {
    setDatePickerVisible(false);
    if (event.type === "set") {
      setDate(date);
    }
  };

  // Handle add expense button press
  const handleSubmit = async () => {
    // Do nothing when value is 0
    if (value === 0) {
      return;
    }

    setTransactionModalVisible(false);
    navigation.navigate("MainBottomTab");

    // Create new expense
    if (type === "out") {
      setIsLoadingInWalletScreen(true);

      // Get id created on db
      const createdExpense = {
        value: value,
        category: category,
        note: note,
        date: { seconds: date.getTime() / 1000 },
        type: "out",
        uid: uid,
      };
      const id = await addExpense({ ...createdExpense, date: date });
      createdExpense.id = id;

      const newExpenses = [...allExpenses, createdExpense];
      setAllExpenses([...newExpenses]);
      setLocalExpenses([...newExpenses]);

      console.log("New expense created");
      setIsLoadingInWalletScreen(false);
    }
    // Create new income
    else if (type === "in") {
      setIsLoadingInWalletScreen(true);

      // Get id created on db
      const createdIncome = {
        value: value,
        category: category,
        note: note,
        date: { seconds: date.getTime() / 1000 },
        type: "in",
        uid: uid,
      };
      const id = await addIncome({ ...createdIncome, date: date });
      createdIncome.id = id;

      const newIncomes = [...allIncomes, createdIncome];
      setAllIncomes([...newIncomes]);
      setLocalIncomes([...newIncomes]);

      console.log("New income created");
      setIsLoadingInWalletScreen(false);
    } else {
      console.log("Cannot create new transaction");
    }
  };

  // Set default category
  useEffect(() => {
    setCategory(type === "out" ? "food" : "salary");
  }, [transactionModalVisible]);

  return (
    <Modal
      isVisible={transactionModalVisible}
      onBackdropPress={() => setTransactionModalVisible(false)}
      onSwipeComplete={() => setTransactionModalVisible(false)}
      swipeDirection="down"
      className="flex-1 m-0 justify-end"
    >
      <KeyboardAwareScrollView className="bg-[#d1d1d1]">
        {/* Heading section */}
        <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
          <View></View>
          <Text className="text-2xl font-bold ml-7">
            Create {type === "out" ? "expense" : "income"}
          </Text>
          <Pressable onPress={() => setTransactionModalVisible(false)}>
            <Ionicons name="close-sharp" size={32} color={"#eb3700"} />
          </Pressable>
        </View>

        {/* Body */}
        <View className="bg-[#fff] rounded-xl mt-16 p-6">
          {/* Transaction input */}
          <View className="flex-row items-center gap-4">
            <View className="rounded-full h-12 w-12 flex items-center justify-center bg-dark-green">
              <Ionicons name="cash" size={27} color={"#fff"} />
            </View>
            <View>
              <Text className="text-base text-grey-text">Amount</Text>
              <View className="flex-row">
                <TextInput
                  className={`font-bold  text-2xl ${
                    type === "out" ? "text-danger-red" : "text-primary"
                  }`}
                  value={String(value)}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setValue(Number(text.replace(/[^0-9]/g, "")))
                  }
                />
                <Text
                  className={`font-bold  text-2xl ${
                    type === "out" ? "text-danger-red" : "text-primary"
                  }`}
                >
                  ₫
                </Text>
              </View>
            </View>
          </View>

          {/* Category input */}
          <TouchableOpacity
            className="flex-row justify-between items-center mt-4 pt-4 border-t border-grey-text"
            onPress={toggleCategoryModalVisible}
          >
            <View className="flex-row items-center gap-4">
              <View className="rounded-full h-12 w-12 flex items-center justify-center bg-light-green">
                <Ionicons name={icons[category]} size={27} />
              </View>
              <Text className="text-lg font-normal">{titles[category]}</Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={27}
              color={"#6d6d6d"}
            />
          </TouchableOpacity>
          <CategoryModal setCategory={setCategory} type={type} />

          {/* Date input */}
          <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-grey-text">
            <View className="flex-row items-center gap-4">
              <View className="rounded-full h-12 w-12 flex items-center justify-center">
                <Ionicons name={"today-sharp"} size={35} color={"#6d6d6d"} />
              </View>

              <View className="flex-row">
                <TouchableOpacity
                  className="w-36 h-10 rounded-full bg-[#d1d1d1] justify-center items-center"
                  onPress={() => {
                    setDatePickerType("date");
                    setDatePickerVisible(true);
                  }}
                >
                  <Text className="text-[#fff] text-base font-bold">
                    {date.toDateString()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="ml-2 w-20 h-10 rounded-full bg-[#d1d1d1] justify-center items-center"
                  onPress={() => {
                    setDatePickerType("time");
                    setDatePickerVisible(true);
                  }}
                >
                  <Text className="text-[#fff] text-base font-bold">
                    {`${date.getHours()}:${date.getMinutes()}`}
                  </Text>
                </TouchableOpacity>
              </View>

              {datePickerVisible && (
                <DateTimePicker
                  value={date}
                  mode={datePickerType}
                  onChange={handleDatePickerChange}
                />
              )}
            </View>
          </View>

          {/* Note input */}
          <View className="mt-4 pt-4 border-t border-grey-text">
            <View className="flex-row items-center gap-4">
              <View className="rounded-full h-12 w-12 flex items-center justify-center">
                <Ionicons name={"pencil"} size={32} color={"#6d6d6d"} />
              </View>
              <TextInput
                className="text-lg font-normal flex-1"
                placeholder="Note"
                value={note}
                onChangeText={setNote}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>

        {/* Submit */}
        <View className="items-center mt-8">
          <TouchableOpacity
            className="w-36 h-14 rounded-full bg-primary flex-row justify-center items-center"
            onPress={handleSubmit}
          >
            <Ionicons name={"save"} size={30} color={"#fff"} />
            <Text className="font-bold text-2xl text-[#fff] ml-2">Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default AddTransactionModal;
