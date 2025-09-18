import { defineEppsStore, getEppsStore, ParentStore, useCollectionStore, type CollectionState, type CollectionStoreMethods } from "epps"

import type { ListTypes } from "~/types/list"


const defaultStoreId: string = 'lists'

export interface List {
    id?: number
    name: string
    items?: string[]
    type: string
}

export interface ListsState {
    lists: List[]
}

export interface ListsStoreMethods extends CollectionStoreMethods {
    addList: (item: List) => void;
    getList: (criteria: Partial<List>) => List | undefined;
    getLists: (criteria?: Partial<List>, comparisonMode?: string) => List[];
    newList: (name: string, type: string) => void
    removeList: (criteria: Partial<List>) => void;
    setLists: (lists: List[]) => void
}


export const useListsStore = (
    id?: string
) => defineEppsStore<ListsStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId,
    () => {
        function newList(name: string, type: ListTypes): void {
            const collectionStore = getEppsStore<CollectionStoreMethods, ListsState>(id ?? defaultStoreId)

            if (!collectionStore) { return }

            collectionStore.addItem({
                id: collectionStore.lists.length + 1,
                name,
                type
            })
        }

        return {
            newList
        }
    },
    {
        actionsToRename: {
            getItem: 'getList', getItems: 'getLists', removeItem: 'removeList', setItems: 'setLists'
        },
        parentsStores: [new ParentStore('listCollection', useCollectionStore)],
        persist: { watchMutation: true },
        propertiesToRename: { items: 'lists' }
    }
)()