import {
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

import useFetch from "../../data/fetchData";
import useStore from "../../data/useStore";
import useLocal from "../../data/localData";

import { icons, titles } from "../template";
import CategoryModal from "../CategoryModal";

const EditModal = () => {
  const { updateExpense, deleteExpense, updateIncome, deleteIncome } =
    useFetch();
  const { setLocalExpenses, setLocalIncomes } = useLocal();

  const editModalVisible = useStore((state) => state.editModalVisible);
  const toggleEditModalVisible = useStore(
    (state) => state.toggleEditModalVisible
  );
  const editingTransaction = useStore((state) => state.editingTransaction);
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const allExpenses = useStore((state) => state.allExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const allIncomes = useStore((state) => state.allIncomes);

  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerType, setDatePickerType] = useState("date");
  const [alertVisible, setAlertVisible] = useState(false);

  // Get current editing expense value
  useEffect(() => {
    if (editingTransaction) {
      setValue(editingTransaction.value);
      setCategory(editingTransaction.category);
      setNote(editingTransaction.note);
      setDate(new Date(editingTransaction.date.seconds * 1000));
    }
  }, [editModalVisible]);

  // Handle date or time press
  const handleDatePickerChange = (event, date) => {
    setDatePickerVisible(false);
    // Set date if there is any change
    if (event.type === "set") {
      setDate(date);
    }
  };

  // Handle save button press
  const handleSaveBtnPress = () => {
    // Do nothing when value is 0
    if (value === 0) {
      return;
    }

    // Update expense
    if (editingTransaction.type === "out") {
      const newExpenses = [...allExpenses];

      //Find index of specific object using findIndex method.
      const objIndex = allExpenses.findIndex(
        (obj) => obj.id == editingTransaction.id
      );

      //Update object's name property.
      newExpenses[objIndex].value = value;
      newExpenses[objIndex].category = category;
      newExpenses[objIndex].note = note;
      newExpenses[objIndex].date.seconds = date.getTime() / 1000;

      setAllExpenses([...newExpenses]);

      toggleEditModalVisible();

      console.log("update expenses");

      // If expense has been changed, update it on db and local
      if (
        JSON.stringify(newExpenses[objIndex]) !==
        JSON.stringify(editingTransaction)
      ) {
        updateExpense(editingTransaction.id, {
          value: value,
          category: category,
          date: date,
          note: note,
        });
        setLocalExpenses([...newExpenses]);
      }
    }
    // Update income
    if (editingTransaction.type === "in") {
      const newIncomes = [...allIncomes];

      //Find index of specific object using findIndex method.
      const objIndex = allIncomes.findIndex(
        (obj) => obj.id == editingTransaction.id
      );

      //Update object's name property.
      newIncomes[objIndex].value = value;
      newIncomes[objIndex].category = category;
      newIncomes[objIndex].note = note;
      newIncomes[objIndex].date.seconds = date.getTime() / 1000;

      setAllIncomes([...newIncomes]);

      toggleEditModalVisible();

      console.log("update incomes");

      // If income has been changed, update it on db and local
      if (
        JSON.stringify(newIncomes[objIndex]) !==
        JSON.stringify(editingTransaction)
      ) {
        updateIncome(editingTransaction.id, {
          value: value,
          category: category,
          date: date,
          note: note,
        });
        setLocalIncomes([...newIncomes]);
      }
    }
  };

  // Handle delete button press
  const handleDeleteBtnPress = () => {
    toggleEditModalVisible();
    setAlertVisible(false);

    if (editingTransaction.type === "out") {
      const newExpenses = allExpenses.filter(
        (expense) => expense.id !== editingTransaction.id
      );
      setAllExpenses(newExpenses);
      setLocalExpenses(newExpenses);
      console.log("delete expense");
      deleteExpense(editingTransaction.id);
    }

    if (editingTransaction.type === "in") {
      const newIncomes = allIncomes.filter(
        (income) => income.id !== editingTransaction.id
      );
      setAllIncomes(newIncomes);
      setLocalIncomes(newIncomes);
      console.log("delete income");
      deleteIncome(editingTransaction.id);
    }
  };

  return (
    <Modal
      isVisible={editModalVisible}
      onBackdropPress={toggleEditModalVisible}
      onSwipeComplete={toggleEditModalVisible}
      swipeDirection="down"
      className="flex-1 m-0 justify-end"
      onBackButtonPress={toggleEditModalVisible}
    >
      <View className="bg-[#d1d1d1] rounded-t-xl h-3/4">
        <KeyboardAwareScrollView>
          {/* Heading section */}
          <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
            <Pressable onPress={toggleEditModalVisible}>
              <Ionicons name="chevron-down" size={35} color={"#4cb050"} />
            </Pressable>
            <Text className="text-2xl font-bold">Edit transaction</Text>
            <TouchableOpacity onPress={() => setAlertVisible(true)}>
              <Ionicons name="trash-outline" size={30} color={"#eb3700"} />
            </TouchableOpacity>

            {/* Delete confirm alert */}
            <Modal
              isVisible={alertVisible}
              onBackdropPress={() => setAlertVisible(false)}
              animationIn={"fadeIn"}
              animationOut={"fadeOut"}
              className="flex-1 justify-center items-center"
            >
              <View className="bg-[#fff] justify-center items-center w-4/6 rounded-lg p-6">
                {/* Title */}
                <Text className="text-lg font-bold">
                  Are you sure to delete?
                </Text>
                {/* Cancel button */}
                <View className="flex-row justify-between w-4/5 mt-5">
                  <TouchableOpacity
                    className="bg-[#d1d1d1] rounded-lg p-2"
                    onPress={() => setAlertVisible(false)}
                  >
                    <Text className="text-[#fff] font-bold">Cancel</Text>
                  </TouchableOpacity>
                  {/* Confirm button */}
                  <TouchableOpacity
                    className="bg-[#eb3700] rounded-lg p-2"
                    onPress={handleDeleteBtnPress}
                  >
                    <Text className="text-[#fff] font-bold">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          {/* Body */}
          <View className="bg-[#fff] rounded-xl mt-16 p-6">
            {/* Expense input */}
            <View className="flex-row items-center gap-4">
              <View className="rounded-full h-12 w-12 flex items-center justify-center bg-dark-green">
                <Ionicons name="cash" size={27} color={"#fff"} />
              </View>
              <View>
                <Text className="text-base text-grey-text">Amount</Text>
                <View className="flex-row">
                  <TextInput
                    className={`font-bold  text-2xl ${
                      editingTransaction?.type === "out"
                        ? "text-danger-red"
                        : "text-primary"
                    }`}
                    value={String(value)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setValue(Number(text.replace(/[^0-9]/g, "")))
                    }
                  />
                  <Text
                    className={`font-bold  text-2xl ${
                      editingTransaction?.type === "out"
                        ? "text-danger-red"
                        : "text-primary"
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
            <CategoryModal
              setCategory={setCategory}
              type={editingTransaction?.type}
            />

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

          {/* Save Button */}
          <View className="items-center mt-8">
            <TouchableOpacity
              className="w-36 h-14 rounded-full bg-primary flex-row justify-center items-center"
              onPress={handleSaveBtnPress}
            >
              <Ionicons name={"save"} size={30} color={"#fff"} />
              <Text className="font-bold text-2xl text-[#fff] ml-2">Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;
