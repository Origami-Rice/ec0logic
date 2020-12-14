import React, { useState } from "react";
import { View, Platform, TouchableOpacity, Dimensions } from "react-native";
import TextRegular from "./TextRegular";
import { Colours } from "../constants/colours.js";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker(props) {
  const [date, setDate] = useState(props.defaultDate || new Date());
  const [show, setShow] = useState(Platform.OS === "ios");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const { setParentExpiry } = props;
    setParentExpiry(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        {Platform.OS === "android" && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: Colours.screenBackground,
              borderWidth: 1,
              borderColor: Colours.filledButton,
              padding: 10,
            }}
            onPress={showDatepicker}
          >
            <TextRegular
              style={{ color: Colours.filledButton }}
              text={date.toDateString()}
            ></TextRegular>
          </TouchableOpacity>
        )}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          style={{ width: Dimensions.get("window").width }}
        />
      )}
    </View>
  );
}
