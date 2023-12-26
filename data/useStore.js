import { create } from "zustand";

const useStore = create((set) => ({
  // User info
  uid: null,
  setUID: (data) => {
    set((state) => ({ uid: data }));
  },

  // All expenses and income array
  allExpensesAndIncomes: null,
  setAllExpensesAndIncome: (data) => {
    set((state) => ({ allExpensesAndIncomes: data }));
  },

  // Expenses and Income grouped by date
  sortDateExpensesAndIncome: null,
  setSortDateExpensesAndIncome: (data) => {
    // Group list by date which date is title and data is a group of expense and income
    const groupByDate = (list) => {
      if (list.length) {
        // Set last date to the last date of list
        let lastDate = new Date(list[0].date.seconds * 1000);
        let smallList = [list[0]];
        let result = [];

        for (let i = 0; i < list.length; i++) {
          const itemDate = new Date(list[i].date.seconds * 1000);

          // Push small list into result if current item has different date
          if (lastDate.toDateString() !== itemDate.toDateString()) {
            result.push({
              title: lastDate,
              data: [...smallList],
            });

            // Set last date to current item date and empty the array
            lastDate = itemDate;
            smallList = [];
          }

          // Don't push into small list if this is the first element,
          // cause is already pushed in the declaration
          if (i !== 0) {
            smallList.push(list[i]);
          }

          // Push small list into result if this is the last element
          if (i === list.length - 1) {
            result.push({
              title: lastDate,
              data: [...smallList],
            });
          }
        }

        return result;
      }
    };
    set((state) => ({ sortDateExpensesAndIncome: groupByDate(data) }));
  },

  // All expenses array
  allExpenses: null,
  setAllExpenses: (data) => {
    set((state) => ({ allExpenses: data }));
  },

  // Expenses grouped by date
  sortDateExpenses: null,
  setSortDateExpenses: (data) => {
    // Group list by date which date is title and data is a group of expense and income
    const groupByDate = (list) => {
      if (list) {
        if (list.length) {
          // Set last date to the last date of list
          let lastDate = new Date(list[0].date.seconds * 1000);
          let smallList = [list[0]];
          let result = [];

          for (let i = 0; i < list.length; i++) {
            const itemDate = new Date(list[i].date.seconds * 1000);

            // Push small list into result if current item has different date
            if (lastDate.toDateString() !== itemDate.toDateString()) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });

              // Set last date to current item date and empty the array
              lastDate = itemDate;
              smallList = [];
            }

            // Don't push into small list if this is the first element,
            // cause is already pushed in the declaration
            if (i !== 0) {
              smallList.push(list[i]);
            }

            // Push small list into result if this is the last element
            if (i === list.length - 1) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });
            }
          }

          return result;
        }
      }
    };
    set((state) => ({ sortDateExpenses: groupByDate(data) }));
  },

  // Incomes grouped by date
  sortDateIncomes: null,
  setSortDateIncomes: (data) => {
    // Group list by date which date is title and data is a group of expense and income
    const groupByDate = (list) => {
      if (list) {
        if (list.length) {
          // Set last date to the last date of list
          let lastDate = new Date(list[0].date.seconds * 1000);
          let smallList = [list[0]];
          let result = [];

          for (let i = 0; i < list.length; i++) {
            const itemDate = new Date(list[i].date.seconds * 1000);

            // Push small list into result if current item has different date
            if (lastDate.toDateString() !== itemDate.toDateString()) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });

              // Set last date to current item date and empty the array
              lastDate = itemDate;
              smallList = [];
            }

            // Don't push into small list if this is the first element,
            // cause is already pushed in the declaration
            if (i !== 0) {
              smallList.push(list[i]);
            }

            // Push small list into result if this is the last element
            if (i === list.length - 1) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });
            }
          }

          return result;
        }
      }
    };
    set((state) => ({ sortDateIncomes: groupByDate(data) }));
  },

  // All incomes array
  allIncomes: null,
  setAllIncomes: (data) => {
    set((state) => ({ allIncomes: data }));
  },

  // Filtered transactions list
  filteredList: null,
  setFilteredList: (data) => {
    set((state) => ({ filteredList: data }));
  },

  // Render list which combine all expense and income together
  renderList: null,
  setRenderList: (data) => {
    // Group list by date which date is title and data is a group of expense and income
    const groupByDate = (list) => {
      if (list) {
        if (list.length) {
          // Set last date to the last date of list
          let lastDate = new Date(list[0].date.seconds * 1000);
          let smallList = [list[0]];
          let result = [];

          for (let i = 0; i < list.length; i++) {
            const itemDate = new Date(list[i].date.seconds * 1000);

            // Push small list into result if current item has different date
            if (lastDate.toDateString() !== itemDate.toDateString()) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });

              // Set last date to current item date and empty the array
              lastDate = itemDate;
              smallList = [];
            }

            // Don't push into small list if this is the first element,
            // cause is already pushed in the declaration
            if (i !== 0) {
              smallList.push(list[i]);
            }

            // Push small list into result if this is the last element
            if (i === list.length - 1) {
              result.push({
                title: lastDate,
                data: [...smallList],
              });
            }
          }

          return result;
        }
      }
    };
    set((state) => ({ renderList: groupByDate(data) }));
  },

  // Total value of expenses,
  totalExpense: 0,
  setTotalExpense: (data) => {
    // Get total expense, data is an array of expenses
    const getTotalExpense = (expenses) =>
      expenses.reduce((result, expense) => result + expense.value, 0);
    set((state) => ({ totalExpense: getTotalExpense(data) }));
  },

  // Total value of incomes, data is an array of incomes
  totalIncome: 0,
  setTotalIncome: (data) => {
    // Get total income
    const getTotalIncome = (incomes) =>
      incomes.reduce((result, income) => result + income.value, 0);
    set((state) => ({ totalIncome: getTotalIncome(data) }));
  },

  // Total value calculation of income and expense
  total: 0,
  setTotal: (data) => {
    set((state) => ({ total: data }));
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

  monthYearModalVisible: false,
  toggleMonthYearModalVisible: () => {
    set((state) => ({ monthYearModalVisible: !state.monthYearModalVisible }));
  },

  // Loading state
  isLoadingInWalletScreen: false,
  setIsLoadingInWalletScreen: (data) => {
    set((state) => ({ isLoadingInWalletScreen: data }));
  },

  // Editing transaction
  editingTransaction: null,
  setEditingTransaction: (transaction) => {
    set((state) => ({ editingTransaction: transaction }));
  },

  //Budget state
  data: [],
  setData: (data) => set({ data }),

  budgetName: "",
  setBudgetName: (budgetName) => set({ budgetName }),

  budgetAmount: "",
  setBudgetAmount: (budgetAmount) => set({ budgetAmount }),

  budgetTime: "Time Range",
  setBudgetTime: (budgetTime) => set({ budgetTime }),

  modalVisible: false,
  setModalVisible: (modalVisible) => set({ modalVisible }),

  budgetCategory: "Categories",
  setBudgetCategory: (budgetCategory) => set({ budgetCategory }),

  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),

  time: ["Weekly", "Monthly", "Quarterly", "Half Yearly", "Yearly"],
  reportFilterVisible: true,
  setReportFilterVisible: (data) => {
    set(() => ({ reportFilterVisible: data }));
  },
  selectedDate: {},
  setSelectedDate: (data) => {
    set(() => ({ selectedDate: data }));
  },
}));

export default useStore;
