import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

const TextRegular = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular: require("../fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text
        style={[{ fontFamily: "Montserrat_400Regular" }, props.style]}
        numberOfLines={props.numberOfLines}
      >
        {props.text}
      </Text>
    );
  }
};

export default TextRegular;
