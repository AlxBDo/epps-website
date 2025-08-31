import { defineEppsStore, Epps, ParentStore, useCollectionStore, type CollectionState, type CollectionStoreMethods } from "epps"

import type { ListTypes } from "~/types/list"


const defaultStoreId: string = 'lists'

export interface List {
    id?: number
    name: string
    items: string[]
    type: string
}

export interface ListsState {
    lists: List[]
}

export interface ListsStoreMethods extends CollectionStoreMethods {
    newList: (name: string, type: string) => void
}


const epps = new Epps({
    parentsStores: [new ParentStore<CollectionStoreMethods, CollectionState<List>>('listCollection', useCollectionStore)],
    persist: { watchMutation: true },
    propertiesToRename: { items: 'lists' }
})

export const useListsStore = (
    id?: string
) => defineEppsStore<ListsStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId,
    () => {
        function newList(name: string, type: ListTypes): void {
            const collectionStore = epps.getStore<CollectionStoreMethods, CollectionState<List>>(0, id ?? defaultStoreId)

            if (!collectionStore) { return }

            collectionStore.addItem({
                id: collectionStore.items.length + 1,
                name,
                type
            })
        }

        return {
            newList
        }
    },
    epps
)()