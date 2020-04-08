import * as React from "react"
import { Image, TouchableWithoutFeedback } from "react-native"
import { useObserver } from "mobx-react-lite"
import { mediaStyles as styles } from "./media.styles"
import { PhotoIdentifier } from "@react-native-community/cameraroll"

export interface MediaProps {
  onSelect: Function
  item: PhotoIdentifier
  selected: boolean
}

export const Media: React.FunctionComponent<MediaProps> = props => {

  const { onSelect, item, selected } = props

  return useObserver(() => (
    <TouchableWithoutFeedback
      onPress={() => onSelect(item.node.image.uri)}>

      <Image
        style={[styles.PHOTO, { opacity: selected ? 0.5 : 1 }]}
        source={{ uri: item.node.image.uri }}
      />
    </TouchableWithoutFeedback>
  ))
}
