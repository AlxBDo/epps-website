<script setup lang="ts">
import { listsStoreCreation } from '~/utils/components/resumes'

import Alert from '~/components/dependencies/Alert.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';


const { id, title } = listsStoreCreation
</script>

<template>
    <ExplanationContainer :code-sections="['optionApi', 'setup']" :id :tip-sections="['store-creation-tip']" :title>
        <template #explanation>
            We create an instance of the lists store using <code>useListsStore</code> and type it
            with the appropriate methods and state.
        </template>

        <template #optionApi>
            <div>
                export const useListsStore = {{ '(' }}<br />
                <div>id?: string</div>
                {{') => defineEppsStore<CollectionStoreMethods, CollectionState<List>>(id ?? defaultStoreId, {'}}
                    <div>
                        <div>
                            state: (): ExtendedState => ({
                            <div>parentsStores: [useCollectionStore('listsCollection')]</div>
                            })
                        </div>
                    </div>
                    {{ '})()' }}
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
                    <a>See <code>extendedState</code> function documentation</a>
                </template>
            </Alert>
        </template>
    </ExplanationContainer>
</template>