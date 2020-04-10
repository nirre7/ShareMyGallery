import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Hermes, Media, Permissions, ShareButton } from "../components"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"

export interface GalleryShareScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const GalleryShareScreen: React.FunctionComponent<GalleryShareScreenProps> = observer((props) => {

  const [media, setMedia] = useState<PhotoIdentifier[]>([])
  const [selectedMedia, setSelectedMedia] = useState(new Map<string, [boolean, PhotoIdentifier]>())
  const onSelect = useCallback((photoIdentifier: PhotoIdentifier) => {
    const newSelected = new Map(selectedMedia)
    const uri = photoIdentifier.node.image.uri
    newSelected.set(uri, [selectedMedia.has(uri) ? !selectedMedia.get(uri)[0] : true, photoIdentifier])
    setSelectedMedia(newSelected)
    console.tron.debug(newSelected)
  }, [selectedMedia])

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 2000,
      assetType: "Photos",
      groupTypes: "All",
      groupName: "Camera",
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
            selected={selectedMedia.has(item.node.image.uri) ? !!selectedMedia.get(item.node.image.uri)[0] : false}
          />)}
        extraData={selectedMedia}
      />
      <Hermes/>
      <ShareButton selectedMedia={selectedMedia}/>
    </SafeAreaView>
  )
})
