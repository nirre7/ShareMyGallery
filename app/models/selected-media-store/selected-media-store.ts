import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SelectedMediaModel } from "./media"

/**
 * Handles selected media
 */
export const SelectedMediaStoreModel = types
  .model("SelectedMediaStore")
  .props({
    selectedMedia: types.map(SelectedMediaModel),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    add(uri, filename, width, height, type) {
      const isSelected = self.selectedMedia.has(uri) ? !self.selectedMedia.get(uri).selected : true

      self.selectedMedia.set(uri, {
        selected: isSelected,
        width: width,
        height: height,
        filename: filename,
        type: type,
        uri: uri,
      })
    },
    isSelected(uri) {
      if (!self.selectedMedia.has(uri)) {
        return false
      }

      return self.selectedMedia.get(uri).selected
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type SelectedMediaStoreType = Instance<typeof SelectedMediaStoreModel>

export interface SelectedMediaStore extends SelectedMediaStoreType {
}

type SelectedMediaStoreSnapshotType = SnapshotOut<typeof SelectedMediaStoreModel>

export interface SelectedMediaStoreSnapshot extends SelectedMediaStoreSnapshotType {
}
