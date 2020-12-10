import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import AboutUsScreen from "../screens/AboutUsScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default class InfoModals extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.visibleModal === 2}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <AboutUsScreen onCancel={this.props.closeModal}></AboutUsScreen>
            </View>
          }
        </Modal>
        <Modal
          isVisible={this.props.visibleModal === 4}
          style={styles.bottomModal}
          avoidKeyboard={false}
        >
          {
            <View style={styles.modal}>
              <SettingsScreen onCancel={this.props.closeModal}></SettingsScreen>
            </View>
          }
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
  },
  modal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
