import { create } from "zustand";

const useAppStore = create((set) => ({
  allExpenses: null,
  setAllExpenses: (data) => {
    set((state) => ({ allExpenses: data }));
  },
  sortDateExpenses: null,
  setSortDateExpenses: (data) => {
    set((state) => ({ sortDateExpenses: data }));
  },
}));

export default useAppStore;
