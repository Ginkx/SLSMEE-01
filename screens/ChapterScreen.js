import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Button,
  Image
}
from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
  "Robotronika": require("../assets/fonts/Robtronika.ttf"),
 "MoonHouse": require("../assets/fonts/Moonhouse.ttf")
};

export default class ChapterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async initiateTTS(title, author, story, examples) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "green" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} Important Definitions Presented By  ${author}`);
      Speech.speak(story);
      Speech.speak("Thank You For Visiting Hope You Like It..");
      Speech.speak(examples);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
           <View style={styles.appTitle}>
           <Image
                source={require("../assets/instagramlogo.jpg")}
                style={styles.iconImage}
              ></Image>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Quick Revision</Text>
            </View>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.story.title,
                        this.props.route.params.story.author,
                        this.props.route.params.story.story,
                        this.props.route.params.story.examples
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {this.props.route.params.story.story}
                </Text>
                <Text style={styles.moralText}>
                  Examples - {this.props.route.params.story.examples}
                </Text>
              </View>
              <View style={styles.actionContainer}>
              
                <View style={styles.likeButton}>
                
                  <Ionicons name={"heart"} size={RFValue(17)} color={"pink"} />
                  <Text style={styles.likeText}>ThankYou</Text>
               
                </View>
                
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
 
  appTitle: {
    flex: 0.07,
    flexDirection: "row-reverse"
  },
  
  appTitleTextContainer: {
    flex: 1.15,
    justifyContent: "center"
  },
   droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  
  appTitleText: {
    color: "white",
    fontSize: RFValue(38),
    fontFamily: "MoonHouse"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "black",
    borderRadius: RFValue(20)
  },
  iconImage: {
    width: "100",
    height: "100",
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "coloumn",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Robotronika",
    fontSize: RFValue(25),
    color: "yellow"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "#FF6600"
  },
  
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "cyan"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "cyan"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "black",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    marginLeft: RFValue(5)
  }
});
