<script setup lang="ts">
import { useCodeDeclarationExplanationStore } from '~/stores/docs/codeDeclarationExplanation'
import { capitalize } from '#imports'

import Definition from './Definition.vue'
import ExplanationContainer from '../../common/ExplanationContainer.vue'
import Links from '~/components/common/Links.vue'
import ParametersList from './ParametersList.vue'
import Prototype from './Prototype.vue'

import type { PropType } from 'vue'
import type { ClassPrototype, FunctionPrototype, InterfacePrototype, ParameterPrototype, TypePrototype } from '~/types/prototype'
import { useVerticalMenuStore } from '~/stores/docs/verticalMenu'


const componentProps = defineProps({
    displayTitle: {
        type: Boolean,
        default: true,
    },
    prototype: {
        type: Object as PropType<ClassPrototype | FunctionPrototype | InterfacePrototype | TypePrototype>,
        required: true,
    }
})

const codeDeclarationExplanationStore = useCodeDeclarationExplanationStore(componentProps.prototype.name)
codeDeclarationExplanationStore.initDeclaration(componentProps.prototype)

const { hasTypesToSee, hasPropsExplanation, propsExplanation, typesToSee } = codeDeclarationExplanationStore
const { description, name, requiredTypes, type } = componentProps.prototype
const title = componentProps.displayTitle ? capitalize(componentProps.prototype.name) : undefined
const properties = (componentProps.prototype as InterfacePrototype)?.properties

const hasTypes = hasTypesToSee()

if (hasTypes) {
    const verticalMenuStore = useVerticalMenuStore()
    verticalMenuStore.addItem(name)
}

onUnmounted(() => codeDeclarationExplanationStore.$reset())
</script>

<template>
    <ExplanationContainer :id="name.toLowerCase()" :title>
        <template #explanation>
            <div>
                <slot name="description"></slot>
            </div>

            <Prototype :constructor-props="(prototype as ClassPrototype).constructorProps" :description
                :methods="(prototype as ClassPrototype).methods" :name :properties="properties"
                :props="(prototype as FunctionPrototype)?.props" :required-types
                :return-type="(prototype as FunctionPrototype)?.returnType" :type
                :value="(prototype as TypePrototype)?.value"></Prototype>

            <ParametersList
                v-if="properties && properties.some((properties: ParameterPrototype) => properties.description)"
                :params="(properties as Pick<ParameterPrototype, 'description' | 'name'>[])" title="Properties">
            </ParametersList>

            <ParametersList v-if="hasPropsExplanation()"
                :params="(propsExplanation as Pick<ParameterPrototype, 'description' | 'name'>[])" title="Parameters">
            </ParametersList>
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

        <template v-if="hasTypes" #toSee>
            <Links icon="material-symbols:link-rounded" :links="typesToSee.reduce((acc: Record<string, string>, curr: string) => {
                acc[curr] = `#${curr}`
                return acc
            }, {})"></Links>
        </template>

        <template v-if="hasTypes" #more>
            <Definition v-for="type in typesToSee" :name="type" type="types" displayTitle separator />
        </template>
    </ExplanationContainer>
</template>