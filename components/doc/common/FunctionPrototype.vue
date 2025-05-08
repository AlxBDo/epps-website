<script setup lang="ts">
import type { PropType } from 'vue';
import { usePrototypeStore } from '~/stores/doc/prototype';
import ExplanationContainer from '../../common/ExplanationContainer.vue';
import type { FunctionPrototype } from '~/types/components'


const componentProps = defineProps({
    isArrowSyntax: {
        type: Boolean,
        default: true
    },
    language: {
        type: String as PropType<'javascript' | 'typeScript'>,
        default: () => undefined
    },
    prototype: {
        type: Object as PropType<FunctionPrototype>,
        required: true
    }
})


const store = usePrototypeStore(componentProps.prototype.name)
store.initDeclaration(componentProps.prototype)

const {
    propsToString,
    requiredTypesToString,
} = store

onUnmounted(() => store.$reset())
</script>

<template>
    <span class="font-bold">{{ prototype.name }}</span>
    <span v-if="isArrowSyntax">: </span>
    <span v-if="language === 'typeScript'" class="italic">{{ requiredTypesToString() }}</span>
    <pre class="inline">{{ propsToString() }}</pre>
    <span v-if="isArrowSyntax"> => </span>
    {{ prototype.returnType }}
</template>