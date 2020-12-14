import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const TextMedium = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium: require("../fonts/Montserrat-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text style={[{ fontFamily: "Montserrat_500Medium" }, props.style]}>
        {props.text}
      </Text>
    );
  }
};

export default TextMedium;
