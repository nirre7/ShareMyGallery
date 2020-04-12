import { ViewStyle } from "react-native"
import { color } from "../../theme"

export const shareButtonStyles = {
  WRAPPER: {
    flex: 1,
    width: 350,
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 20
  } as ViewStyle,

  BUTTON: {
    backgroundColor: color.button
  } as ViewStyle,

}
