import { View, Text, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import TreeNode from "./Treenode";
import useStore from "../../data/useStore";
export default CategoryScreen = ({onPress}) => {
    const budgetCategory = useStore((state) => state.budgetCategory);
    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <View style={styles.titleHeader}>
                        <Ionicon name="chevron-down-outline" size={30} color="black" style={styles.icon}  onPress={() => onPress(budgetCategory)}/>
                        <Text style={styles.titleText}>Choose Categories</Text>
                </View>
                <View style={styles.content} >
                 <TreeNode content="Basics">
                    <TreeNode content="Food & drink" type="|-----" onPress={() => onPress("Food & drink")}/>
                    <TreeNode content="Bill" type="|-----" onPress={() => onPress("Bill")} />
                    <TreeNode content="Transport" type="|-----" onPress={() => onPress("Transport")} />
                    <TreeNode content="House rent" type="|-----"  onPress={() => onPress("House rent")}/>
                    <TreeNode content="Fix & maintenance" type="|-----" onPress={() => onPress("Fix & maintenance")} />
                    <TreeNode content="Utilities" type="|-----" onPress={() => onPress("Utilities")}/>
                    <TreeNode content="Groceries" type="|-----" onPress={() => onPress("Groceries")}/>
                 </TreeNode>
                <TreeNode content="Enjoyment" type="">
                    <TreeNode content="Entertainment" type="|-----" onPress={() => onPress("Entertainment")}/>
                    <TreeNode content="Fashion" type="|-----" onPress={() => onPress("Fashion")}/>
                    <TreeNode content="Travel" type="|-----" onPress={() => onPress("Travel")}/>
                    <TreeNode content="Beauty Care" type="|-----" onPress={() => onPress("Beauty Care")}/>
                    <TreeNode content="Party" type="|-----" onPress={() => onPress("Party")}/>
                </TreeNode>
                <TreeNode content="Health" type="">
                    <TreeNode content="Medical" type="|-----" onPress={() => onPress("Medical")}/>
                    <TreeNode content="Fitness" type="|-----" onPress={() => onPress("Fitness")}/>
                    <TreeNode content="Sports" type="|-----" onPress={() => onPress("Sports")}/>
                </TreeNode>
                <TreeNode content="Kids" type=""/>
                <TreeNode content="Education" type="">
                    <TreeNode content="Books" type="|-----" onPress={() => onPress("Books")}/>
                    <TreeNode content="Stationary" type="|-----" onPress={() => onPress("Stationary")}/>
                    <TreeNode content="Tuition" type="|-----" onPress={() => onPress("Tuition")}/>
                </TreeNode>

                </View>
            </View>
        </View>
    );

    }
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        titleHeader: {
            flexDirection: "row",
            margin:10
        },
        content:{
            margin: 10,
        },
        titleText:{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginLeft: 80,
        },
        detailContainer:{
            backgroundColor: "#fff",
            borderRadius: 10,
            height: '100%',
        },
        name:{
            flexDirection: "row",
        },

        button:{
            marginTop: 50,
            backgroundColor: "#4cb050",
            height: 50,
            width: "50%",
            alignSelf: "center",
            borderRadius: 10,
        },
        text:{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginTop: 10,
        },
        title:{
            fontSize: 20,
            color: "gray",
            marginTop: 10,
        },
        titleContainer:{
            marginLeft: 10,
        },
        line:{
            height: 1,
            width: 350,
            backgroundColor: '#ccc',
            marginVertical: 12,
            
        },
        image:{
            width: 40,
            height: 40,
        },
        treeStyles: {
            position: 'absolute',
            top: 40,
            left: 40,
            color: 'white',
            fill: 'white',
            width: '100%'
          },
          
          typeStyles: {
            fontSize: '2em',
            verticalAlign: 'middle'
          }
    });