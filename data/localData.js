import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocal = () => {
  // Get uid from localStorage
  const getLocalUID = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      console.log("Get uid from local");
      return uid;
    } catch (error) {
      console.log(error);
    }
  };

  // Set uid to localStorage
  const setLocalUID = async (uid) => {
    try {
      await AsyncStorage.setItem("uid", uid);
      console.log("Set uid to local");
    } catch (error) {
      console.log(error);
    }
  };

  // Remove uid from localStorage
  const removeLocalUID = async () => {
    try {
      await AsyncStorage.removeItem("uid");
      console.log("Remove uid from local");
    } catch (error) {
      console.log(error);
    }
  };

  // Set expenses to local storage
  const setLocalExpenses = async (expenses) => {
    try {
      const jsonValue = JSON.stringify(expenses);
      await AsyncStorage.setItem("expenses", jsonValue);
      console.log("Set expenses in local");
    } catch (error) {
      console.log(error);
    }
  };

  // Get expenses from local storage
  const getLocalExpenses = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expenses");
      console.log("Get expenses from local");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Remove expenses from localStorage
  const removeLocalExpenses = async () => {
    try {
      await AsyncStorage.removeItem("expenses");
      console.log("Remove expenses from local");
    } catch (error) {
      console.log(error);
    }
  };

  // Set incomes to local storage
  const setLocalIncomes = async (incomes) => {
    try {
      const jsonValue = JSON.stringify(incomes);
      await AsyncStorage.setItem("income", jsonValue);
      console.log("Set income in local");
    } catch (error) {
      console.log(error);
    }
  };

  // Get incomes from local storage
  const getLocalIncomes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("income");
      console.log("Get incomes from local");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Remove incomes from localStorage
  const removeLocalIncomes = async () => {
    try {
      await AsyncStorage.removeItem("income");
      console.log("Remove income from local");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getLocalUID: getLocalUID,
    setLocalUID: setLocalUID,
    removeLocalUID: removeLocalUID,
    setLocalExpenses: setLocalExpenses,
    getLocalExpenses: getLocalExpenses,
    removeLocalExpenses: removeLocalExpenses,
    setLocalIncomes: setLocalIncomes,
    getLocalIncomes: getLocalIncomes,
    removeLocalIncomes: removeLocalIncomes,
  };
};

export default useLocal;
