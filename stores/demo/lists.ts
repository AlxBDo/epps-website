import { defineEppsStore, extendedState, getParentStoreMethod, useCollectionStore, type CollectionState, type CollectionStoreMethods, type EppsStore } from "epps"

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
            const stores = parentsStores && parentsStores()
            const collectionStore = Array.isArray(stores) && stores[0] as EppsStore<CollectionStoreMethods, CollectionState<List>>

            if (!collectionStore) { return }

            // TODO delete third parameter after epps update > 0.8.1
            getParentStoreMethod('addItem', collectionStore, parentsStores && parentsStores())({
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