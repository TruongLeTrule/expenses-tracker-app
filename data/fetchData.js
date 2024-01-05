import {
	collection,
	getDocs,
	query,
	updateDoc,
	doc,
	where,
	addDoc,
	deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase";
import useStore from "./useStore";
import useLocal from "./localData";

const useFetch = () => {
	const { setLocalExpenses, setLocalIncomes, setLocalUserInfo } = useLocal();

	const setAllExpenses = useStore((state) => state.setAllExpenses);
	const setAllIncomes = useStore((state) => state.setAllIncomes);
	const uid = useStore((state) => state.uid);
	const setUserInfo = useStore((state) => state.setUserInfo);

	// Get all expenses from db
	const getAllExpenses = async (uid) => {
		try {
			// setIsLoadingInWalletScreen(true);

			const expensesArr = [];

			const expenseRef = collection(db, "expenses");
			const q = query(expenseRef, where("uid", "==", uid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				expensesArr.push({ id: doc.id, ...doc.data() });
			});

			console.log(`Get ${expensesArr.length} expenses from db`);
			setAllExpenses(expensesArr);
			setLocalExpenses(expensesArr);

			// setIsLoadingInWalletScreen(false);
		} catch (error) {
			console.log(error);
		}
	};

	// Create new expense from db
	const addExpense = async (expense) => {
		try {
			const docRef = await addDoc(collection(db, "expenses"), expense);
			console.log("Add new expense to db");
			return docRef.id;
		} catch (error) {
			console.log(error);
		}
	};

	// Update expense from db
	const updateExpense = async (id, newExpense) => {
		try {
			console.log(id, newExpense);
			const docRef = doc(db, "expenses", id);
			await updateDoc(docRef, newExpense);
			console.log("update expense on db");
		} catch (error) {
			console.log(error);
		}
	};

	// Delete expense from db
	const deleteExpense = async (id) => {
		try {
			await deleteDoc(doc(db, "expenses", id));
			console.log("Delete expense on db");
		} catch (error) {
			console.log(error);
		}
	};

	// Get all incomes from db
	const getAllIncomes = async (uid) => {
		try {
			const incomesArr = [];

			const incomeRef = collection(db, "income");
			const q = query(incomeRef, where("uid", "==", uid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				incomesArr.push({ id: doc.id, ...doc.data() });
			});

			console.log(`Get ${incomesArr.length} incomes from db`);
			setAllIncomes(incomesArr);
			setLocalIncomes(incomesArr);
		} catch (error) {
			console.log(error);
		}
	};

	// Create new income from db
	const addIncome = async (income) => {
		try {
			const docRef = await addDoc(collection(db, "income"), income);
			console.log("Add new income to db");
			return docRef.id;
		} catch (error) {
			console.log(error);
		}
	};

	// Update income from db
	const updateIncome = async (id, newIncome) => {
		try {
			console.log(id, newIncome);
			const docRef = doc(db, "income", id);
			await updateDoc(docRef, newIncome);
			console.log("update income on db");
		} catch (error) {
			console.log(error);
		}
	};

	// Delete income from db
	const deleteIncome = async (id) => {
		try {
			await deleteDoc(doc(db, "income", id));
			console.log("Delete income on db");
		} catch (error) {
			console.log(error);
		}
	};

	// Get budgets from db
	const getBudgets = async (uid, time) => {
		try {
			const data = [];
			const budgetRef = collection(db, "Budget");
			const q = query(budgetRef, where("uid", "==", uid));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const docData = doc.data();
				data.push({
					id: doc.id,
					category: docData.category,
					name: docData.name,
					timerange: docData.timerange,
					uid: docData.uid,
					value: docData.value,
				});
			});

			// Sort data by custom order
			data.sort((a, b) => {
				const orderA = time.indexOf(a.timerange?.type);
				const orderB = time.indexOf(b.timerange?.type);
				return orderA - orderB;
			});
			// console.log("Budgets fetched");
			return data;
		} catch (error) {
			console.error("Error fetching data from Firestore:", error);
			return [];
		} finally {
			useStore.setState({ isLoading: false });
		}
	};

	// Upload image to cloud storage
	const getBlobFroUri = async (uri) => {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		return blob;
	};

	const uploadAva = async (file) => {
		let avaURL;
		const fileBlob = await getBlobFroUri(file);
		const storageRef = ref(storage, `images/avatar/${uid}.jpg`);
		console.log("uploading file");
		await uploadBytes(storageRef, fileBlob).then((snapShot) => {
			console.log("Uploaded a file!");
			avaURL = snapShot.ref.fullPath;
		});
		await getDownloadURL(ref(storage, avaURL))
			.then((url) => {
				avaURL = url;
			})
			.catch((err) => {
				console.log(err);
			});
		return avaURL;
	};

	// Download image from cloud storage
	const downloadAva = async () => {
		let avaURL;
		await getDownloadURL(ref(storage, `images/avatar/${uid}.jpg`))
			.then((url) => {
				avaURL = url;
			})
			.catch((err) => {
				console.log("No image found");
			});
		return avaURL;
	};

	// Get user info from db
	const getUserInfoFroDB = async (uid) => {
		try {
			let userInfo;

			const expenseRef = collection(db, "user");
			const q = query(expenseRef, where("uid", "==", uid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				userInfo = doc.data();
			});

			setUserInfo(userInfo);
			setLocalUserInfo(userInfo);
			console.log(`Get user info from db`);
		} catch (error) {
			console.log(error);
		}
	};

	// Add user info
	const addUserInfoToDB = async (info) => {
		try {
			const docRef = await addDoc(collection(db, "user"), info);
			console.log("Add user info to db");
			return docRef.id;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getAllExpenses: getAllExpenses,
		updateExpense: updateExpense,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		getAllIncomes: getAllIncomes,
		addIncome: addIncome,
		updateIncome: updateIncome,
		deleteIncome: deleteIncome,
		getBudgets: getBudgets,
		uploadAva: uploadAva,
		downloadAva: downloadAva,
		addUserInfoToDB: addUserInfoToDB,
		getUserInfoFroDB: getUserInfoFroDB,
	};
};

export default useFetch;
