import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Colors from "../constants/color";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: deviceWidth < 380 ? 8 : 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 10,
    backgroundColor: Colors.primary800,
    // for shadow in react native we can't use boxShadow
    // for android
    elevation: 4,
    // for ios we use shadowColor, shadowOffset, shadowOpacity, shadowRadius
    shadowColor: "#000",
    // it accepts an object which controls how much shadow must be offset from the orignal object to the left and right
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // it controls how much the shadow expands
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;
