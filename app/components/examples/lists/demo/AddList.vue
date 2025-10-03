<script setup lang="ts">
import { ref } from 'vue'
import { listTypeLabels } from '~/utils/lists'
import { useListsStore } from '~/stores/demo/lists'

import MethodDemoForm from '../../../common/form/MethodDemoForm.vue'

const items = ref(listTypeLabels)
const newListName = ref('')
const newListType = ref('wish')

async function addNewList() {
    const listsStore = useListsStore()

    listsStore.newList(newListName.value, `${listTypeLabels.findIndex((type: string) => newListType.value === type)}`)

    initForm()
}

function initForm() {
    newListName.value = ''
    newListType.value = 'wish'
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