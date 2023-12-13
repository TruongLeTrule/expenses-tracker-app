import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import useStore from "./useStore";

const useFetch = () => {
  const setSortDateExpenses = useStore((state) => state.setSortDateExpenses);
  const setAllExpenses = useStore((state) => state.setAllExpenses);
  const setTotal = useStore((state) => state.setTotal);
  const toggleIsLoading = useStore((state) => state.toggleIsLoading);

  // Get all expenses sorted by date
  async function getAllExpenses(db) {
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

  return { getAllExpenses: () => getAllExpenses(db) };
};

export default useFetch;
