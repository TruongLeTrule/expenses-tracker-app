import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Modal from 'react-native-modal'
import useStore from '../../data/useStore'

function MonthYearSelector({ data, setSelectedDate, type }) {
  const monthYearModalVisible = useStore((state) => state.monthYearModalVisible)
  const toggleMonthYearModalVisible = useStore((state) => state.toggleMonthYearModalVisible)
  function handleChooseDate(item) {
    setSelectedDate({ 'month': item.month, 'year': item.year })
    toggleMonthYearModalVisible()
  }
  return (
    <Modal
      isVisible={monthYearModalVisible}
      onBackdropPress={toggleMonthYearModalVisible}
      onSwipeComplete={toggleMonthYearModalVisible}
      swipeDirection="down"
      className="flex-1 m-0 justify-end"
      onBackButtonPress={toggleMonthYearModalVisible}>
      <View className="bg-[#d1d1d1] rounded-t-xl h-3/4">
        <Text style={styles.textStyle}>Choose month</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            data.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => handleChooseDate(item)} key={index}>
                  <View style={styles.monthYearContainer} >
                    <Text style={{ fontSize: 20 }}>{item.month + '/' + item.year}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    </Modal>
  )
}

export default MonthYearSelector

const styles = StyleSheet.create({
  monthYearContainer: {
    flex: 1,
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center'
  }
})