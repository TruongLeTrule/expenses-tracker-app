import React from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { Text } from 'react-native'
import useStore from '../../data/useStore'

function BarChartExpenses() {
  const allExpenses = useStore((state) => state.allExpenses);
  let day = [], month = [], year = []
  let latestExpense;
  for (let i = 0; i < allExpenses.length; i++) {
    latestExpense = allExpenses[0]

  }
  console.log(latestExpense)
  return (
    <Text>BarChart</Text>
  )
}

export default BarChartExpenses