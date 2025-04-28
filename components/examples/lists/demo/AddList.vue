<script setup lang="ts">
import { ref } from 'vue'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '../../../../models/liste'


const listTypeLabels = ['wish', 'shopping', 'task']
const newListName = ref('')
const newListType = ref('0')

async function addNewList() {
    const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>

    listsStore.addItem({ id: listsStore.items.length + 1, name: newListName.value, type: newListType.value })

    initForm()
}

function initForm() {
    newListName.value = ''
    newListType.value = '0'
}
</script>

<template>
    <MethodDemoForm :get-result="addNewList" title="Add a list" submit-btn="Add">
        <template #inputs>
            <div>
                <label for="name">List name:</label>
                <input id="name" v-model="newListName" type="text" required>
            </div>
            <div>
                <label for="type">List type:</label>
                <select id="type" v-model="newListType" required>
                    <option v-for="type, index of listTypeLabels" :value="index">{{ type }}</option>
                </select>
            </div>
        </template>
    </MethodDemoForm>
</template>