import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

import useStore from "../../data/useStore";

const FilterByDate = () => {
  const allExpenses = useStore((state) => state.allExpenses);
  const allIncomes = useStore((state) => state.allIncomes);
  const setFilteredList = useStore((state) => state.setFilteredList);
  const filteredList = useStore((state) => state.filteredList);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [datePickModal, setDatePickModal] = useState(false);
  const [chosenPicker, setChosenPicker] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Handle pick start date button press
  const handleStartDatePress = () => {
    setChosenPicker("start");
    setPickerVisible(true);
  };

  // Handle pick start date button press
  const handleEndDatePress = () => {
    setChosenPicker("end");
    setPickerVisible(true);
  };

  // Handle date picker change
  const handleDatePickerChange = (event, date) => {
    setPickerVisible(false);
    // Set date if there is any change
    if (event.type === "set") {
      if (chosenPicker === "start") {
        setStartDate(date);
      }
      if (chosenPicker === "end") {
        setEndDate(date);
      }
    }
  };

  // Handle apply change
  const handleApplyChange = () => {
    if (allExpenses || allIncomes) {
      if (startDate.setHours(0, 0, 0, 0) < endDate.setHours(23, 59, 59, 999)) {
        // If there are already filtered list, use it to filter
        const chosenList = filteredList
          ? filteredList
          : [...allExpenses, ...allIncomes];

        const newList = chosenList.filter((transaction) => {
          const currTransactionDate = new Date(transaction.date.seconds * 1000);
          return (
            currTransactionDate <= endDate.setHours(23, 59, 59, 999) &&
            currTransactionDate >= startDate.setHours(0, 0, 0, 0)
          );
        });
        setFilteredList(newList);
        console.log("Filter render list by date");
      } else {
        Alert.alert("Error", "Invalid date, please try again");
      }
    }

    setDatePickModal(false);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <View className="flex-row items-center justify-center">
      <TouchableOpacity
        className="flex-row justify-center items-center"
        onPress={() => setDatePickModal(true)}
      >
        <Text className="text-lg font-bold mr-2">By date</Text>
        <Ionicons name="calendar" size={25} />
      </TouchableOpacity>

      {/* Pick date modal */}
      <Modal
        isVisible={datePickModal}
        onBackdropPress={() => setDatePickModal(false)}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-[#fff]  w-4/6 rounded-lg p-4 justify-center items-center">
          <View className="flex-row justify-center items-center">
            {/* Start date button */}
            <Pressable
              className=" rounded-lg p-2 justify-center items-center"
              onPress={handleStartDatePress}
            >
              <Text className="font-bold text-normal">Start Date</Text>
            </Pressable>
            {/* End date button */}
            <Pressable
              className=" rounded-lg p-2 justify-center items-center ml-7"
              onPress={handleEndDatePress}
            >
              <Text className="font-bold text-normal">End Date</Text>
            </Pressable>
          </View>

          {/* Apply filter button */}
          <TouchableOpacity
            className="bg-primary rounded-lg p-2 justify-center items-center w-14 mt-4"
            onPress={handleApplyChange}
          >
            <Text className="text-[#fff] font-bold text-normal">Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Date picker */}
      {pickerVisible && (
        <DateTimePicker
          value={chosenPicker === "start" ? startDate : endDate}
          onChange={handleDatePickerChange}
        />
      )}
    </View>
  );
};

export default FilterByDate;
