import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, Text, View } from "react-native";

function BarChartExpenses({ selectedDate, allExpenses, allIncomes, type }) {
  let data = [
    { label: "Food", value: 0 },
    { label: "Drink", value: 0 },
    { label: "Vehicle", value: 0 },
    { label: "Edu", value: 0 },
    { label: "Clothing", value: 0 },
    { label: "Relax", value: 0 },
    { label: "Health", value: 0 },
    { label: "Other", value: 0 },
  ]; //this array contain data for drawing the bar chart
  let dataIncomes = [

    { label: "Salary", value: 0 },
    { label: "Invest", value: 0 },
    { label: "Wage", value: 0 },
    { label: "Bonus", value: 0 },
    { label: "Other", value: 0 },

  ]
  let ExpensesIncomes = ''
  if (allExpenses)
    ExpensesIncomes = 'Expenses'
  else if (allIncomes)
    ExpensesIncomes = 'Incomes'


  function conditionalGetter(date) {
    if (type === 'Day') {
      return selectedDate.day === date.getDate() &&
        selectedDate.month === date.getMonth() + 1 &&
        selectedDate.year === date.getFullYear()
    } else if (type === 'Month') {
      return selectedDate.month === date.getMonth() + 1 &&
        selectedDate.year === date.getFullYear()
    }
    else if (type === 'Year') {
      return selectedDate.year === date.getFullYear()
    }
  }

  if (allExpenses) {

    allExpenses.forEach((expense) => {
      let date = new Date(expense.date.seconds * 1000);
      if (conditionalGetter(date)) {
        switch (expense.category) {
          case "food":
            data[0] = {
              ...data[0],
              value: data[0].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[0].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "drink":
            data[1] = {
              ...data[1],
              value: data[1].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[1].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "vehicle":
            data[2] = {
              ...data[2],
              value: data[2].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[2].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "education":
            data[3] = {
              ...data[3],
              value: data[3].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[3].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "clothing":
            data[4] = {
              ...data[4],
              value: data[4].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[4].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "relax":
            data[5] = {
              ...data[5],
              value: data[5].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[5].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "healthCare":
            data[6] = {
              ...data[6],
              value: data[6].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[6].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "other":
            data[7] = {
              ...data[7],
              value: data[7].value + expense.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {data[7].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
        }
      }
    });

  }


  if (allIncomes) {
    allIncomes.forEach((income) => {
      let date = new Date(income.date.seconds * 1000);
      if (conditionalGetter(date)) {
        switch (income.category) {
          case "salary":
            dataIncomes[0] = {
              ...dataIncomes[0],
              value: dataIncomes[0].value + income.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {dataIncomes[0].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "invest":
            dataIncomes[1] = {
              ...dataIncomes[1],
              value: dataIncomes[1].value + income.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {dataIncomes[1].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "wage":
            dataIncomes[2] = {
              ...dataIncomes[2],
              value: dataIncomes[2].value + income.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {dataIncomes[2].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "bonus":
            dataIncomes[3] = {
              ...dataIncomes[3],
              value: dataIncomes[3].value + income.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {dataIncomes[3].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
          case "other":
            dataIncomes[4] = {
              ...dataIncomes[4],
              value: dataIncomes[4].value + income.value,
              topLabelComponent: () => {
                return (
                  <Text style={styles.barChartTopLabel}>
                    {dataIncomes[4].value.toLocaleString()}
                  </Text>
                );
              },
            };
            break;
        }
      }
    });
  }


  return (
    <View style={styles.barChartContainer}>
      <Text
        style={{
          padding: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {`${ExpensesIncomes}`} Bar Chart
      </Text>
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 35,
      }}>(VND)</Text>
      <BarChart
        xAxisLength={250}
        data={allIncomes ? dataIncomes : data}
        yAxisExtraHeight={20}
        labelWidth={40}
        rotateLabel
        spacing={35}
        yAxisLabelWidth={60}
        stepHeight={20}
        disablePress={true}
        rulesColor={"gray"}
        rulesLength={250}
        frontColor={"#080e89"}
      />
    </View>
  );
}

export default BarChartExpenses;

const styles = StyleSheet.create({
  barChartContainer: {
    width: 375,
    height: 450,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  barChartTopLabel: {
    fontSize: 13,
    width: 100,
    paddingTop: 10,
    textAlign: "center",
  },
});
