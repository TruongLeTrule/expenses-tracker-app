import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

// Get all expenses sorted by date
async function getAllExpenses(db) {
  try {
    const expensesArr = [];

    const expenseRef = collection(db, "expenses");
    const q = query(expenseRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      expensesArr.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Get ${expensesArr.length} expenses sorted by date from db`);
    return expensesArr;
  } catch (error) {
    console.log(error);
  }
}

export { getAllExpenses };
