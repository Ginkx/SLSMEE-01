import *as React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import Feed from "../screens/Feed";
const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={"#923C01"}
              style={styles.icons}
            />
          );
        }
      })}
    
    >
      <Tab.Screen name="Feed" component={Feed} />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "white",
    height: "12%",
    borderTopLeftRadius: 700,
    borderTopRightRadius:700,
    borderBottomEndRadius:700,
    borderBottomRightRadius:700,
    borderBottomLeftRadius:700,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

export default BottomTabNavigator;
