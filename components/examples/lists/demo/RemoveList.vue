<script setup lang="ts">
import { ref } from 'vue'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../shared/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'


const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>

const lists = computed(() => listsStore.items)

const listId = ref<number>()

function getResult() {
    if (!listId.value) { return }

    listsStore.removeItem({ id: listId.value })
}
</script>

<template>
    <MethodDemoForm v-if="lists && lists.length" :get-result title="Remove a list" submit-btn="Remove">
        <template #inputs>
            <div>
                <label for="itemId">Lists :</label>
                <select v-model="listId" required>
                    <option v-for="list in lists" :key="`list-rm-opt-${list.id}`" :value="list.id">
                        {{ list.name }}
                    </option>
                </select>
            </div>
        </template>
    </MethodDemoForm>
</template>