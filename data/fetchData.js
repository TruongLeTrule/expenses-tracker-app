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
  const { setLocalExpenses, setLocalIncomes } = useLocal();

  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setAllIncomes = useStore((state) => state.setAllIncomes);
  const setIsLoadingInWalletScreen = useStore(
    (state) => state.setIsLoadingInWalletScreen
  );

  // Get all expenses from db
  const getAllExpenses = async (uid) => {
    try {
      setIsLoadingInWalletScreen(true);

      const expensesArr = [];

      const expenseRef = collection(db, "expenses");
      const q = query(expenseRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        expensesArr.push({ id: doc.id, ...doc.data() });
      });

      console.log(`Get ${expensesArr.length} expenses from db`);
      setAllExpenses(expensesArr);
      setLocalExpenses(expensesArr);

      setIsLoadingInWalletScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create new expense from db
  const addExpense = async (expense) => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), expense);
      console.log("Add new doc to db");
      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  // Update expense from db
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

  // Delete expense from db
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      console.log("Delete expense on db");
    } catch (error) {
      console.log(error);
    }
  };

  // Get all incomes from db
  const getAllIncomes = async (uid) => {
    try {
      const incomesArr = [];

      const incomeRef = collection(db, "income");
      const q = query(incomeRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        incomesArr.push({ id: doc.id, ...doc.data() });
      });

      console.log(`Get ${incomesArr.length} incomes from db`);
      setAllIncomes(incomesArr);
      setLocalIncomes(incomesArr);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllExpenses: getAllExpenses,
    updateExpense: updateExpense,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    getAllIncomes: getAllIncomes,
  };
};

export default useFetch;
