import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
   "Candal": require("../assets/fonts/Candal.ttf"),
   "Robotronika": require("../assets/fonts/Robtronika.ttf"),
  "MoonHouse": require("../assets/fonts/Moonhouse.ttf")
};

let stories = require("./revision.json");

export default class Feed extends Component {
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

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
          </View>
          </View>
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}> 
          <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image source={require("../assets/instagramlogo.jpg")}
                style={styles.iconImage}></Image>
              </View>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Quick Revision</Text>
            </View>
         
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 0.07 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4EFEB9"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(70)
  },
  appTitle: {
    flex: 0.15,
    flexDirection: "column"
  },

   appIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "#",
    fontSize: 35,
    fontFamily: "MoonHouse",
    fontWeight:"bold "
  },
  cardContainer: {
    flex: 0.85
  }
});
