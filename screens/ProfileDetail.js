import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import useStore from "../data/useStore";

export default function ProfileDetail({ navigation }) {
  const userInfo = useStore((state) => state.userInfo);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          {userInfo && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text
                style={{
                  marginRight: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#4cb050",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [userInfo]);

  return (
    <View style={styles.info}>
      {userInfo ? (
        <View>
          <View style={styles.section}>
            <Text style={styles.bold}>Name:</Text>
            <Text style={styles.userInfo}>{userInfo?.fullName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Username:</Text>
            <Text style={styles.userInfo}>{userInfo?.username}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Phone:</Text>
            <Text style={styles.userInfo}>{userInfo?.phone}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Address:</Text>
            <Text style={styles.userInfo}>{userInfo?.address}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Add personal info
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 15,
    flexDirection: "row",
  },
  bold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    fontSize: 20,
    marginLeft: 7,
  },
  editProfileButton: {
    marginTop: 40,
    backgroundColor: "#4cb050",
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
  },
});
