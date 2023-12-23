import { View, Text, Pressable, TouchableOpacity,StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import useStore from "../../data/useStore";
import { icons, titles, expenseCategories } from "../template";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default CategoryScreen = ({onPress, filter}) => {

const categoryModalVisible = useStore((state) => state.categoryModalVisible);
const budgetCategory = useStore((state) => state.budgetCategory);
  const [renderCategories, setRenderCategories] = useState([]);
    useEffect(() => {
          setRenderCategories(
            filter ? ["all", ...expenseCategories] : expenseCategories
          );
      }, [categoryModalVisible]);
    return (
        <View className="bg-[#d1d1d1] rounded-t-xl h-full">
        {/* Heading section */}
        <View className="bg-[#fff] rounded-t-xl flex-row justify-between items-center p-5">
          <Pressable onPress={() => onPress(budgetCategory)}>
            <Ionicons name="chevron-down" size={35} color={"#4cb050"} />
          </Pressable>
          <Text className="text-2xl font-bold">Select Category</Text>
          <Text></Text>
        </View>

        {/* Body */}
        <View className="pb-28">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={renderCategories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="px-6">
                <TouchableOpacity
                  className="flex-row items-center mt-6 bg-[#fff] py-4 px-7 rounded-xl"
                  onPress={() => onPress(item)}
                >
                  <View className="flex-row items-center gap-6">
                    <View className="rounded-full h-14 w-14 flex items-center justify-center bg-light-green">
                      <Ionicons name={icons[item]} size={34} />
                    </View>
                    <Text className="text-2xl font-bold">{titles[item]}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
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