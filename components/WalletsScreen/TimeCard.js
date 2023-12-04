import { View, Text } from "react-native";
import React from "react";

export default function DayCard({ inputDate, value }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateObj = {
    day: weekday[inputDate.getDay()],
    date: inputDate.getDate(),
    month: monthNames[inputDate.getMonth()],
    year: inputDate.getFullYear(),
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row justify-between items-center gap-x-5">
        <Text className="font-bold text-3xl">{dateObj.date}</Text>
        <View>
          <Text className="font-bold text-xl">{dateObj.day}</Text>
          <Text className="font-normal text-xl text-grey-text">
            {dateObj.month}, {dateObj.year}
          </Text>
        </View>
      </View>
      <Text className="font-bold text-xl text-danger-red">{value}₫</Text>
    </View>
  );
}
