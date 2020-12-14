import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const TextSemiBold = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold: require("../fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text style={[{ fontFamily: "Montserrat_600SemiBold" }, props.style]}>
        {props.text}
      </Text>
    );
  }
};

export default TextSemiBold;
