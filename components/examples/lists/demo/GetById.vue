<script setup lang="ts">
import { ref } from 'vue'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '~/models/liste'


const listId = ref<number>()

function getResult() {
    if (!listId.value) { return }

    return {
        result: (useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>).getItem({
            id: listId.value
        }),
        name: `List - ${listId.value}`
    }
}
</script>

<template>
    <MethodDemoForm :get-result title="Get List by Id" submit-btn="Get List">
        <template #inputs>
            <div>
                <label for="itemId">Item ID:</label>
                <input id="itemId" v-model="listId" type="number" required>
            </div>
        </template>
    </MethodDemoForm>
</template>