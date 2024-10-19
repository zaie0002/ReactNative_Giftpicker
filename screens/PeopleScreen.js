import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, FlatList, View, Text, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext);

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
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
            renderItem={({ item }) => (
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View style={styles.itemContainer}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.dobText}>{item.dob}</Text>
                </View>
              </Swipeable>
            )}
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
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dobText: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: "#ADD8E6",
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
