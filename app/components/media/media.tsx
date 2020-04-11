import * as React from "react"
import { Image, TouchableWithoutFeedback } from "react-native"
import { useObserver } from "mobx-react-lite"
import { mediaStyles as styles } from "./media.styles"
import { PhotoIdentifier } from "@react-native-community/cameraroll"
import { SelectedMediaStore } from "../../models/selected-media-store"
import { useStores } from "../../models/root-store"

export interface MediaProps {
  item: PhotoIdentifier
}

export const Media: React.FunctionComponent<MediaProps> = props => {
  const { selectedMediaStore }: { selectedMediaStore: SelectedMediaStore; } = useStores()
  const { item } = props
  const opacity = selectedMediaStore.isSelected(item.node.image.uri) ? 0.5 : 1
  const setSelected = () => {
    selectedMediaStore.add(
      item.node.image.uri,
      item.node.image.filename,
      item.node.image.width,
      item.node.image.height,
      item.node.type
    )
  }

  return useObserver(() => (
    <TouchableWithoutFeedback
      onPress={() => setSelected()}>

      <Image
        style={[styles.PHOTO, { opacity: opacity }]}
        source={{ uri: item.node.image.uri }}
      />
    </TouchableWithoutFeedback>
  ))
}
