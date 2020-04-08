import * as React from "react"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { Platform } from "react-native"

export interface PermissionsProps {}

export const Permissions: React.FunctionComponent<PermissionsProps> = props => {
  if (Platform.OS === "android") {
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
  }

  return null
}
