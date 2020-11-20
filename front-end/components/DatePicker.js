import React, {useState} from 'react';
import {View, Button, Platform, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker(props) {
  const [date, setDate] = useState(props.default || new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(Platform.OS === 'ios');
  const [androidDis, setDisplay] = useState(Platform.OS === 'android');

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
        { androidDis && 
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
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>{date.toString()}</Text>
    </View>
  );
};