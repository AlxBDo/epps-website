<script setup lang="ts">
import { varToString } from '~/utils/docs';
import CodeBlock from '~/components/dependencies/CodeBlock.vue';
import { isEmpty } from '~/utils/validation';

defineProps({
    name: { type: String },
    noResultText: { type: String, default: '"No list found"' },
    result: { type: [Array, Boolean, Number, Object, String], required: true }
})

function getCode(text: any, noResultText: string, name?: string) {
    text = varToString(text)

    if (name) {
        text = `//${name}
${text}`
    }

    return isEmpty(text) ? noResultText : text
}

</script>

<template>
    <CodeBlock :code="getCode(result, noResultText, name)" lang="typeScript" />
</template>

<style scoped>
.code {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;

    &>div {
        display: flex;
        justify-content: space-between;
        min-width: 45%;
        border-bottom: 1px dashed;
    }
}
</style>