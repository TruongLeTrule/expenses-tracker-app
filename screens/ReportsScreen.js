import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import useStore from "../data/useStore";
import BarChart from "../components/ReportsScreen/BarChart";
import { useState } from "react";
import MonthYearSelector from "../components/ReportsScreen/monthYearSelector";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';


export default function ReportsScreen() {
  const toggleMonthYearModalVisible = useStore((state) => state.toggleMonthYearModalVisible)
  const [monthYearList, setMonthYear] = useState([])
  const sortDateExpenses = useStore((state) => state.sortDateExpenses)
  const [selectedDate, setSelectedDate] = useState({})
  const allExpenses = useStore((state) => state.allExpenses)

  useEffect(() => {
    if (sortDateExpenses !== undefined) {
      let currentMonthYear = { 'month': sortDateExpenses[0].title.getMonth() + 1, 'year': sortDateExpenses[0].title.getFullYear() }
      let monthYearIterator = {};
      const dataMonthYearList = [currentMonthYear];
      for (let i = 1; i < sortDateExpenses.length; ++i) {
        monthYearIterator = { 'month': sortDateExpenses[i].title.getMonth() + 1, 'year': sortDateExpenses[i].title.getFullYear() }
        if (currentMonthYear.month !== monthYearIterator.month && currentMonthYear.year === monthYearIterator.year) {
          currentMonthYear = { 'month': monthYearIterator.month, 'year': monthYearIterator.year };
          dataMonthYearList.push(currentMonthYear)
        }
        else if (currentMonthYear.year !== monthYearIterator.year) {
          currentMonthYear = monthYearIterator;
          dataMonthYearList.push(currentMonthYear)
        }
      }
      setMonthYear(dataMonthYearList)
      setSelectedDate({ ...dataMonthYearList[0], 'month': dataMonthYearList[0].month })
    }
  }, [sortDateExpenses])

  function handleBackMonthButton() {
    if (selectedDate.month === monthYearList[0].month && selectedDate.year === monthYearList[0].year) {
      setSelectedDate({ 'year': monthYearList[monthYearList.length - 1].year, 'month': monthYearList[monthYearList.length - 1].month })
      return;
    }
    let index = 0
    for (let i = 0; i < monthYearList.length; ++i) {
      if (monthYearList[i].month === selectedDate.month && monthYearList[i].year === selectedDate.year) {
        index = i;
        break;
      }
    }
    setSelectedDate({ 'month': monthYearList[index - 1].month, 'year': monthYearList[index - 1].year })
  }
  function handleForwardMonthButton() {
    if (selectedDate.month === monthYearList[monthYearList.length - 1].month && selectedDate.year === monthYearList[monthYearList.length - 1].year) {
      setSelectedDate({ 'year': monthYearList[0].year, 'month': monthYearList[0].month })
      return;
    }
    let index = 0
    for (let i = 0; i < monthYearList.length; ++i) {
      if (monthYearList[i].month === selectedDate.month && monthYearList[i].year === selectedDate.year) {
        index = i;
        break;
      }
    }
    setSelectedDate({ 'month': monthYearList[index + 1].month, 'year': monthYearList[index + 1].year })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackMonthButton}>
          <Ionicons name="chevron-back-outline" size={27} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMonthYearModalVisible}>
          <View style={styles.monthSelector}>
            <Text style={{ fontSize: 25, marginRight: 10 }}>{sortDateExpenses !== undefined ? (selectedDate.month + '/' + selectedDate.year) : ('No Date')}</Text>
            <AntDesign name="caretdown" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForwardMonthButton}>
          <Ionicons name="chevron-forward-outline" size={27} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BarChart selectedDate={selectedDate} allExpenses={allExpenses} />
        <BarChart selectedDate={selectedDate} />
        <BarChart selectedDate={selectedDate} />
        <BarChart selectedDate={selectedDate} />
      </ScrollView>
      <MonthYearSelector data={monthYearList} setSelectedDate={setSelectedDate} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,


  },
  header: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    // borderColor: 'black',
    // borderWidth: 1,
    width: '100%',
    marginBottom: 20
  },
  monthSelector: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  }
});