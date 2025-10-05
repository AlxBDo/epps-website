<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'
import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'
import Links from '~/components/common/Links.vue'
import UsedEppsStoreOptionsExplanation from '../../common/UsedEppsStoreOptionsExplanation.vue'


const { eppsStoreOptions, parentStore, useCollectionStore } = usePagesDefinitions()
const { id, title } = listsStoreCreation

const storeDefinition = `export const useListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(
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
                lists[0].name = icons[lists[0].type] + " " + lists[0].name
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
        parentsStores: [ new ParentStore('listsCollection', useCollectionStore) ],
        propertiesToRename: { items: 'lists' }
    }
)()`

const usedEppsStoreOptions = [
    {
        name: 'actionFlows',
        explanation: 'allows you to execute a function or a store action before or after store action execution (used Pinia $onAction hook)'
    },
    {
        name: 'actionsToRename',
        explanation: 'allows you to rename methods inherited from the parent store'
    },
    {
        name: 'parentsStores',
        explanation: 'allows you to define stores to extends'
    },
    {
        name: 'propertiesToRename',
        explanation: 'allows you to rename the state properties inherited from the parent store'
    }
]
</script>

<template>
    <ExplanationContainer :code-sections="['setup']" :id :title>
        <template #detailedExplanations>
            <UsedEppsStoreOptionsExplanation :options="usedEppsStoreOptions" />
        </template>
        <template #optionApi>
            <div>
                export const useListsStore = {{ '(' }}<br />
                <div>id?: string</div>
                {{') => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(id ?? defaultStoreId, ({'}}
                    <div>
                        <div>
                            ...extendedState => (parentsStores: [useCollectionStore('listsCollection')])
                        </div>
                    </div>
                    {{ '}))()' }}
            </div>
        </template>

        <template #setup>
            <CodeBlock :code="storeDefinition" lang="typeScript" />
        </template>

        <template #toSee>
            <Links :links="{
                EppsStoreOptions: `/${eppsStoreOptions?.path}`,
                ParentStore: `/${parentStore?.path}`,
                useCollectionStore: `/${useCollectionStore?.path}`
            }"></Links>
        </template>
    </ExplanationContainer>
</template>