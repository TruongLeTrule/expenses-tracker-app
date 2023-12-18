import { create } from "zustand";

const useStore = create((set) => ({
  // User info
  uid: null,
  setUID: (data) => {
    set((state) => ({ uid: data }));
  },

  // All expenses array
  allExpenses: null,
  setAllExpenses: (data) => {
    set((state) => ({ allExpenses: data }));
  },

  // Object which key is date
  sortDateExpenses: null,
  setSortDateExpenses: (data) => {
    // Create an array containing expenses group by date
    const groupExpensesByDate = (expenses) => {
      if (expenses.length) {
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
      }
    };
    set((state) => ({ sortDateExpenses: groupExpensesByDate(data) }));
  },

  // Total value of expenses
  total: 0,
  setTotal: (data) => {
    // Get total
    const getTotal = (expenses) =>
      expenses.reduce((result, expense) => result + expense.value, 0);
    set((state) => ({ total: getTotal(data) }));
  },

  // Modal state
  editModalVisible: false,
  toggleEditModalVisible: () => {
    set((state) => ({ editModalVisible: !state.editModalVisible }));
  },
  categoryModalVisible: false,
  toggleCategoryModalVisible: () => {
    set((state) => ({ categoryModalVisible: !state.categoryModalVisible }));
  },
  addModalVisible: false,
  toggleAddModalVisible: () => {
    set((state) => ({ addModalVisible: !state.addModalVisible }));
  },

  // Loading state
  isLoadingInWalletScreen: false,
  setIsLoadingInWalletScreen: (data) => {
    set((state) => ({ isLoadingInWalletScreen: data }));
  },

  // Editing expense
  editingExpense: null,
  setEditingExpense: (expense) => {
    set((state) => ({ editingExpense: expense }));
  },
}));

export default useStore;
