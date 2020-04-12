import * as React from "react"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { shareButtonStyles as styles } from "./share-button.styles"
import { Button } from "react-native-elements"
import Share from "react-native-share"
import { translate } from "../../i18n"
import ImageResizer from "react-native-image-resizer"
import { SelectedMediaStore } from "../../models/selected-media-store"
import { useStores } from "../../models/root-store"

export interface ShareButtonProps {
}

export const ShareButton: React.FunctionComponent<ShareButtonProps> = props => {
  const { selectedMediaStore }: { selectedMediaStore: SelectedMediaStore; } = useStores()
  const { selectedMedia } = selectedMediaStore

  const openShare = () => {
    const urls = []
    const promises = []
    selectedMedia.forEach((value, key, map) => {
      if (value.selected) {
        promises.push(ImageResizer.createResizedImage(value.uri, value.width, value.height, 'JPEG', 70)
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
        buttonStyle={styles.BUTTON}
        onPress={openShare}
        raised
        title={translate("shareButton.share")}
      />
    </View>
  ))
}
