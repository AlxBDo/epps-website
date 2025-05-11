<script setup lang="ts">
import { ref } from 'vue'
import { isEmpty } from '~/utils/validation'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'


const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>

const list = ref<string>()

function getResult() {
    if (!list.value) { return }

    const listFound = listsStore.getItem({ name: list.value })
    listFound?.id && listsStore.removeItem({ id: listFound.id })
}
</script>

<template>
    <MethodDemoForm v-if="!isEmpty(listsStore.items)" :get-result title="Remove a list" submit-btn="Remove">
        <template #inputs>
            <div>
                <USelect :items="(listsStore.items.map(list => list.name) as string[])" placeholder="Select a list"
                    v-model="list" />
            </div>
        </template>
    </MethodDemoForm>
</template>