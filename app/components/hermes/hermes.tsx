import * as React from "react"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { Text } from "../"
import { hermesStyles as styles } from "./hermes.styles"

export interface HermesProps {
}

export const Hermes: React.FunctionComponent<HermesProps> = props => {
  const isHermes = () => global.HermesInternal != null

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <Text style={styles.TEXT}>
        Hermes {isHermes() ? "is enabled" : "is NOT enabled"}
      </Text>
    </View>
  ))
}
