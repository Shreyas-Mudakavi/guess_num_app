import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/color";

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.roundLogContainer}>
      <Text style={styles.item}>#{roundNumber}</Text>
      <Text style={styles.item}>Opponent's guess: {guess}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roundLogContainer: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  item: {
    fontFamily: "open-sans",
  },
});

export default GuessLogItem;
