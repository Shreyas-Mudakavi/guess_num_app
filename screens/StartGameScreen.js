import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/color";
import Title from "../components/Title";
import Card from "../components/Card";
import InfoText from "../components/InfoText";

const StartGameScreen = ({ onConfirmNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const numberInputChangeHandler = (number) => {
    setEnteredNumber(number);
  };

  const resetHandler = () => {
    setEnteredNumber("");
  };

  const confirmHandler = () => {
    const chooseNumber = parseInt(enteredNumber);

    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      //   react native gives us an Alert api. Not a component but object which holds an alert
      // method and a prompt method

      // here the alert method accepts various AppRegistry. first is
      // the title, second is the msg, third will allow us to
      // configure the buttons. to add them we use array and we can
      //   add multiple buttons. to define it we use object to this array.
      // in this object every button has a text which the caption of that button
      //   and it has a style. lastly it has an onPress props which
      //   allows you to point at a function to be executed when
      //   that button is clicked
      Alert.alert("Invalid number!", "The number has to be between 1 and 99", [
        {
          text: "Okay",
          style: "destructive",
          onPress: resetHandler,
        },
      ]);
      return;
    }

    onConfirmNumber(chooseNumber);
  };

  const marginTop = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Title>Guess my number</Title>
          <Card>
            {/* maxLength prop takes maximum number of characters that 
      can be entered in this input */}
            {/* keyboardType prop controls which type of keyboardType 
      we want to open */}
            <InfoText>Enter a number</InfoText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputChangeHandler}
              value={enteredNumber}
            />
            <View style={styles.primaryButton}>
              <View style={styles.singleButton}>
                <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.singleButton}>
                <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: ma,
    alignItems: "center",
  },

  primaryButton: {
    flexDirection: "row",
  },

  singleButton: {
    flex: 1,
  },

  numberInput: {
    height: 50,
    width: 60,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 10,
    fontWeight: "bold",
    marginVertical: 18,
  },
});

export default StartGameScreen;
