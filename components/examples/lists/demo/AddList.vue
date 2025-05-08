<script setup lang="ts">
import { ref } from 'vue'
import { listTypeLabels } from '~/utils/lists'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'

const items = ref(listTypeLabels)
const newListName = ref('')
const newListType = ref('0')

async function addNewList() {
    const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>

    listsStore.addItem({
        id: listsStore.items.length + 1,
        name: newListName.value,
        type: listTypeLabels.findIndex((type: string) => newListType.value === type)
    })

    initForm()
}

function initForm() {
    newListName.value = ''
    newListType.value = ''
}
</script>

<template>
    <MethodDemoForm :get-result="addNewList" title="Add a list" submit-btn="Add">
        <template #inputs>
            <div>
                <UInput placeholder="List name" v-model="newListName" />
            </div>
            <div>
                <USelect :items placeholder="Select type" v-model="newListType" />
            </div>
        </template>
    </MethodDemoForm>
</template>