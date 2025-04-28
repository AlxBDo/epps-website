<script setup lang="ts">
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'

import type { PropType } from 'vue'
import type { ParameterPrototype, TypeRequired } from '~/types/components'
import { useStoreStore } from '~/stores/doc/store'


interface StoreDefinitions {
    js: string
    ts: string
}


const componentProps = defineProps({
    definitionParameter: { type: Object as PropType<ParameterPrototype>, default: () => { } },
    displayNameAs: { type: String as PropType<'subtitle' | 'title'>, default: undefined },
    isEppsStore: { type: Boolean, default: true },
    name: { type: String, required: true },
    requiredTypes: { type: Array as PropType<TypeRequired[]>, default: () => [] },
    storeDefinitions: { type: Object as PropType<StoreDefinitions>, required: true }
})

const storeStore = useStoreStore(componentProps.name)
storeStore.init(componentProps)

const { definitionParameterToString, defineStoreToString, requiredTypesToString, storeName } = storeStore

const definition = (withTypes: boolean) => `const ${storeName} = ${definitionParameterToString() + defineStoreToString() + (withTypes ? requiredTypesToString() : '')}(
    ${componentProps.name}Store,
    () => `
const endDefinition = `
)`

const title = componentProps.displayNameAs === 'title' ? storeName : undefined
</script>

<template>
    <ExplanationContainer :code-sections="['typescript', 'javascript']" :id="`${name}-store-explanation`"
        :key="`${name}-store-explanation`" :title>

        <template v-if="displayNameAs === 'subtitle'" #subtitle?>{{ storeName }}</template>

        <template #explanation>
            <slot name="explanation"></slot>
        </template>

        <template #typescript>
            <pre v-if="$slots.typesDefinition"><slot name="typesDefinition"></slot></pre>
            <br />
            <pre>{{ definition(true) + storeDefinitions.ts + endDefinition }}</pre>
        </template>

        <template #javascript>
            <pre>{{ definition(false) + storeDefinitions.js + endDefinition }}</pre>
        </template>

        <template v-if="$slots?.toSee" #toSee>
            <slot name="toSee"></slot>
        </template>
    </ExplanationContainer>
</template>