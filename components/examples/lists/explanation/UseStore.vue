<script setup lang="ts">
import { useListsStore } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/common/ExplanationContainer.vue';

const { id, title } = useListsStore
</script>

<template>
    <ExplanationContainer :id :title :code-sections="['typescript']">
        <template #explanation>
            We create an instance of the lists store using <code>useListsStore</code> and type it
            with the appropriate methods and state.
        </template>

        <template #typescript>
            {{ `const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>` }}
        </template>
    </ExplanationContainer>

    <ExplanationContainer id="add-list" :code-sections="['vue']">
        <template #subtitle>Add a list</template>
        <template #explanation>
            We add a new list to <code>listsStore</code> using the <code>addItem</code> method.
        </template>

        <template #vue>
            {{ `listsStore.addItem({ id: 1, name: 'My list', type: '0' })` }}
        </template>
    </ExplanationContainer>

    <ExplanationContainer id="remove-list" :code-sections="['vue']">
        <template #subtitle>Remove a list</template>
        <template #explanation>
            We remove a list to <code>listsStore</code> using the <code>removeItem</code> method.
        </template>

        <template #vue>
            {{ `listsStore.removeItem({ id: 5 })` }}
        </template>
    </ExplanationContainer>

    <ExplanationContainer id="set-lists" :code-sections="['vue']">
        <template #subtitle>Set lists</template>
        <template #explanation>
            We initialize the store with some list items using the <code>setItems</code> method.
        </template>

        <template #vue>
            <pre>{{ `listsStore.setItems([
    { id: 1, name: 'My first list', type: '0' },
    { id: 2, name: 'My second list', type: '1' },
    { id: 3, name: 'My third list', type: '2' }
])`
            }}</pre>
        </template>
    </ExplanationContainer>
</template>