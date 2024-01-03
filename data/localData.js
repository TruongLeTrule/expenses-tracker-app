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

  // Set avatar to localStorage
  const setLocalAva = async (uri) => {
    try {
      await AsyncStorage.setItem("avatar", uri);
      console.log("Set avatar uri to local");
    } catch (error) {
      console.log(error);
    }
  };

  // Get avatar from localStorage
  const getLocalAva = async () => {
    try {
      const avatarURI = await AsyncStorage.getItem("avatar");
      console.log("Get avatar uri from local");
      return avatarURI;
    } catch (error) {
      console.log(error);
    }
  };

  // Remove avatar from localStorage
  const removeLocalAva = async () => {
    try {
      await AsyncStorage.removeItem("avatar");
      console.log("Remove avatar from local");
    } catch (error) {
      console.log(error);
    }
  };

  // Set user info to local storage
  const setLocalUserInfo = async (expenses) => {
    try {
      const jsonValue = JSON.stringify(expenses);
      await AsyncStorage.setItem("userInfo", jsonValue);
      console.log("Set user info in local");
    } catch (error) {
      console.log(error);
    }
  };

  // Get user info from local storage
  const getLocalUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userInfo");
      console.log("Get user info from local");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Remove user info from localStorage
  const removeLocalUserInfo = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      console.log("Remove user info from local");
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllLocalData = async () => {
    await removeLocalUID();
    await removeLocalExpenses();
    await removeLocalIncomes();
    await removeLocalAva();
    await removeLocalUserInfo();
  };

  return {
    getLocalUID: getLocalUID,
    getLocalExpenses: getLocalExpenses,
    getLocalIncomes: getLocalIncomes,
    getLocalAva: getLocalAva,
    getLocalUserInfo: getLocalUserInfo,
    setLocalUID: setLocalUID,
    setLocalExpenses: setLocalExpenses,
    setLocalIncomes: setLocalIncomes,
    setLocalAva: setLocalAva,
    setLocalUserInfo: setLocalUserInfo,
    removeAllLocalData: removeAllLocalData,
  };
};

export default useLocal;
