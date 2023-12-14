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

import { icons, titles } from "../template";
import CategoryModal from "../CategoryModal";

const EditModal = () => {
  const { updateExpense } = useFetch();

  const editModalVisible = useStore((state) => state.editModalVisible);
  const toggleEditModalVisible = useStore(
    (state) => state.toggleEditModalVisible
  );
  const editingExpense = useStore((state) => state.editingExpense);
  const toggleCategoryModalVisible = useStore(
    (state) => state.toggleCategoryModalVisible
  );
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const allExpenses = useStore((state) => state.allExpenses);

  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerType, setDatePickerType] = useState("date");

  useEffect(() => {
    if (editingExpense) {
      setValue(editingExpense.value);
      setCategory(editingExpense.category);
      setNote(editingExpense.note);
      setDate(new Date(editingExpense.date.seconds * 1000));
    }
  }, [editModalVisible]);

  const handleDatePickerChange = (event, date) => {
    setDatePickerVisible(false);
    if (event.type === "set") {
      setDate(date);
    }
  };

  const handleSubmit = () => {
    const newExpenses = [...allExpenses];

    //Find index of specific object using findIndex method.
    const objIndex = allExpenses.findIndex(
      (obj) => obj.id == editingExpense.id
    );

    //Update object's name property.
    newExpenses[objIndex].value = value;
    newExpenses[objIndex].category = category;
    newExpenses[objIndex].note = note;
    newExpenses[objIndex].date.seconds = date.getTime() / 1000;

    // Sort array by date
    newExpenses.sort(function (a, b) {
      // Convert the date strings to Date objects
      let dateA = a.date.seconds;
      let dateB = b.date.seconds;

      // Subtract the dates to get a value that is either negative, positive, or zero
      return dateB - dateA;
    });

    setAllExpenses([...newExpenses]);

    toggleEditModalVisible();

    console.log("update expenses");

    updateExpense(editingExpense.id, {
      value: value,
      category: category,
      date: date,
      note: note,
    });
  };

  return (
    <Modal
      isVisible={editModalVisible}
      onBackdropPress={toggleEditModalVisible}
      className="flex-1 m-0 justify-end"
    >
      <View className="bg-[#d1d1d1] rounded-t-xl h-3/4">
        <KeyboardAwareScrollView>
          {/* Heading section */}
          <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
            <Pressable onPress={toggleEditModalVisible}>
              <Ionicons name="chevron-down" size={35} color={"#4cb050"} />
            </Pressable>
            <Text className="text-2xl font-bold">Edit transaction</Text>
            <Pressable>
              <Ionicons name="trash-outline" size={30} color={"#eb3700"} />
            </Pressable>
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
                    className="font-bold  text-2xl text-danger-red"
                    value={String(value)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setValue(Number(text.replace(/[^0-9]/g, "")))
                    }
                  />
                  <Text className="font-bold  text-2xl text-danger-red">₫</Text>
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
            <CategoryModal setCategory={setCategory} />

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
      </View>
    </Modal>
  );
};

export default EditModal;
