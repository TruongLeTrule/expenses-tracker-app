import { View, Text } from "react-native";
import React from "react";
import { commafy } from "../formatCurrency";

export default function DayOverall({ inputDate, transactions }) {
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

  // Get day total
  const total = transactions.reduce((result, expense) => {
    if (expense.type === "out") {
      return result - expense.value;
    } else {
      return result + expense.value;
    }
  }, 0);

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
      <View className="flex-1 items-end">
        {total >= 0 ? (
          <Text className="font-bold text-xl text-primary" numberOfLines={1}>
            {commafy(Number(total))}₫
          </Text>
        ) : (
          <Text className="font-bold text-xl text-danger-red" numberOfLines={1}>
            {commafy(Number(total))}₫
          </Text>
        )}
      </View>
    </View>
  );
}
