<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'

import Alert from '~/components/dependencies/Alert.vue'
import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'


const { extendedState, useCollectionStore } = usePagesDefinitions()
const { id, title } = listsStoreCreation

const storeDefinition = `export const useListsStore = (
    id?: string
) => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(
    id ?? defaultStoreId, 
    () => {
        const { parentsStores, persist } = extendedState(
            [useCollectionStore('listsCollection')],
            { persist: { watchMutation: ref(true) } }
        )

        function newList(name: string, type: ListTypes): void {
            const collectionStore = parentsStores && parentsStores()[0] as EppsStore<
                CollectionStoreMethods, CollectionState<List>
            >

            if (!collectionStore) { return }

            getParentStoreMethod('addItem', collectionStore)({
                id: collectionStore.items.length + 1,
                name,
                type
            })
        }

        return {
            newList,
            parentsStores,
            persist
        }
})()`
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

        <template #store-creation-tip>
            <Alert type="tip">
                <template #description>
                    <p>
                        Uses the <code>extendedState</code> function to obtain default and required state properties
                        for the plugin.
                    </p>
                    <ULink class="text-yellow-50" :to="`/${extendedState.path}`">
                        See <code>extendedState</code> function documentation
                    </ULink>
                </template>
            </Alert>
        </template>

        <template #toSee>
            <ULink :to="`/${useCollectionStore.path}`">{{ useCollectionStore.id }}</ULink>
        </template>
    </ExplanationContainer>
</template>