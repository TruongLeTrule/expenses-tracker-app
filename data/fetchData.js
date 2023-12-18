import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import useStore from "./useStore";

const useFetch = () => {
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setIsLoadingInWalletScreen = useStore(
    (state) => state.setIsLoadingInWalletScreen
  );

  // Get all expenses sorted by date
  const getAllExpenses = async (uid) => {
    try {
      setIsLoadingInWalletScreen(true);
      const expensesArr = [];

      const expenseRef = collection(db, "expenses");
      const q = query(
        expenseRef,
        orderBy("date", "desc"),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        expensesArr.push({ id: doc.id, ...doc.data() });
      });

      console.log(`Get ${expensesArr.length} expenses sorted by date from db`);
      setAllExpenses(expensesArr);
      setIsLoadingInWalletScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create new expense
  const addExpense = async (expense) => {
    const expenseRef = doc(collection(db, "expenses"));
    await setDoc(expenseRef, expense);
    console.log("add expense to db");
    return expenseRef;
  };

  // Update expense
  const updateExpense = async (id, newExpense) => {
    try {
      const docRef = doc(db, "expenses", id);
      await updateDoc(docRef, newExpense);
      console.log("updated on db");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    addExpense: addExpense,
  };
};

export default useFetch;
