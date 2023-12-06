import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

const useFetch = () => {
  const [data, setData] = useState(null);

  // Get all expenses
  async function getAllExpenses(db) {
    try {
      const expensesArr = [];

      const expenseCol = collection(db, "expenses");
      const expenseSnapshot = await getDocs(expenseCol);
      expenseSnapshot.forEach((doc) =>
        expensesArr.push({ id: doc.id, ...doc.data() })
      );

      setData({ ...data, allExpenses: expensesArr });
      console.log(`Get ${expensesArr.length} expenses from db`);
    } catch (error) {
      console.log(error);
    }
  }

  // Get expenses sort by date
  async function getSortDateExpenses(db) {
    try {
      const expensesArr = [];

      const expenseRef = collection(db, "expenses");
      const q = query(expenseRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        expensesArr.push({ id: doc.id, ...doc.data() });
      });

      setData({ ...data, sortDateExpenses: expensesArr });
      console.log(`Get ${expensesArr.length} expenses sorted by date from db`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSortDateExpenses(db);
    getAllExpenses(db);
  }, []);

  return data;
};

export default useFetch;
