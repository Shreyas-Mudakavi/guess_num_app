import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// The SplashScreen is
// used to tell the splash screen to remain visible until it has
// been explicitly told to hide. This is useful to do tasks that
// will happen behind the scenes such as making API calls,
// pre-loading fonts, animating the splash screen and so on.

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/color";
import GameOverScreen from "./screens/GameOverScreen";

// this prevents SplashScreen from auto hiding while the fonts are loaded
SplashScreen.preventAutoHideAsync();

// View only takes that much space as they need to fit their content
export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [roundsNumber, setRoundsNumber] = useState(0);

  // useFonts hook returns an array where the first element is fontsLoaded which
  // is a boolean that tells us whether the fonts are loaded or not
  // in useFonts we pass the instructions about which font should be loaded as an object
  // you can read docs
  // then to use these fonts we can simply write the prop
  // name i.e. 'open-sans' in the StyleSheet object by
  // using fontFamily: 'open-sans'
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // after the fonts are loaded we can hide the SplashScreen
  // and show the app screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setRoundsNumber(numberOfRounds);
  };

  const onStartNewGameHandler = () => {
    setUserNumber(null);
    setRoundsNumber(0);
    setGameIsOver(false);
  };

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={roundsNumber}
        userNumber={userNumber}
        onStartNewGame={onStartNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      {/* // LinearGradient takes a colors prop. It takes an array which takes
    // all the colors you want to use in your gradient

    // the onLayout prop is fired once the layout has been calculated. Also available in View */}
      <LinearGradient
        onLayout={onLayoutRootView}
        style={styles.rootScreen}
        colors={[Colors.primary700, Colors.accent500]}
      >
        {/* we can add a background image with ImageBackground component provided by
      react-native. it has the following props shown below, you can read more in
      docs. here the style prop is applied to the container and imageStyle prop is 
      applied to the image itself */}
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          {/* SafeAreaView component from react-native ensures that it will
        automatically detect on which device your app is running and add an
        appropriate amount of space between the notch and our content. */}
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});
