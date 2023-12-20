import React, { createContext, useState } from 'react'

const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [budgetName, setBudgetName] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("");
    const [budgetTime, setBudgetTime] = useState("Time Range");
    const [modalVisible, setModalVisible] = useState(false);
    const [budgetCategory, setBudgetCategory] = useState("Categories");
    const [isLoading, setIsLoading] = useState(true);
    const time = ["Weekly","Monthly","Quarterly","Half Yearly","Yearly"]
    return (
        <BudgetContext.Provider value={{data, setData,
            budgetName, setBudgetName, budgetAmount, setBudgetAmount, 
            budgetTime, setBudgetTime, budgetCategory, setBudgetCategory,
            modalVisible, setModalVisible, isLoading, setIsLoading, time
        }}>
            {children}
        </BudgetContext.Provider>
    )
}

export { BudgetContext, BudgetProvider }
