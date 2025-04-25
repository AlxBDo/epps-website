import { defineEppsStore, extendedState, useCollectionStore, type CollectionState, type CollectionStoreMethods } from "epps"

const defaultStoreId: string = 'lists'

export interface List {
    id?: number
    name: string
    items: string[]
    type: string
}

export const useListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId,
    () => ({
        ...extendedState(
            [useCollectionStore('listsCollection')],
            { persist: { watchMutation: ref(true) } }
        )
    })
)()