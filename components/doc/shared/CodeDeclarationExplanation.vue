<script setup lang="ts">
import { useCodeDeclarationExplanationStore } from '~/stores/doc/codeDeclarationExplanation'

import ExplanationContainer from '../../shared/ExplanationContainer.vue'
import Prototype from './Prototype.vue'

import type { PropType } from 'vue'
import type { TypePrototype, FunctionPrototype, InterfacePrototype } from '~/types/components'


const componentProps = defineProps({
    displayTitle: {
        type: Boolean,
        default: true,
    },
    prototype: {
        type: Object as PropType<FunctionPrototype | InterfacePrototype | TypePrototype>,
        required: true,
    }
})

const codeDeclarationExplanationStore = useCodeDeclarationExplanationStore()
codeDeclarationExplanationStore.initDeclaration(componentProps.prototype)

const { hasPropsExplanation, propsExplanation } = codeDeclarationExplanationStore
const { description, name, requiredTypes, type } = componentProps.prototype
const title = componentProps.displayTitle ? componentProps.prototype.name : undefined
</script>

<template>
    <ExplanationContainer :id="name" :title>
        <template #explanation>
            <div>
                <slot name="description"></slot>
            </div>

            <Prototype :description :name :properties="(prototype as InterfacePrototype)?.properties"
                :props="(prototype as FunctionPrototype)?.props" :required-types
                :return-type="(prototype as FunctionPrototype)?.returnType" :type
                :value="(prototype as TypePrototype)?.value" />

            <div v-if="hasPropsExplanation()">
                <h4>Parameters</h4>
                <ul>
                    <li v-for="(name, index) in Object.keys(propsExplanation)"
                        :key="`parameter-${name}-${index}-explanation`" class="mb-2 text-sm">
                        <span class="font-bold">{{ name }}</span>: {{ propsExplanation[name] }}
                    </li>
                </ul>
            </div>

            <div v-if="requiredTypes?.length">
                <h4>Types</h4>
                <p>
                    When using "{{ name }}" function, you must provide {{ requiredTypes.length }} types:
                </p>
                <ul>
                    <li v-for="(type, index) in requiredTypes" :key="index" class="text-sm">
                        <span class="font-bold">{{ type.name }}</span>: {{ type.description }}
                    </li>
                </ul>
            </div>
        </template>
    </ExplanationContainer>
</template>