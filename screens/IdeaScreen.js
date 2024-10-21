import React, { useContext, useState } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Image, StyleSheet, Button, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { personId } = route.params || {};
  const { people, deleteIdea } = useContext(PeopleContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const person = people.find((person) => person.id === personId);

  const handleDeleteIdea = async () => {
    if (selectedIdea) {
      await deleteIdea(selectedIdea.id, personId);
      setModalVisible(false);
      setSelectedIdea(null);
    }
  };

  const renderIdeaItem = ({ item }) => (
    <View style={styles.ideaContainer}>
      <Image source={{ uri: item.img }} style={styles.thumbnail} />
      <Text style={styles.ideaText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setSelectedIdea(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>What you can gift for {person?.name}</Text>

        {person?.ideas?.length === 0 ? (
          <Text style={styles.emptyMessage}>You have no saved Ideas. Let's add the first one!</Text>
        ) : (
          <FlatList
            data={person.ideas}
            keyExtractor={(item) => item.id}
            renderItem={renderIdeaItem}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddIdea", { personId })}
        >
        <Text style={styles.fabText}>Add Idea</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this idea?
              </Text>
              <Button title="Yes" onPress={handleDeleteIdea} />
              <Button
                title="No"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdfd96", // Yellow background
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  emptyMessage: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  ideaContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ideaText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  fab: {
    backgroundColor: "#ADD8E6",
    width: 120,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});