<script setup lang="ts">
import { isEmpty } from '~/utils/validation'
import { useStorePrototype } from '~/stores/docs/storePrototype'

import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '../../common/ExplanationContainer.vue'

import type { PropType } from 'vue'
import type { StorePrototype } from '~/types/components'


const componentProps = defineProps({
    prototype: {
        type: Object as PropType<StorePrototype>,
        required: true
    },
})

const { id, methods, state } = componentProps.prototype

const storePrototype = useStorePrototype(id)
storePrototype.setPrototype(componentProps.prototype)

const methodsHasDescription = storePrototype.methodsHasDescription()
const stateHasDescription = storePrototype.stateHasDescription()

const optionApiStorePrototype = storePrototype.prototypeToString('optionApi')
const setupStorePrototype = storePrototype.prototypeToString()
</script>

<template>
    <ExplanationContainer :id :code-sections="['optionApi', 'setup']">
        <template #subtitle>Prototype</template>

        <template v-if="storePrototype.description" #explanation>
            <p class="text-sm">{{ storePrototype.description }}</p>
        </template>

        <template #optionApi :key="`prototype-${name}-${type}-optionApi`">
            <CodeBlock :code="optionApiStorePrototype" lang="typeScript" />
        </template>

        <template #setup :key="`prototype-${name}-${type}-setup`">
            <CodeBlock :code="setupStorePrototype" lang="typeScript" />
        </template>

        <template v-if="methodsHasDescription || stateHasDescription" #detailedExplanations>
            <article v-if="stateHasDescription">
                <h4>State</h4>
                <ul class="text-sm">
                    <li v-for="property of state">
                        <span class="font-bold">{{ property.name }}</span>
                        <span v-if="!property.required" class="italic font-light"> - optional</span> :
                        {{ property?.description ?? property.type }}
                    </li>
                </ul>
            </article>

            <article v-if="methodsHasDescription">
                <h4>Actions</h4>
                <ul class="text-sm">
                    <li v-for="method of methods" class="mb-4">
                        <p>
                            <span class="font-bold">{{ method.name }}</span>
                            <template v-if="method?.description">
                                : <span class="font-light">{{ method.description }}</span>
                            </template>
                        </p>
                        <div v-if="method?.props && !isEmpty(method.props)" class="text-sm">
                            <p class="font-semibold text-xs pl-2">Parameters</p>
                            <ul class="pl-6">
                                <li v-for="param of method.props">
                                    {{ param.name }}
                                    <span v-if="!param.required" class="italic font-light text-xs"> - optional </span>:
                                    <span class="font-light text-xs">{{ param.type }}</span>
                                    <span v-if="param?.description" class="font-light"> - {{ param.description }}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </article>
        </template>
    </ExplanationContainer>
</template>

<style scoped>
li div p {
    padding: 0 5px;
    margin: 0px 10px;
}
</style>