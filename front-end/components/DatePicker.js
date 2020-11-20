import React, {useState} from 'react';
import {View, Button, Platform, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker(props) {
  const [date, setDate] = useState(props.default || new Date());
  const [show, setShow] = useState(Platform.OS === 'ios');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const {setParentExpiry} = props;
    setParentExpiry(currentDate)
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        { Platform.OS === 'android' && 
        (<TouchableOpacity style={{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10}}
          onPress={showDatepicker}>
          <Text>{date.toDateString()}</Text>
          </TouchableOpacity> ) }
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {Platform.OS === 'ios' && (<Text>{date.toString()}</Text>)} 
      {//TODO: Remove after styling
      }
    </View>
  );
};