<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'
import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'
import Links from '~/components/common/Links.vue'


const { eppsStoreOptions, parentStore, useCollectionStore } = usePagesDefinitions()
const { id, title } = listsStoreCreation

const storeDefinition = `export const useListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId, 
    () => ({}), 
    {
        actionsToRename: { 
            addItem: 'newList', getItem: 'getList', getItems: 'getLists', removeItem: 'removeList', setItems: 'setLists' 
        }, 
        parentsStores: [ new ParentStore('listsCollection', useCollectionStore) ],
        persist: { watchMutation: true }
    }
)()`
</script>

<template>
    <ExplanationContainer :code-sections="['setup']" :id :tip-sections="['store-creation-tip']" :title>
        <template #detailedExplanations>
            <p>
                The actionsToRename property of EppsStoreOptions allows you to rename methods inherited
                from the parent store.
            </p>
            <p>
                The propertiesToRename property of EppsStoreOptions allows you to rename the state
                properties inherited from the parent store.
            </p>
            <p>
                The persist.watchMutation property of EppsStoreOptions allows the state to be persisted
                each time one of its properties is modified.
            </p>
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