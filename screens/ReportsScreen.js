import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useStore from "../data/useStore";
import BarChart from "../components/ReportsScreen/BarChart";
import PieChart from "../components/ReportsScreen/PieChart";
import { useState, useEffect } from "react";
import MonthYearSelector from "../components/ReportsScreen/monthYearSelector";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import ReportFilter from "../components/ReportsScreen/ReportFilter";

export default function ReportsScreen() {
  const [monthYearList, setMonthYearList] = useState([]);
  const [dayMonthYearList, setDayMonthYearList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);
  const [reportType, setReportType] = useState("none");
  const toggleMonthYearModalVisible = useStore(
    (state) => state.toggleMonthYearModalVisible
  );
  const sortDateExpensesAndIncome = useStore(
    (state) => state.sortDateExpensesAndIncome
  );
  const allExpenses = useStore((state) => state.allExpenses);
  const allIncomes = useStore((state) => state.allIncomes);
  let setReportFilterVisible = useStore(
    (state) => state.setReportFilterVisible
  );

  function handleReportByDay() {
    setReportType("Day");
    setReportFilterVisible(false);
  }
  function handleReportByMonth() {
    setReportType("Month");
    setReportFilterVisible(false);
  }
  function handleReportByYear() {
    setReportType("Year");
    setReportFilterVisible(false);
  }

  //Getting day, month and year from sortDateExpensesAndIncome
  useEffect(() => {
    if (sortDateExpensesAndIncome !== undefined) {
      let currentDayMonthYear = {
        day: sortDateExpensesAndIncome[0].title.getDate(),
        month: sortDateExpensesAndIncome[0].title.getMonth() + 1,
        year: sortDateExpensesAndIncome[0].title.getFullYear(),
      };
      let Iterator = {};
      const DayMonthYearList = [currentDayMonthYear];
      const MonthYearList = [
        { month: currentDayMonthYear.month, year: currentDayMonthYear.year },
      ];
      const YearList = [{ year: currentDayMonthYear.year }];

      for (let i = 1; i < sortDateExpensesAndIncome.length; ++i) {
        Iterator = {
          day: sortDateExpensesAndIncome[i].title.getDate(),
          month: sortDateExpensesAndIncome[i].title.getMonth() + 1,
          year: sortDateExpensesAndIncome[i].title.getFullYear(),
        };

        //Getting dayMonthYearList data
        if (
          currentDayMonthYear.day === Iterator.day &&
          currentDayMonthYear.month === Iterator.month &&
          currentDayMonthYear.year === Iterator.year
        ) {
          currentDayMonthYear = { ...Iterator };
          continue;
        } else {
          DayMonthYearList.push(Iterator);
        }

        //Getting monthYearList data
        if (
          (currentDayMonthYear.month > Iterator.month &&
            currentDayMonthYear.year === Iterator.year) ||
          currentDayMonthYear.year > Iterator.year
        ) {
          MonthYearList.push({ month: Iterator.month, year: Iterator.year });
        }

        //Getting yearList data
        if (currentDayMonthYear.year > Iterator.year) {
          YearList.push({ year: Iterator.year });
        }

        currentDayMonthYear = { ...Iterator };
      }

      setMonthYearList(MonthYearList);
      setDayMonthYearList(DayMonthYearList);
      setYearList(YearList);
      if (reportType === "none") return;
      else if (reportType === "Month") {
        setSelectedDate(MonthYearList[0]);
      } else if (reportType === "Day") {
        setSelectedDate(DayMonthYearList[0]);
      } else if (reportType === "Year") {
        setSelectedDate(YearList[0]);
      }
    }
  }, [reportType, sortDateExpensesAndIncome]);

  // If there are no data set selected date to {}
  useEffect(() => {
    if (allExpenses && allIncomes) {
      setSelectedDate({});
    }
  }, [allExpenses, allIncomes]);

  function handleBackMonthButton() {
    if (reportType === "none") return;
    if (reportType === "Month") {
      if (
        // checking if is at the beginning of monthYearList
        selectedDate.month === monthYearList[0].month &&
        selectedDate.year === monthYearList[0].year
      ) {
        setSelectedDate({
          year: monthYearList[monthYearList.length - 1].year,
          month: monthYearList[monthYearList.length - 1].month,
        });
        return;
      }

      //finding position of selectedDate when not at the beginning
      let index = 0;
      for (let i = 0; i < monthYearList.length; ++i) {
        if (
          monthYearList[i].month === selectedDate.month &&
          monthYearList[i].year === selectedDate.year
        ) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        month: monthYearList[index - 1].month,
        year: monthYearList[index - 1].year,
      });
    }
    if (reportType === "Day") {
      if (
        // checking if is at the beginning of dayMonthYearList
        selectedDate.day === dayMonthYearList[0].day &&
        selectedDate.month === dayMonthYearList[0].month &&
        selectedDate.year === dayMonthYearList[0].year
      ) {
        setSelectedDate({
          day: dayMonthYearList[dayMonthYearList.length - 1].day,
          year: dayMonthYearList[dayMonthYearList.length - 1].year,
          month: dayMonthYearList[dayMonthYearList.length - 1].month,
        });
        return;
      }

      //finding position of selectedDate when not at the beginning
      let index = 0;
      for (let i = 0; i < dayMonthYearList.length; ++i) {
        if (
          selectedDate.day === dayMonthYearList[i].day &&
          selectedDate.month === dayMonthYearList[i].month &&
          selectedDate.year === dayMonthYearList[i].year
        ) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        day: dayMonthYearList[index - 1].day,
        month: dayMonthYearList[index - 1].month,
        year: dayMonthYearList[index - 1].year,
      });
    }
    if (reportType === "Year") {
      if (
        // checking if is at the beginning of yearList
        selectedDate.year === yearList[0].year
      ) {
        setSelectedDate({
          year: yearList[yearList.length - 1].year,
        });
        return;
      }

      //finding position of selectedDate when not at the beginning
      let index = 0;
      for (let i = 0; i < yearList.length; ++i) {
        if (yearList[i].year === selectedDate.year) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        year: yearList[index - 1].year,
      });
    }
  }
  function handleForwardMonthButton() {
    if (reportType === "none") return;
    if (reportType === "Month") {
      if (
        // checking if is at the end of monthYearList
        selectedDate.month === monthYearList[monthYearList.length - 1].month &&
        selectedDate.year === monthYearList[monthYearList.length - 1].year
      ) {
        setSelectedDate({
          year: monthYearList[0].year,
          month: monthYearList[0].month,
        });
        return;
      }

      //finding position of selectedDate when not at the end
      let index = 0;
      for (let i = 0; i < monthYearList.length; ++i) {
        if (
          monthYearList[i].month === selectedDate.month &&
          monthYearList[i].year === selectedDate.year
        ) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        month: monthYearList[index + 1].month,
        year: monthYearList[index + 1].year,
      });
    }
    if (reportType === "Day") {
      if (
        // checking if is at the end of dayMonthYearList
        selectedDate.day ===
          dayMonthYearList[dayMonthYearList.length - 1].day &&
        selectedDate.month ===
          dayMonthYearList[dayMonthYearList.length - 1].month &&
        selectedDate.year === dayMonthYearList[dayMonthYearList.length - 1].year
      ) {
        setSelectedDate({
          day: dayMonthYearList[0].day,
          year: dayMonthYearList[0].year,
          month: dayMonthYearList[0].month,
        });
        return;
      }

      //finding position of selectedDate when not at the end
      let index = 0;
      for (let i = 0; i < dayMonthYearList.length; ++i) {
        if (
          selectedDate.day === dayMonthYearList[i].day &&
          selectedDate.month === dayMonthYearList[i].month &&
          selectedDate.year === dayMonthYearList[i].year
        ) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        day: dayMonthYearList[index + 1].day,
        month: dayMonthYearList[index + 1].month,
        year: dayMonthYearList[index + 1].year,
      });
    }
    if (reportType === "Year") {
      if (
        // checking if is at the end of yearList
        selectedDate.year === yearList[yearList.length - 1].year
      ) {
        setSelectedDate({
          year: yearList[0].year,
        });
        return;
      }

      //finding position of selectedDate when not at the end
      let index = 0;
      for (let i = 0; i < yearList.length; ++i) {
        if (yearList[i].year === selectedDate.year) {
          index = i;
          break;
        }
      }
      setSelectedDate({
        year: yearList[index + 1].year,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackMonthButton}>
          <Ionicons name="chevron-back-outline" size={27} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMonthYearModalVisible}>
          <View style={styles.monthSelector}>
            <Text style={{ fontSize: 25, marginRight: 10, lineHeight: 25 }}>
              {reportType === "Day" &&
              selectedDate.day !== undefined &&
              selectedDate.month !== undefined &&
              selectedDate.year !== undefined
                ? selectedDate.day +
                  "/" +
                  selectedDate.month +
                  "/" +
                  selectedDate.year
                : reportType === "Month" &&
                  selectedDate.month !== undefined &&
                  selectedDate.year !== undefined
                ? selectedDate.month + "/" + selectedDate.year
                : reportType === "Year" && selectedDate.year !== undefined
                ? selectedDate.year
                : "No Data"}
            </Text>
            <AntDesign name="caretdown" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForwardMonthButton}>
          <Ionicons name="chevron-forward-outline" size={27} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReportFilterVisible(true)}
          style={{ position: "absolute", right: 20 }}
        >
          <FontAwesome name="filter" size={27} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BarChart
          selectedDate={selectedDate}
          allExpenses={allExpenses}
          type={reportType}
        />
        <PieChart
          selectedDate={selectedDate}
          allExpenses={allExpenses}
          type={reportType}
        />
        <BarChart
          selectedDate={selectedDate}
          allIncomes={allIncomes}
          type={reportType}
        />
        <PieChart
          selectedDate={selectedDate}
          allIncomes={allIncomes}
          type={reportType}
        />
      </ScrollView>
      <ReportFilter
        {...{ handleReportByDay, handleReportByMonth, handleReportByYear }}
      />
      <MonthYearSelector
        data={
          reportType === "Day"
            ? dayMonthYearList
            : reportType === "Month"
            ? monthYearList
            : reportType === "Year" && yearList
        }
        setSelectedDate={setSelectedDate}
        type={reportType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  monthSelector: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
});
