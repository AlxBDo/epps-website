<script setup lang="ts">
import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'

import type { PropType } from 'vue'
import type { ParameterPrototype, TypeRequired } from '~/types/prototype'
import { useStoreStore } from '~/stores/docs/store'
import { isEmpty } from '~/utils/validation'


interface StoreDefinitions {
    js: string
    ts: string
}


const componentProps = defineProps({
    definitionParameter: { type: Object as PropType<ParameterPrototype>, default: () => { } },
    displayNameAs: { type: String as PropType<'subtitle' | 'title'>, default: undefined },
    eppsDefinition: { type: String, default: '' },
    isEppsStore: { type: Boolean, default: true },
    name: { type: String, required: true },
    requiredTypes: { type: Array as PropType<TypeRequired[]>, default: () => [] },
    storeDefinitions: { type: Object as PropType<StoreDefinitions>, required: true },
    typesDefinition: { type: String, default: undefined }
})

const storeStore = useStoreStore(componentProps.name)
storeStore.init(componentProps)

const { definitionParameterToString, defineStoreToString, requiredTypesToString, storeName } = storeStore

const definition = (withTypes: boolean) => `const ${storeName} = ${definitionParameterToString() + defineStoreToString() + (withTypes ? requiredTypesToString() : '')}(
    ${!isEmpty(componentProps.definitionParameter) ? componentProps.definitionParameter.name : "'" + (componentProps.name + 'Store') + "'"},
    () => `

const eppsEndDefinition = componentProps.isEppsStore ? `,
    ${componentProps.eppsDefinition}` : ''

const endDefinition = `${eppsEndDefinition}
)`

const title = componentProps.displayNameAs === 'title' ? storeName : undefined

const typesDefinitionString = componentProps.typesDefinition ?? ''
</script>

<template>
    <ExplanationContainer :code-sections="['typescript', 'javascript']" :id="`${name}-store-explanation`"
        :key="`${name}-store-explanation`" :title>

        <template v-if="displayNameAs === 'subtitle'" #subtitle?>{{ storeName }}</template>

        <template #explanation>
            <slot name="explanation"></slot>
        </template>

        <template #typescript>
            <template v-if="!typesDefinition && $slots.typesDefinition">
                <pre><slot name="typesDefinition"></slot></pre>
                <br />
            </template>
            <CodeBlock :code="typesDefinitionString + definition(true) + storeDefinitions.ts + endDefinition"
                lang="typeScript" />
        </template>

        <template #javascript>
            <CodeBlock :code="definition(false) + storeDefinitions.js + endDefinition" lang="typeScript" />
        </template>

        <template v-if="$slots?.detailedExplanations" #detailedExplanations>
            <slot name="detailedExplanations"></slot>
        </template>

        <template v-if="$slots?.toSee" #toSee>
            <slot name="toSee"></slot>
        </template>
    </ExplanationContainer>
</template>