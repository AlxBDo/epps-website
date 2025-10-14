import { defineEppsStore, getEppsStore, ParentStore, useCollectionStore, type CollectionStoreMethods } from "epps"

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

export const useEppsListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, ListsState>(
    id ?? defaultStoreId,
    () => {
        function newList(name: string, type: ListTypes): List | undefined {
            const store = getEppsStore<CollectionStoreMethods, ListsState>(id ?? defaultStoreId)

            if (!store) { return }

            const newList = {
                id: store.lists.length + 1,
                name,
                type
            }

            store.addItem(newList)

            return newList
        }

        function addIcon(lists: string[]) {
            const icons: Record<string, string> = { '0': '🎁', '1': '🛒', '2': '✅' }
            if (lists[0] && lists[1]) {
                lists[0] = `${icons[lists[1]]} ${lists[0]}`
            }
        }

        return {
            addIcon,
            newList
        }
    },
    {
        parentsStores: [new ParentStore('listCollection', useCollectionStore)]
    }
)()