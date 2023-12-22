import React from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { StyleSheet, Text, View } from 'react-native'

function BarChartExpenses({ selectedDate, allExpenses }) {
  let data = [
    { label: "Food", value: 0 },
    { label: "Drink", value: 0 },
    { label: "Vehicle", value: 0 },
    { label: "Edu", value: 0 },
    { label: "Clothing", value: 0 },
    { label: "Relax", value: 0 },
    { label: "Health", value: 0 },
    { label: "Other", value: 0 }
  ] //this array contain data for drawing the bar chart


  //Extracting data in the selected month
  allExpenses.forEach(expense => {
    let date = new Date(expense.date.seconds * 1000)
    if (selectedDate.month === date.getMonth() + 1 && selectedDate.year === date.getFullYear()) {
      switch (expense.category) {
        case "food":
          data[0] = {
            ...data[0], value: data[0].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[0].value.toLocaleString()}</Text>
            }
          }
          break;
        case "drink":
          data[1] = {
            ...data[1], value: data[1].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[1].value.toLocaleString()}</Text>
            }
          }
          break;
        case "vehicle":
          data[2] = {
            ...data[2], value: data[2].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[2].value.toLocaleString()}</Text>
            }
          }
          break;
        case "education":
          data[3] = {
            ...data[3], value: data[3].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[3].value.toLocaleString()}</Text>
            }
          }
          break;
        case "clothing":
          data[4] = {
            ...data[4], value: data[4].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[4].value.toLocaleString()}</Text>
            }
          }
          break;
        case "relax":
          data[5] = {
            ...data[5], value: data[5].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[5].value.toLocaleString()}</Text>
            }
          }
          break;
        case "healthCare":
          data[6] = {
            ...data[6], value: data[6].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[6].value.toLocaleString()}</Text>
            }
          }
          break;
        case "other":
          data[7] = {
            ...data[7], value: data[7].value + expense.value, topLabelComponent: () => {
              return <Text style={styles.barChartTopLabel}>{data[7].value.toLocaleString()}</Text>
            }
          }
          break;

      }
    }
  })

  return (
    <View style={styles.barChartContainer}>
      <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Monthly Expense Bar Chart (VND)</Text>
      <BarChart
        xAxisLength={250}
        data={data}
        yAxisExtraHeight={20}
        labelWidth={40}
        rotateLabel
        spacing={35}
        yAxisLabelWidth={60}
        stepHeight={20}
        disablePress={true}
        rulesColor={'gray'}
        rulesLength={250} />

    </View>

  )
}

export default BarChartExpenses


const styles = StyleSheet.create({
  barChartContainer: {
    width: 375,
    height: 400,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20
  },
  barChartTopLabel: {
    fontSize: 13,
    width: 100,
    paddingTop: 10,
    textAlign: 'center'
  }
})