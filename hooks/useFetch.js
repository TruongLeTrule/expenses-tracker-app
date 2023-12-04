import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);

  async function getExpenses(db) {
    try {
      console.log("Get expenses from db");
      const expensesArr = [];
      const expenseCol = collection(db, "expense");
      const expenseSnapshot = await getDocs(expenseCol);
      expenseSnapshot.forEach((doc) =>
        expensesArr.push({ id: doc.id, ...doc.data() })
      );
      setData(expensesArr);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExpenses(db);
  }, [db]);

  return data;
};

export default useFetch;
