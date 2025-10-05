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

function saveList(list: List) {
    console.log('saveList', list)
}

export const useListsStore = (
    id?: string
) => defineEppsStore<ListsStoreMethods, ListsState>(
    id ?? defaultStoreId,
    () => {
        function newList(name: string, type: ListTypes): List | undefined {
            const collectionStore = getEppsStore<CollectionStoreMethods, ListsState>(id ?? defaultStoreId)

            if (!collectionStore) { return }

            const newList = {
                id: collectionStore.lists.length + 1,
                name,
                type
            }

            collectionStore.addItem(newList)

            return newList
        }

        function addIcon(lists: List[]) {
            if (lists[0]) {
                const icons: Record<string, string> = { '0': '🎁', '1': '🛒', '2': '✅' }
                lists[0].name = `${icons[lists[0].type]} ${lists[0].name}`
            }
        }

        return {
            addIcon,
            newList
        }
    },
    {
        actionFlows: { addItem: { before: 'addIcon' }, newList: { after: saveList } },
        actionsToRename: {
            getItem: 'getList', getItems: 'getLists', removeItem: 'removeList', setItems: 'setLists'
        },
        parentsStores: [new ParentStore('listCollection', useCollectionStore)],
        persist: { watchMutation: true },
        propertiesToRename: { items: 'lists' }
    }
)()