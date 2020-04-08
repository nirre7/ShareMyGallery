import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Media, Permissions, ShareButton } from "../components"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"

export interface GalleryShareScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const GalleryShareScreen: React.FunctionComponent<GalleryShareScreenProps> = observer((props) => {

  const [media, setMedia] = useState<PhotoIdentifier[]>([])
  const [selectedMedia, setSelectedMedia] = useState(new Map<string, boolean>())
  const onSelect = useCallback(id => {
    const newSelected = new Map(selectedMedia)
    newSelected.set(id, !selectedMedia.get(id))
    setSelectedMedia(newSelected)
  }, [selectedMedia])

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: "All",
      groupTypes: "All",
      // groupName: "Camera",
    })
      .then((media) => {
        setMedia(media.edges)
        console.tron.debug(`Fetched ${media.edges.length} photos`)
      })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Permissions/>
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
      <ShareButton selectedMedia={selectedMedia}/>
    </SafeAreaView>
  )
})
