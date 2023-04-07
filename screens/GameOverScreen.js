import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import Title from "../components/Title";
import Colors from "../constants/color";
import PrimaryButton from "../components/PrimaryButton";

const GameOverScreen = ({ onStartNewGame, userNumber, roundsNumber }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game Over!</Title>

        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.hightLightText}>{roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.hightLightText}>{userNumber}</Text>.
          </Text>
        </View>

        <PrimaryButton onPress={onStartNewGame}>Start a new game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  summaryContainer: {
    marginBottom: 24,
  },

  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
  },

  hightLightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary700,
  },
});

export default GameOverScreen;
