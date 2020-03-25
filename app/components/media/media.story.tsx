import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Media } from "./media"
import { PhotoIdentifier } from "@react-native-community/cameraroll"

declare let module

storiesOf("Media", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Media
          selected={true}
          item={{} as PhotoIdentifier}
          onSelect={() => console.log('yada')}/>
      </UseCase>
    </Story>
  ))
