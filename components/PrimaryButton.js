import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/color";

// to pass more than one styles object we can use array like this [styles.container, styles.pressableContainer]
const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.pressableContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
        style={({ pressed }) =>
          pressed ? [styles.container, styles.pressed] : styles.container
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  container: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
