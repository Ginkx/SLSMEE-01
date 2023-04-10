import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  "Robotronika": require("../assets/fonts/Robtronika.ttf")
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("StoryScreen", {
              story: this.props.story
            })
          }
        >
          <View style={styles.cardContainer}>
             
            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {this.props.story.title}
              </Text>
              <Text style={styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
              <Text style={styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#E5DE00",
    borderRadius: RFValue(18),
     width: '90%',
    alignSelf: 'center',
    height: 115,
    textAlign: 'center',
    borderWidth: 4,
  },
 
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
     width: '80%',
    alignSelf: 'center',
    
  },
  storyTitleText: {
    fontSize: RFValue(17),
    fontFamily: "Robotronika",
    color: "black"
  },
  storyAuthorText: {
    fontSize: RFValue(19),
    fontFamily: "Bubblegum-Sans",
    color: "black"   
    
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 15,
    color: "red",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  }
 
});
