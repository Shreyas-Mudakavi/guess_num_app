import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InfoText from "../components/InfoText";
import GuessLogItem from "../components/GuessLogItem";

// it is used to generate Random numbers between the given boundary.
// the exclude prop is used so that it should not guess the user's number immediately
const generateRandomNumber = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [loggedRounds, setLoggedRounds] = useState([initialGuess]);

  //   to use dimensions api in a more responsive way we can use
  //   useWindowDimensions hook from react-NativeAppEventEmitter.
  //   unLike the Dimensions api it always updates
  //   whenever orientation chages or width, height. we can destructure it
  //   which gives us width and height then we can use it for responsive
  //   layout
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(loggedRounds?.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  //   we also need to reset the min and max boundary whenever the
  // gamescreen is rendered first time
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessNumber = (direction) => {
    // direction is lower or higher (string)

    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont' lie", "You know that this is wrong...", [
        { text: "Okay", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNum);
    setLoggedRounds((currentLoggedRounds) => [
      ...currentLoggedRounds,
      newRndNum,
    ]);
  };

  const guessRoundLength = loggedRounds?.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InfoText style={styles.infoText}>Higher or lower?</InfoText>
        <View style={styles.guessButtons}>
          <View style={styles.guessButton}>
            <PrimaryButton onPress={() => nextGuessNumber("higher")}>
              <AntDesign name="plus" size={24} color="#fff" />
            </PrimaryButton>
          </View>
          <View style={styles.guessButton}>
            <PrimaryButton onPress={() => nextGuessNumber("lower")}>
              <AntDesign name="minus" size={24} color="#fff" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  //   based on width from useWindowDimensions(). this is for
  // orientation change
  if (width > 500) {
    // landsacpe

    content = (
      <>
        <View style={styles.guessButtonsWide}>
          <View style={styles.guessButton}>
            <PrimaryButton onPress={() => nextGuessNumber("higher")}>
              <AntDesign name="plus" size={24} color="#fff" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>

          <View style={styles.guessButton}>
            <PrimaryButton onPress={() => nextGuessNumber("lower")}>
              <AntDesign name="minus" size={24} color="#fff" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.flatList}>
        <FlatList
          data={loggedRounds}
          renderItem={(data) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundLength - data.index}
                guess={data.item}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },

  infoText: {
    marginBottom: 12,
  },

  guessButtons: {
    flexDirection: "row",
  },

  guessButton: {
    flex: 1,
  },
  flatList: {
    // marginVertical: 12,
    flex: 1,
    padding: 16,
  },

  guessButtonsWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GameScreen;
