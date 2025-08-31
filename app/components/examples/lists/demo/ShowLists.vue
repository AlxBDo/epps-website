<script lang="ts" setup>
import { useListsStore, type ListsState } from '~/stores/demo/lists'

import DisplayResult from '~/components/examples/common/DisplayResult.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '~/models/liste'


const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, ListsState>

listsStore.remember().then(() => {
    if (!listsStore.lists.length) {
        listsStore.setItems([
            { id: 1, name: 'My first list', type: '0' },
            { id: 2, name: 'My second list', type: '1' },
            { id: 3, name: 'My third list', type: '2' }
        ])
    }
})
</script>

<template>
    <div>
        <h3>Lists contains in store</h3>

        <DisplayResult :result="listsStore.lists" />

        <UButton class="mt-4 cursor-pointer" color="neutral" icon="iconamoon:close-bold"
            @click="() => listsStore.$reset()" variant="outline">
            Reset Store
        </UButton>
    </div>
</template>