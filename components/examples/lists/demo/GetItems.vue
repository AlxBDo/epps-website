<script setup lang="ts">
import { ref } from 'vue'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../shared/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'


const itemType = ref('0')

function getItemsByType() {
    return {
        result: (useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>).getItems({
            type: itemType.value
        }),
        name: 'List'
    }
}
</script>

<template>
    <MethodDemoForm :get-result="getItemsByType" title="Get items by type" submit-btn="Get Items">
        <template #inputs>
            <label for="itemType">Item Type:</label>
            <select id="itemType" v-model="itemType" required>
                <option value="0">Wish</option>
                <option value="1">Shopping</option>
                <option value="2">Task</option>
            </select>
        </template>
    </MethodDemoForm>
</template>