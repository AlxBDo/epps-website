<script setup lang="ts">
import type { PropType } from 'vue';

import ExplanationContainer from '../../common/ExplanationContainer.vue';
import FunctionPrototype from './FunctionPrototype.vue';


import type { FunctionPrototype as FunctionPrototypeInterface, StorePrototype } from '~/types/components'
import { isEmpty } from '~/utils/validation';


const componentProps = defineProps({
    prototype: {
        type: Object as PropType<StorePrototype>,
        required: true
    },
})

const { description, id, methods, state, type } = componentProps.prototype

const methodsHasDescription = !isEmpty(methods) && (methods as FunctionPrototypeInterface[]).find(
    property => property?.description
)
const stateHasDescription = state.find(property => property?.description)
</script>

<template>
    <ExplanationContainer :id :code-sections="['optionApi', 'setup']">
        <template #subtitle>Prototype</template>

        <template v-if="description" #explanation>
            <p class="text-sm">{{ description }}</p>
        </template>

        <template #optionApi :key="`prototype-${name}-${type}-optionApi`">
            <div>
                <span class="font-light italic mr-2">{{ type }}</span>
                <span class="font-bold">{{ id }}</span>
                <span class="italic">{{ ' {' }}</span>
                <div>
                    state: () => {
                    <div v-for="property of state">
                        <span class="state-property-name">{{ property.name }}</span>:
                        <span class="state-property-value-type">{{ property.type }}</span>
                    </div>
                    },
                </div>
                <div v-if="!isEmpty(methods)" class="mt-6">
                    actions: {
                    <div v-for="method of methods">
                        <FunctionPrototype language="typeScript" :prototype="method"></FunctionPrototype>
                    </div>
                    }
                </div>
                <span class="italic">{{ '}' }}</span>
            </div>
        </template>

        <template #setup :key="`prototype-${name}-${type}-setup`">
            <div>
                <span class="font-light italic mr-2">{{ type }}</span>
                <span class="font-bold">{{ id }}</span>
                <span class="italic">{{ ' {' }}</span>
                <div>
                    <div v-for="property of state">
                        <span class="state-property-name">{{ property.name }}</span>:
                        <span class="state-property-value-type">Ref<{{ property.type }}></span>
                    </div>
                </div>
                <div v-if="!isEmpty(methods)" class="mt-6">
                    <div v-for="method of methods">
                        <FunctionPrototype language="typeScript" :prototype="method">
                        </FunctionPrototype>
                    </div>
                </div>
                <span class="italic">{{ '}' }}</span>
            </div>
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