import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocal = () => {
  // Get uid from localStorage
  const getLocalUID = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      return uid;
    } catch (error) {
      console.log(error);
    }
  };

  // Set uid to localStorage
  const setLocalUID = async (uid) => {
    try {
      await AsyncStorage.setItem("uid", uid);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove uid from localStorage
  const removeLocalUID = async () => {
    try {
      await AsyncStorage.removeItem("uid");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getLocalUID: getLocalUID,
    setLocalUID: setLocalUID,
    removeLocalUID: removeLocalUID,
  };
};

export default useLocal;
