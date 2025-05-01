<script setup lang="ts">
import { useCodeDeclarationExplanationStore } from '~/stores/doc/codeDeclarationExplanation'

import ExplanationContainer from '../../common/ExplanationContainer.vue'
import Links from '~/components/common/Links.vue'
import ParametersList from './ParametersList.vue'
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

const codeDeclarationExplanationStore = useCodeDeclarationExplanationStore(componentProps.prototype.name)
codeDeclarationExplanationStore.initDeclaration(componentProps.prototype)

const { hasTypesToSee, hasPropsExplanation, propsExplanation, typesToSee } = codeDeclarationExplanationStore
const { description, name, requiredTypes, type } = componentProps.prototype
const title = componentProps.displayTitle ? componentProps.prototype.name : undefined

onBeforeUnmount(() => codeDeclarationExplanationStore.$reset())
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
                :value="(prototype as TypePrototype)?.value"></Prototype>

            <ParametersList v-if="hasPropsExplanation()" :params="propsExplanation" title="Parameters"></ParametersList>
            <div v-else-if="$slots?.propsExplanation">
                <h4>Parameters</h4>
                <slot name="propsExplanation"></slot>
            </div>

            <ParametersList v-if="requiredTypes?.length" :params="requiredTypes" title="Type requirements">
                <template #explanation>
                    <p class="text-sm mb-2">
                        When using "{{ name }}" {{ type }}, you must provide {{ requiredTypes.length }} types:
                    </p>
                </template>
            </ParametersList>
        </template>

        <template v-if="hasTypesToSee()" #toSee>
            <Links icon="material-symbols:link-rounded" :links="typesToSee.reduce((acc: Record<string, string>, curr: string) => {
                acc[curr] = `/doc/types/${curr}`
                return acc
            }, {})"></Links>
        </template>
    </ExplanationContainer>
</template>