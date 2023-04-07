import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/color";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

// here Platform is an inbuilt react-native api which is used to write
// platform specific code. now suppose you want to add border in adriod but not on
// ios the we can use Platform.OS. But if you want different values
// for both platforms we can use Platform.select({ios: , android: })

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 24,
    // fontWeight: "bold",
    color: Colors.white,
    // borderWidth: 2,

    // borderWidth: Platform.OS === 'android' ? 3 : 0,
    // other way of doing this
    borderWidth: Platform.select({ ios: 0, android: 3 }),
    borderColor: Colors.white,
    padding: 12,
    width: 300,
    maxWidth: "80%",
  },
});

export default Title;
