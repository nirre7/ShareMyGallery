import * as React from "react"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { shareButtonStyles as styles } from "./share-button.styles"
import { Button } from "react-native-elements"
import Share from "react-native-share"
import { translate } from "../../i18n"
import ImageResizer from 'react-native-image-resizer'
import { PhotoIdentifier } from "@react-native-community/cameraroll"

export interface ShareButtonProps {
  selectedMedia: Map<string, [boolean, PhotoIdentifier]>
}

export const ShareButton: React.FunctionComponent<ShareButtonProps> = props => {
  const { selectedMedia } = props

  const openShare = () => {
    const urls = []
    const promises = []
    selectedMedia.forEach((value, key, map) => {
      if (value[0]) {
        const photoIdentifier = value[1]

        promises.push(ImageResizer.createResizedImage(photoIdentifier.node.image.uri, photoIdentifier.node.image.width, photoIdentifier.node.image.height, 'JPEG', 70)
          .then(resp => {
            urls.push(resp.uri)
            __DEV__ && console.tron.debug(resp)
          })
        )
      }
    })

    Promise.all(promises).then(results => {
      Share.open({
        title: translate("shareButton.shareMultipleImages"),
        failOnCancel: false,
        urls: urls,
        social: Share.Social.EMAIL,
      }).catch((error) => __DEV__ && console.tron.warn(error))
    })
  }

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <Button
        onPress={openShare}
        title={translate("shareButton.share")}
      />
    </View>
  ))
}
