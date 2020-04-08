import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import CameraRoll, { PhotoIdentifier } from "@react-native-community/cameraroll"
import { Media, ShareButton } from "../components"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"

export interface MyGalleryScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const MyGalleryScreen: React.FunctionComponent<MyGalleryScreenProps> = observer((props) => {
  check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          )
          break
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {

          })
          console.log(
            'The permission has not been requested / is denied but requestable',
          )
          break
        case RESULTS.GRANTED:
          console.log('The permission is granted')
          break
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore')
          break
      }
    })
    .catch(error => {
      console.log(error)
    })
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
