import { defineEppsStore, extendedState, getParentStore, getParentStoreMethod, useCollectionStore, type CollectionState, type CollectionStoreMethods, type EppsStore } from "epps"

import type { ListTypes } from "~/types/list"


const defaultStoreId: string = 'lists'

export interface List {
    id?: number
    name: string
    items: string[]
    type: string
}


export interface ListsStoreMethods extends CollectionStoreMethods {
    newList: (name: string, type: string) => void
}

export const useListsStore = (
    id?: string
) => defineEppsStore<ListsStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId,
    () => {
        const { parentsStores, persist, watchMutation } = extendedState(
            [useCollectionStore('listsCollection')],
            { persist: { watchMutation: ref(true) } }
        )

        function newList(name: string, type: ListTypes): void {
            const collectionStore = getParentStore<CollectionStoreMethods, CollectionState<List>>(0, parentsStores)

            if (!collectionStore) { return }

            collectionStore.addItem({
                id: collectionStore.items.length + 1,
                name,
                type
            })
        }

        return {
            newList,
            parentsStores,
            persist,
            watchMutation
        }
    }
)()