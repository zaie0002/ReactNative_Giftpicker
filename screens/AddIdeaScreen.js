import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, KeyboardAvoidingView, TextInput, Platform, Keyboard, TouchableWithoutFeedback, } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";
import { randomUUID } from "expo-crypto";

export default function AddIdeaScreen() {
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [text, setText] = useState("");
  const { saveIdeas } = useContext(PeopleContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { personId } = route.params;

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Please, allow camera permissions!</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={setHasPermission}
        >
          <Text style={styles.permissionText}>Allow Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleSave = async () => {
    if (text && photo) {
      const idea = {
        id: randomUUID(),
        text,
        img: photo,
        width: 500,
        height: 500,
      };

      await saveIdeas(personId, idea);
      navigation.navigate("Idea", { personId, newIdea: idea });
    } else {
      Alert.alert("Your Idea or photo is missing. Please, add both to continue!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!photo ? (
            <CameraView
              style={styles.camera}
              facing={facing}
              ref={(ref) => setCameraRef(ref)}
            >
              <View style={styles.cameraContainer}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.cameraText}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.takePictureButton}
                  onPress={takePicture}
                >
                  <Text style={styles.cameraText}>Take Picture</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo }} style={styles.imagePreview} />
              <TextInput
                style={styles.input}
                placeholder="Enter your idea"
                value={text}
                onChangeText={setText}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => setPhoto(null)}
                >
                  <Text style={styles.retakeText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => navigation.navigate("Idea", { personId })}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
  },
  permissionButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  permissionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flipButton: {
    backgroundColor: "#4682B4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  takePictureButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cameraText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  retakeButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retakeText: {
    color: "black",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
});