import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import useStore from "./useStore";

const useFetch = () => {
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const toggleIsLoading = useStore((state) => state.toggleIsLoading);

  // Get all expenses sorted by date
  async function getAllExpenses() {
    try {
      toggleIsLoading();
      const expensesArr = [];

      const expenseRef = collection(db, "expenses");
      const q = query(expenseRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        expensesArr.push({ id: doc.id, ...doc.data() });
      });

      console.log(`Get ${expensesArr.length} expenses sorted by date from db`);
      setAllExpenses(expensesArr);
      toggleIsLoading();
    } catch (error) {
      console.log(error);
    }
  }

  // Update expense
  async function updateExpense(id, newExpense) {
    try {
      const docRef = doc(db, "expenses", id);
      await updateDoc(docRef, newExpense);
      console.log("updated on db");
    } catch (error) {
      console.log(error);
    }
  }

  return { getAllExpenses: getAllExpenses, updateExpense: updateExpense };
};

export default useFetch;
