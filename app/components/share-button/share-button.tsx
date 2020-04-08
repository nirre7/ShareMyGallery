import * as React from "react"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { shareButtonStyles as styles } from "./share-button.styles"
import { Button } from "react-native-elements"
import Share from "react-native-share"
import { translate } from "../../i18n"

export interface ShareButtonProps {
  selectedMedia: Map<string, boolean>
}

export const ShareButton: React.FunctionComponent<ShareButtonProps> = props => {
  const { selectedMedia } = props

  const openShare = () => {
    console.tron.debug([...selectedMedia.keys()])

    Share.open({
      title: translate("shareButton.shareMultipleImages"),
      failOnCancel: false,
      urls: [...selectedMedia.keys()],
      social: Share.Social.EMAIL,
    }).catch((error) => console.tron.warn(error))
  }

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <Button
        onPress={openShare}
        disabled={[...selectedMedia.keys()].length === 0}
        title={translate("shareButton.share")}
      />
    </View>
  ))
}