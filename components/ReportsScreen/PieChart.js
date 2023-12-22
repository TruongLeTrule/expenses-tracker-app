import React from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
function PieChartExpenses({ selectedDate, allExpenses }) {

  let totalExpenseInAMonth = 0;
  let data = [
    { label: "Food", value: 0, text: '', color: 'red', shiftTextX: -10 },
    { label: "Drink", value: 0, text: '', color: 'green', shiftTextX: -10 },
    { label: "Vehicle", value: 0, text: '', color: 'orange', shiftTextX: -10 },
    { label: "Edu", value: 0, text: '', color: 'purple', shiftTextX: -10 },
    { label: "Clothing", value: 0, text: '', color: '#65fe04', shiftTextX: -10 },
    { label: "Relax", value: 0, text: '', color: 'aqua', shiftTextX: -10 },
    { label: "Health", value: 0, text: '', color: 'blue', shiftTextX: -10 },
    { label: "Other", value: 0, text: '', color: 'brown', shiftTextX: -10 }
  ] //this array contain data for drawing the pie chart


  //Extracting data in the selected month
  if (allExpenses) {
    allExpenses.forEach(expense => {
      let date = new Date(expense.date.seconds * 1000)
      if (selectedDate.month === date.getMonth() + 1 && selectedDate.year === date.getFullYear()) {
        switch (expense.category) {
          case "food":
            data[0] = { ...data[0], value: data[0].value + expense.value }
            break;
          case "drink":
            data[1] = { ...data[1], value: data[1].value + expense.value }
            break;
          case "vehicle":
            data[2] = { ...data[2], value: data[2].value + expense.value }
            break;
          case "education":
            data[3] = { ...data[3], value: data[3].value + expense.value }
            break;
          case "clothing":
            data[4] = { ...data[4], value: data[4].value + expense.value }
            break;
          case "relax":
            data[5] = { ...data[5], value: data[5].value + expense.value }
            break;
          case "healthCare":
            data[6] = { ...data[6], value: data[6].value + expense.value }
            break;
          case "other":
            data[7] = { ...data[7], value: data[7].value + expense.value }
            break;

        }
      }
    })
  }

  //Summing up all categories total amount of money 

  for (let i = 0; i < data.length; ++i) {
    totalExpenseInAMonth += data[i].value;
  }

  for (let i = 0; i < data.length; ++i) {
    if (data[i].value === totalExpenseInAMonth) {
      data[i].text = '100%'
    }
    else if (data[i].value === 0) {
      continue;
    }
    else
      data[i].text = `${(data[i].value / totalExpenseInAMonth).toFixed(3) * 100}%`
  }
  return (
    <View style={styles.pieChartContainer}>
      <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Monthly Expenses Pie Chart</Text>
      <PieChart
        showText
        data={data}
        textColor='black'
        textSize={20}
        labelsPosition='outward'
        fontWeight='bold'
        initialAngle={-20}
        radius={150}
      />
      <View style={styles.colorDetails}>
        <View style={styles.detailContainer}>

          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="red" />   {data[0].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="orange" />   {data[2].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="#65fe04" />   {data[4].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="blue" />   {data[6].label}</Text>

        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="green" />   {data[1].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="purple" />   {data[3].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="aqua" />   {data[5].label}</Text>
          <Text style={styles.textStyle}><FontAwesome5 name="square-full" size={20} color="brown" />   {data[7].label}</Text>

        </View>

      </View>

    </View>
  )
}

export default PieChartExpenses


const styles = StyleSheet.create({
  pieChartContainer: {
    width: 375,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  },

  colorDetails: {
    width: '100%',
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25
  },

  textStyle: {
    fontSize: 20,
    width: 150,
    margin: 10,
  }
})