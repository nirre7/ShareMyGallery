import { SelectedMediaStoreModel, SelectedMediaStore } from "./selected-media-store"

test("can be created", () => {
  const instance: SelectedMediaStore = SelectedMediaStoreModel.create({})

  expect(instance).toBeTruthy()
})