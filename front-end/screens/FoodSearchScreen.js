import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { TextInput } from 'react-native-paper';
import { ListItem } from 'react-native-elements';


import send from "../requests/request.js";
import endpoints from "../requests/endpoints.js";

export default class FoodSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      items: [], 
      itemsFiltered: [],
      show: true
    }
  }

  componentDidMount() {
      send("getFoodLibrary")
      .then(response => response.json())
      .then((json) => {
          this.setState({ items: json });
      })
      .catch(error => {
        console.log("Error getting food library");
        console.log(error);
      })
  }

  // Filter list items based on 
  searchItem(textToSearch) {
    this.setState({
      itemsFiltered: this.state.items.filter(i => i.name.toLowerCase().includes(textToSearch.toLowerCase())),
      search: textToSearch
    });

  }

  getSearch = () => {
    alert(this.state.search);
  }

  onSelectItem = (item) => {
      // TODO: Needs to be implemented in Parent
      const { setSelectedItem } = this.props;
      setSearchItem(item);

  }

  populateList = (i) => {
    if (this.state.show) {
      return this.state.itemsFiltered.map((item, i) => 
              (
                <ListItem 
                key={i} 
                pad={20} 
                bottomDivider 
                Component={TouchableHighlight}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => this.onSelectItem(item)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.shelf_life}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
              );
    } else {
      return <Text>"Empty"</Text>;
    }
  }

  focus = () => {
    this.setState(
      { show: true}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
        placeholder="Search Common Foods" 
        onChangeText={text => {this.searchItem(text)}} />
          
            {this.populateList()}
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: "#FFFFFF",
    margin: 100
  }
});