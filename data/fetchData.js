import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import useStore from "./useStore";
import useLocal from "./localData";

const useFetch = () => {
  const { setLocalExpenses } = useLocal();

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
      setLocalExpenses(expensesArr);

      setIsLoadingInWalletScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create new expense
  const addExpense = async (expense) => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), expense);
      console.log("Add new doc to db");
      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  // Update expense
  const updateExpense = async (id, newExpense) => {
    try {
      console.log(id, newExpense);
      const docRef = doc(db, "expenses", id);
      await updateDoc(docRef, newExpense);
      console.log("updated on db");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      console.log("Delete expense on db");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
  };
};

export default useFetch;
