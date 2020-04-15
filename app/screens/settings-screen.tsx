import * as React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
// import { useStores } from "../models/root-store"
import { Header } from "react-native-elements"
import { translate } from "../i18n"

export interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <View>
      <Header
        leftComponent={{ icon: "arrow-back", color: "#fff", onPress: props.navigation.goBack }}
        centerComponent={{ text: translate("settings.header"), style: { color: "#fff" } }}
      />
    </View>
  )
})
