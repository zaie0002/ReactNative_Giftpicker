import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, View, Text, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext);

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.personInfo}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.dobText}>{item.dob}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Idea", { personId: item.id })}
          style={styles.addIdeaButton}
        >
          <Text style={styles.addIdeaText}>Add Idea</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  const renderRightActions = (id) => (
    <View style={styles.rightActionsContainer}>
      <TouchableOpacity
        onPress={() => deletePerson(id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {people.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Please add your first person!</Text>
          </View>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
        
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddPerson")}>
          <Text style={styles.fabText}>Add Person</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // Set background to white
  },
  listContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#e6f0ff", // Light blue background for list items
    borderRadius: 10,
    elevation: 3, // Slight elevation for depth
  },
  personInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Darker text for contrast
  },
  dobText: {
    fontSize: 14,
    color: "#666", // Lighter gray for secondary text
  },
  addIdeaButton: {
    backgroundColor: "#ADD8E6", // Light blue for the button
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  addIdeaText: {
    color: "#000", // Black text for visibility
    fontWeight: "bold",
  },
  rightActionsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 50,
    borderRadius: 25,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: "#ADD8E6", // Light blue FAB
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 5,
  },
  fabText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: 'center',
  },
});