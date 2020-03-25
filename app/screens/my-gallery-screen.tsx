import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"
import { Media } from "../components"

export interface MyGalleryScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const MyGalleryScreen: React.FunctionComponent<MyGalleryScreenProps> = observer((props) => {
  const [media, setMedia] = useState<PhotoIdentifier[]>([])
  const [selectedMedia, setSelectedMedia] = useState(new Map<string, boolean>())
  const onSelect = useCallback(id => {
    const newSelected = new Map(selectedMedia)
    newSelected.set(id, !selectedMedia.get(id))
    setSelectedMedia(newSelected)

    console.tron.log(selectedMedia)
  }, [selectedMedia])

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: "All",
      groupTypes: "All",
      groupName: "Camera",
    })
      .then((media) => {
        setMedia(media.edges)
        console.tron.debug(`Fetched ${media.edges.length} photos`)
        // console.tron.debug(media.edges)
      })
  }, [])

  return (
    <View>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={item => item.node.image.uri}
        renderItem={({ item }) => (
          <Media
            item={item}
            onSelect={onSelect}
            selected={!!selectedMedia.get(item.node.image.uri)}
          />)}
        extraData={selectedMedia}
      />
    </View>
  )
})
