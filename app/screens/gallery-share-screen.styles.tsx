import { ViewStyle } from "react-native"
import { color } from "../theme"

export const galleryShareStyles = {
  WRAPPER: {
    flex: 1,
    backgroundColor: color.background,
    overflow: "hidden",
  } as ViewStyle,
  HEADER: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  } as ViewStyle,
  HEADER_WRAPPER: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
  } as ViewStyle,
  BUTTON: {
    backgroundColor: color.button,
  } as ViewStyle,
}
