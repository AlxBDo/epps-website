<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'
import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'


const { useCollectionStore } = usePagesDefinitions()
const { id, title } = listsStoreCreation

const storeDefinition = `const epps = new Epps({
    parentsStores: [ new ParentStore('listsCollection', useCollectionStore) ],
    persist: { watchMutation: true }
})

export const useListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId, 
    () => {
        function newList(name: string, type: ListTypes): void {
            const collectionStore = epps.getStore<CollectionStoreMethods, CollectionState<List>>(0, id ?? defaultStoreId)
            collectionStore?.addItem({
                id: collectionStore.items.length + 1,
                name,
                type
            })
        }

        return { newList }
    }, 
    epps
)()`
</script>

<template>
    <ExplanationContainer :code-sections="['setup']" :id :tip-sections="['store-creation-tip']" :title>
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
            <ULink :to="`/${useCollectionStore?.path}`">{{ useCollectionStore?.id }}</ULink>
        </template>
    </ExplanationContainer>
</template>