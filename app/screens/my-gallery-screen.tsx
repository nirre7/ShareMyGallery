import * as React from "react"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, ImageStyle, View } from "react-native"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"

export interface MyGalleryScreenProps {
  navigation: NavigationScreenProp<{}>
}

const PHOTO: ImageStyle = {
  width: "33%",
  height: 150,
}

export const MyGalleryScreen: React.FunctionComponent<MyGalleryScreenProps> = observer((props) => {
  const [media, setMedia] = useState<PhotoIdentifier[]>([])

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 25,
      assetType: "All",
      groupTypes: "All",
    })
      .then((media) => {
        setMedia(media.edges)
        console.tron.debug(`Fetched ${media.edges.length} photos`)
      })
  }, [])

  return (
    <View>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={(item, index) => item.node.image.uri}
        renderItem={({ item }: { item: PhotoIdentifier }) =>
          <Image style={PHOTO} source={{ uri: item.node.image.uri }}/>
        }
      />
    </View>
  )
})
