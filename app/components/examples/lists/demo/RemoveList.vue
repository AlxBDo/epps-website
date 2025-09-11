<script setup lang="ts">
import { ref } from 'vue'
import { isEmpty } from '~/utils/validation'
import { useListsStore, type ListsState, type ListsStoreMethods } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'


const listsStore = useListsStore() as EppsStore<ListsStoreMethods, ListsState>

const list = ref<string>()

function getResult() {
    if (!list.value) { return }

    const listFound = listsStore.getList({ name: list.value })
    listFound?.id && listsStore.removeList({ id: listFound.id })
}
</script>

<template>
    <MethodDemoForm v-if="!isEmpty(listsStore.lists)" :get-result title="Remove a list" submit-btn="Remove">
        <template #inputs>
            <div>
                <USelect :items="(listsStore.lists.map(list => list.name) as string[])" placeholder="Select a list"
                    v-model="list" />
            </div>
        </template>
    </MethodDemoForm>
</template>