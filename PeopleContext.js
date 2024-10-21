import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const STORAGE_KEY = "people";

  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPeople) {
        const parsedPeople = JSON.parse(savedPeople);
        parsedPeople.sort((a, b) => new Date(a.dob) - new Date(b.dob));
        setPeople(parsedPeople);
      }
    };
    loadPeople();
  }, []);

  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    
    const updatedPeople = [...people, newPerson];
    updatedPeople.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const deletePerson = async (id) => {
    const updatedPeople = people.filter(p => p.id !== id)
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  }

  const addIdea = async (personId, idea) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        const updatedIdeas = person.ideas ? [...person.ideas, idea] : [idea];
        return { ...person, ideas: updatedIdeas };
      }
      return person;
    });

    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const getIdeasForPerson = async (personId) => {
    const savedPeople = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    const person = savedPeople.find((p) => p.id === personId);
    return person ? person.ideas : [];
  };

  const deleteIdea = async (ideaId, personId) => {
    try {
      const ideas = await getIdeasForPerson(personId);
      const updatedIdeas = ideas.filter((idea) => idea.id !== ideaId);
      const updatedPeople = people.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            ideas: updatedIdeas,
          };
        }
        return person;
      });
    setPeople(updatedPeople);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <PeopleContext.Provider value={{ people, addPerson, deletePerson, addIdea, deleteIdea }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;