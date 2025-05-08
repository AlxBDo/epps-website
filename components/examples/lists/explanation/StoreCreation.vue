<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'
import { extendedState, useCollectionStore } from '~/utils/pages/resumes'

import Alert from '~/components/dependencies/Alert.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';


const { id, title } = listsStoreCreation
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
            <div>
                export const useListsStore = {{ '(' }}<br />
                <div>id?: string</div>
                {{') => defineEppsStore<CollectionStoreMethods, CollectionState<List>>('}}
                    <div>
                        id ?? defaultStoreId, <br />
                        {{'() => ({'}}
                        <div>
                            {{ '...extendedState(' }}
                            <div>
                                [useCollectionStore('listsCollection')], <br />
                                { persist: { watchMutation: ref(true) } }
                            </div>
                            {{ ')' }}
                        </div>
                        {{ '})' }}
                    </div>
                    {{ ')()' }}
            </div>
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