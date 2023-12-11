import { create } from "zustand";

const useAppStore = create((set) => ({
  allExpenses: null,
  setAllExpenses: (data) => {
    set((state) => ({ allExpenses: data }));
  },
  sortDateExpenses: null,
  setSortDateExpenses: (data) => {
    // Create an array containing expenses group by date
    const groupExpensesByDate = (expenses) => {
      // Set last date to the last date of expenses
      let lastDate = new Date(expenses[0].date.seconds * 1000);
      let groupedExpenses = [expenses[0]];
      let result = [];

      for (let i = 0; i < expenses.length; i++) {
        const expenseDate = new Date(expenses[i].date.seconds * 1000);

        // Push grouped expenses into result if current expense has different date
        if (lastDate.toDateString() !== expenseDate.toDateString()) {
          result.push({
            title: lastDate,
            data: [...groupedExpenses],
          });

          // Set last date to current expense date and empty the array
          lastDate = expenseDate;
          groupedExpenses = [];
        }

        // Don't push into grouped expenses if this is the first element,
        // cause is already pushed in the declaration
        if (i !== 0) {
          groupedExpenses.push(expenses[i]);
        }

        // Push grouped expenses into result if this is the last element
        if (i === expenses.length - 1) {
          result.push({
            title: lastDate,
            data: [...groupedExpenses],
          });
        }
      }

      return result;
    };
    set((state) => ({ sortDateExpenses: groupExpensesByDate(data) }));
  },
  total: 0,
  setTotal: (data) => {
    // Get total
    const getTotal = (expenses) =>
      expenses.reduce((result, expense) => result + expense.value, 0);
    set((state) => ({ total: getTotal(data) }));
  },
  modalVisible: false,
  setModalVisible: () => {
    set((state) => ({ modalVisible: !state.modalVisible }));
  },
}));

export default useAppStore;
