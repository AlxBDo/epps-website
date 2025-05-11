<script setup lang="ts">
import type { PropType } from 'vue';
import { usePrototypeStore, type PrototypeState, type PrototypeStore } from '~/stores/docs/prototype';
import ExplanationContainer from '../../common/ExplanationContainer.vue';
import type { CodeDeclarationTypes, FunctionReturn, ParameterPrototype, TypeRequired } from '~/types/components'
import type { EppsStore } from 'epps';


const componentProps = defineProps({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: undefined,
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
    getEndSymbol,
    getStartSymbol,
    propsToString,
    requiredTypesToString,
    returnTypeFormatted
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
            <div>
                <span class="font-light italic mr-2">{{ type }}</span>
                <span class="font-bold">{{ name }}</span>
                <span class="italic">{{ requiredTypesToString() }}</span>
                <pre v-if="type === 'function'" class="inline">{{ propsToString() }}</pre>{{
                    `${returnTypeFormatted(returnType)} ${getStartSymbol()} `
                }}

                <ul v-if="properties.length > 0" class="ml-8">
                    <li v-for="property in properties">
                        <span>{{ property.name }}{{ property.required ? '' : '?' }}: </span>
                        <pre class="font-light inline italic">{{ property.type }}</pre>
                        <span v-if="property.description" class="font-extralight italic">
                            // {{ property.description }}
                        </span>
                    </li>
                </ul>

                <template v-if="value">
                    {{ value }}
                </template>

                {{ `${getEndSymbol()}` }}
            </div>
        </template>

        <template v-if="displayJsSlot()" #javascript :key="`prototype-${name}-${type}-js`">
            <div>
                <span class="font-light italic mr-2">{{ type }}</span><span class="font-bold">{{ name }}</span>
                <pre class="inline">{{ propsToString() }}</pre>{{ ` ${getStartSymbol()} ` }}
                <ul v-if="properties.length > 0" class="ml-8">
                    <li v-for="property in properties">
                        <span>{{ property.name }}{{ property.required ? '' : '?' }}: </span>
                        <pre class="font-light inline italic">{{ property.type }}</pre>
                        <span v-if="property.description" class="font-extralight italic">
                            // {{ property.description }}
                        </span>
                    </li>
                </ul>

                <template v-if="value">
                    {{ value }}
                </template>

                {{ `${getEndSymbol()}` }}
            </div>
        </template>
    </ExplanationContainer>
</template>