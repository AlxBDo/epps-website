<script setup lang="ts">
import { ref } from 'vue'
import { listTypeLabels } from '~/utils/lists'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'

const items = ref(listTypeLabels)
const itemType = ref<string>()

function getItemsByType() {
    if (!itemType.value) { return }

    return {
        result: (useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>).getItems({
            type: listTypeLabels.findIndex((type: string) => type === itemType.value)
        }),
        name: 'List'
    }
}
</script>

<template>
    <MethodDemoForm :get-result="getItemsByType" title="Get items by type" submit-btn="Get Items">
        <template #inputs>
            <USelect placeholder="Select a type" :items v-model="itemType" />
        </template>
    </MethodDemoForm>
</template>