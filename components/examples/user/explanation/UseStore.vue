<script setup lang="ts">
import { useUserStore } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/common/ExplanationContainer.vue';

const { id, title } = useUserStore
</script>

<template>
    <ExplanationContainer :id :title :code-sections="['typescript']">
        <template #explanation>
            We create an instance of the user store using <code>useUserStore</code> and type it
            with the appropriate methods and state.
        </template>

        <template #typescript>
            {{ `const listsStore = useUserStore() as EppsStore<UserStore, UserState>` }}
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
</template>