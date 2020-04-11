import * as React from "react"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView, ViewStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Hermes, Media, Permissions, ShareButton } from "../components"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"
import { SelectedMediaStore } from "../models/selected-media-store"
import { useStores } from "../models/root-store"
import { getSnapshot } from "mobx-state-tree"

export interface GalleryShareScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const WRAPPER: ViewStyle = {
  flex: 1,
}

export const GalleryShareScreen: React.FunctionComponent<GalleryShareScreenProps> = observer((props) => {
  const [media, setMedia] = useState<PhotoIdentifier[]>([])
  const { selectedMediaStore }: { selectedMediaStore: SelectedMediaStore; } = useStores()

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 2000,
      assetType: "Photos",
      groupTypes: "All",
      groupName: "Camera",
    })
      .then((media) => {
        setMedia(media.edges)
        __DEV__ && console.tron.debug(`Fetched ${media.edges.length} photos`)
      })
  }, [])

  return (
    <SafeAreaView style={WRAPPER}>
      <Permissions/>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={item => item.node.image.uri}
        renderItem={({ item }) => (
          <Media item={item}/>
        )}
        extraData={getSnapshot(selectedMediaStore.selectedMedia)}
      />
      <Hermes/>
      <ShareButton/>
    </SafeAreaView>
  )
})
