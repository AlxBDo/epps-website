<script setup lang="ts">
import { usePrototypeStore, type PrototypeState, type PrototypeStore } from '~/stores/docs/prototype'

import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '../../common/ExplanationContainer.vue'

import type { EppsStore } from 'epps'
import type { PropType } from 'vue'
import type { CodeDeclarationTypes, FunctionPrototype, FunctionReturn, ParameterPrototype, TypeRequired } from '~/types/prototype'
import { constructorProps, methods } from '~/data/class/epps'


const componentProps = defineProps({
    constructorProps: {
        type: Array as PropType<ParameterPrototype[]>,
        default: () => []
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: undefined,
    },
    methods: {
        type: Array as PropType<FunctionPrototype[]>,
        default: () => []
    },
    properties: {
        type: Array as PropType<ParameterPrototype[]>,
        default: () => []
    },
    props: {
        type: Array as PropType<ParameterPrototype[]>,
        default: () => []
    },
    requiredTypes: {
        type: Array as PropType<TypeRequired[]>
    },
    returnType: {
        type: String as PropType<FunctionReturn>,
        default: undefined
    },
    type: {
        type: String as PropType<CodeDeclarationTypes>,
        required: true,
    },
    value: {
        type: String,
        default: undefined
    },
})


const store = usePrototypeStore(componentProps.name) as EppsStore<PrototypeStore, PrototypeState>
store.initDeclaration(componentProps)

const {
    codeSlots,
    displayJsSlot,
    getCode
} = store

onUnmounted(() => store.$reset())
</script>

<template>
    <ExplanationContainer :id="name" :code-sections="codeSlots">
        <template #subtitle>Prototype</template>

        <template v-if="description" #explanation>
            <p class="text-sm">{{ description }}</p>
        </template>

        <template #typeScript :key="`prototype-${name}-${type}-ts`">
            <CodeBlock :code="getCode()" lang="typeScript" />
        </template>

        <template v-if="displayJsSlot()" #javascript :key="`prototype-${name}-${type}-js`">
            <CodeBlock :code="getCode('javascript')" lang="typeScript" />
        </template>
    </ExplanationContainer>
</template>