import { View, Text, StyleSheet,TouchableOpacity,Modal,FlatList, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import BottomSheet from "../components/BudgetsScreen/BottomSheet";
import Budgets from "../components/BudgetsScreen/Budgets";
import { getDocs, collection} from "firebase/firestore";
import {db} from "../firebase";
import useStore from "../data/useStore";
import WhiteBox from "../components/WalletsScreen/WhiteBox";
export default function BudgetsScreen() {
  const data = useStore((state) => state.data);
  const modalVisible = useStore((state) => state.modalVisible);
  const time = useStore((state) => state.time);
  const isLoading = useStore((state) => state.isLoading);

        {/* Fetch data from Firestore */}
  const fetchDataFromFirestore = async () => {
  try {
    const data = [];
    const querySnapshot = await getDocs(collection(db, "Budget"));
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        category: docData.category,
        name: docData.name,
        timerange: docData.timerange,
        uid: docData.uid,
        value: docData.value,
      });
    });

    // Sort data by custom order
    const customOrder = ["Weekly", "Monthly", "Quarterly", "Half Yearly", "Yearly"];
    data.sort((a, b) => {
      const orderA = customOrder.indexOf(a.timerange?.type);
      const orderB = customOrder.indexOf(b.timerange?.type);
      return orderA - orderB;
    });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  } finally {
    useStore.setState({ isLoading: false });
  }
};

  useEffect(() => {
    const fetchData = async() => {  
      const data =  await fetchDataFromFirestore();
      useStore.setState({ data: data });
    }
    fetchData();
  }, []);
  
 {/* Loading screen */}
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"}  />
      </View>
    );
  }

  
  {/* Reset budget */}
  const reset = () => {
    useStore.setState({
      budgetName: '',
      budgetAmount: '',
      budgetTime: 'Time Range',
      budgetCategory: 'Categories',
      modalVisible: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Budgets</Text>
      </View>
      {data ? (
        <View style={styles.container}>
          <FlatList
              data={time}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <WhiteBox mt={"mt-4"}>
                    <View style={styles.boxContainer}>
                      <View style={styles.box} >
                        <View>
                          <Text style={styles.boxText}>{item}</Text>
                          <View style={styles.line}/>
                        </View>
                        {
                          data.map((budget) => {
                            if (budget.timerange?.type === item) {
                              return (
                                <Budgets
                                  key={budget.name}
                                  name={budget.name}
                                  value={budget.value}
                                  category={budget.category}
                                />
                              )
                            }
                          })
                        }
                      </View>
                    </View>
                </WhiteBox>
                )}
              ListFooterComponent={
                <TouchableOpacity style={styles.button} onPress={() => useStore.setState({ modalVisible: true })}>
                  <Text style={styles.text}>Add Budget</Text>
                </TouchableOpacity>
              }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    useStore.setState({ modalVisible: false });
                }}
            >
                <BottomSheet onPress={reset}/>
            </Modal>
            </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>No budget yet</Text>
            <TouchableOpacity style={styles.button} onPress={() => useStore.setState({ modalVisible: true })}>
                      <Text style={styles.text}>Add Budget</Text>
            </TouchableOpacity>
          </View>
        )
      }
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#4cb050",
    height: 50,
  },

  button:{
    backgroundColor: "#4cb050",
    width: 150,
    alignSelf: "center",
    borderRadius: 10,
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  modalContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  close:{
    marginTop: 50,
    backgroundColor: "#4cb050",
    height: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  boxContainer:{
      flexDirection: "column",
      justifyContent: "center",
      paddingVertical: 10,
  },
  box:{

  },
  line:{
    borderWidth: 0.2,
    backgroundColor: "#f2f2f2",
    marginVertical: 5,
    width: "100%",
  },    
  boxText:{
    fontSize: 15,
    color: "black",
  }
});
