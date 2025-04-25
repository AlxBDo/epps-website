<script setup lang="ts">
import { useSlots } from 'vue'
import SlotsContainer from './SlotsContainer.vue';
import { isEmpty } from '~/utils/validation';

defineProps({
    languages: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    title: {
        type: String
    },
})

const slots = useSlots()
const tips = Array.isArray(slots)
    ? slots.filter((slot) => slot.name.indexOf('tip') >= 0).map(slot => slot.name)
    : undefined
</script>

<template>
    <div>
        <h3 v-if="title">{{ title }}</h3>

        <div class="code-explanation">
            <slot name="explanation"></slot>
        </div>

        <SlotsContainer :slots="languages.map(name => ({ name, type: 'code' }))">
            <template v-for="name of languages">
                <template :v-slot="name">
                    <slot :name="name"></slot>
                </template>
            </template>
        </SlotsContainer>

        <div v-if="!isEmpty(tips) && tips">
            <SlotsContainer :slots="tips.map(name => ({ name, type: 'tip' }))">
                <template v-for="(name, index) of tips">
                    <template :v-slot="name">
                        <slot :name="name" :key="`${name}-${index}`"></slot>
                    </template>
                </template>
            </SlotsContainer>
        </div>
    </div>
</template>

<style scoped>
div {
    margin: 15px auto;
    padding: 5px;

    div {
        margin: 10px;
        padding: 5px;
    }
}
</style>