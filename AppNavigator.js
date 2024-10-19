import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="People">
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
        <Stack.Screen name="Idea" component={IdeaScreen} />
        <Stack.Screen name="AddIdea" component={AddIdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
