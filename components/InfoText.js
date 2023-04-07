import React from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../constants/color";

const InfoText = ({ children, style }) => {
  // here i have also accepted a style prop which can be used if we want to add more styles where the component is used. we can then pass it as an array to styles
  return <Text style={[styles.infoText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  infoText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default InfoText;
