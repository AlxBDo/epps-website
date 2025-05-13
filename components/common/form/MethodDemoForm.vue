<script setup lang="ts">
import { ref } from 'vue'

import DisplayResult from '~/components/examples/common/DisplayResult.vue'
import Form from './Form.vue'

const props = defineProps({
    cancelBtn: { type: [Boolean, String], default: false },
    getResult: { type: Function, required: true },
    submitBtn: { type: [Boolean, String], default: false },
    title: { type: String, required: true }
})

type Result = {
    name?: string
    result: any
}

const result = ref<any>()
const itemName = ref<string>()

function onSubmit() {
    const resultReturn: Result | undefined = props.getResult()

    if (resultReturn?.result) {
        result.value = resultReturn.result

        if (resultReturn.name) {
            itemName.value = resultReturn.name
        }
    }
}

function resetResult() {
    result.value = undefined
}
</script>

<template>
    <Form :cancel-btn :submit-btn :title @onSubmit="onSubmit">
        <template #inputs>
            <slot name="inputs"></slot>
        </template>
    </Form>
    <div v-if="result">
        <div class="flex justify-center items-center">
            <h4>{{ title }} result</h4>
            <UButton color="neutral" icon="iconamoon:close-bold" variant="ghost" @click="resetResult"></UButton>
        </div>
        <div>
            <DisplayResult :name="itemName" :result />
        </div>
    </div>
</template>

<style scoped>
h4 {
    width: 100%;
}

:deep(.code > div) {
    width: 320px;
    flex-wrap: wrap;
}
</style>