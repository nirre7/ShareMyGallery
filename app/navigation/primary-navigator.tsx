import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GalleryShareScreen, SettingsScreen } from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="galleryShareScreen" component={GalleryShareScreen} />
      <Stack.Screen name="settingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["galleryShareScreen"]
