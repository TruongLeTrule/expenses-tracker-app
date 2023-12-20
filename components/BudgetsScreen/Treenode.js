import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useState,useContext } from 'react';
import Collapsible from 'react-native-collapsible';
import { BudgetContext } from "./BudgetContext";
export default TreeNode = ({ content, type, onPress, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const {budgetCategory, setBudgetCategory} = useContext(BudgetContext);
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.item}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          <View>{children}</View>
        </Collapsible>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    icon: {
      marginRight: 5,
    },
    type: {
      fontSize: 24,
    },
    content: {
      fontSize: 18,
    },
  });
  