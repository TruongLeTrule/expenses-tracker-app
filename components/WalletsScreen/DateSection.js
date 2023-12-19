import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const DateSection = () => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [datePickModal, setDatePickModal] = useState(false);
  const [chosenPicker, setChosenPicker] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(null);
  const [maximumDate, setMaximumDate] = useState(null);

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

  // Handle picker change
  const handleDatePickerChange = (event, date) => {
    setPickerVisible(false);
    // Set date if there is any change
    if (event.type === "set") {
      if (chosenPicker === "start") {
        setStartDate(date);
        setMinimumDate(date);
      }
      if (chosenPicker === "end") {
        setEndDate(date);
        setMaximumDate(date);
      }
    }
  };

  // Handle filter when blur
  const handleFilter = () => {
    console.log("start date: ", startDate);
    console.log("end date: ", endDate);
    setDatePickModal(false);
  };

  return (
    <View className="flex-row items-center justify-center">
      <Pressable
        className="flex-row justify-center items-center"
        onPress={() => setDatePickModal(true)}
      >
        <Text className="text-lg font-bold mr-2">By date</Text>
        <Ionicons name="calendar" size={25} />
      </Pressable>

      {/* Pick date modal */}
      <Modal
        isVisible={datePickModal}
        onBackdropPress={handleFilter}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-[#fff] flex-row justify-center items-center w-4/6 rounded-lg p-6">
          {/* Start date button */}
          <Pressable
            className="bg-primary rounded-lg p-2 justify-center items-center"
            onPress={handleStartDatePress}
          >
            <Text className="text-[#fff] font-bold text-normal">
              Start Date
            </Text>
          </Pressable>
          {/* End date button */}
          <Pressable
            className="bg-primary rounded-lg p-2 justify-center items-center ml-7"
            onPress={handleEndDatePress}
          >
            <Text className="text-[#fff] font-bold text-normal">End Date</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Date picker */}
      {pickerVisible && (
        <DateTimePicker
          value={chosenPicker === "start" ? startDate : endDate}
          onChange={handleDatePickerChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DateSection;
