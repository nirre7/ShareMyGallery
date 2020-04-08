import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ShareButton } from "./share-button"

declare let module

const map = new Map()

storiesOf("ShareButton", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ShareButton selectedMedia={map} />
      </UseCase>
    </Story>
  ))
