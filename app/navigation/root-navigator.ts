import { createStackNavigator } from "react-navigation-stack"
// prettier-ignore
import { MyGalleryScreen } from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    myGalleryScreen: { screen: MyGalleryScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
