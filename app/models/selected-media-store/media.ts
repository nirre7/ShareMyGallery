import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const SelectedMediaModel = types.model("SelectedMedia").props({
  selected: false,
  uri: types.identifier,
  filename: types.string,
  width: types.number,
  height: types.number,
  type: types.string,
})

type SelectedMediaType = Instance<typeof SelectedMediaModel>

export interface SelectedMedia extends SelectedMediaType {
}

type SelectedMediaSnapshotType = SnapshotOut<typeof SelectedMediaModel>

export interface SelectedMediaSnapshot extends SelectedMediaSnapshotType {
}
