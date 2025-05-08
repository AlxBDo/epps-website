<script lang="ts" setup>
import { ref } from 'vue'
import { useListsStore } from '~/stores/demo/lists'

import DisplayResult from '~/components/examples/common/displayResult/DisplayResult.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '~/models/liste'


const lists = ref<List[]>([])
const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>

listsStore.remember().then(() => {
    if (!listsStore.items.length) {
        listsStore.setItems([
            { id: 1, name: 'My first list', type: '0' },
            { id: 2, name: 'My second list', type: '1' },
            { id: 3, name: 'My third list', type: '2' }
        ])
    }

    lists.value = listsStore.items
})
</script>

<template>
    <div>
        <h3>Lists contains in store</h3>

        <UButton color="neutral" icon="iconamoon:close-bold" @click="() => listsStore.$reset()" variant="outline">
            Reset Store
        </UButton>

        <DisplayResult :result="listsStore.items" />
    </div>
</template>