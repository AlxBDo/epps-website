<script setup lang="ts">
import type { PropType } from 'vue';
import { useSlotsContainer } from '~/composables/slotsContainer';
import type { SlotCtn } from '~/types/components';


const props = defineProps({
    displayByDefault: {
        type: Number,
    },
    groups: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    numberDisplay: {
        type: Number,
        default: 1
    },
    slots: {
        type: Array as PropType<SlotCtn[]>,
        required: true,
    },
})

const { display, numberDisplay, selectedSlot, selections, setSelectedSlot, slotsNames } = useSlotsContainer(
    props.slots,
    { ...props }
)
</script>

<template>
    <template v-if="numberDisplay !== slotsNames.length">
        <nav class="slots-selection-nav">
            <ul>
                <li v-for="(name, index) of selections" :class="{ selected: selectedSlot === index }"
                    @click="() => setSelectedSlot(index)">{{ name }}
                </li>
            </ul>
        </nav>
    </template>

    <template v-for="(slot, index) in slots">
        <template v-if="display(index)">
            <template v-if="slot.type === 'code'">
                <div class="code" :key="`slot-ctn-${slot.type}-${slot.name}${index}`">
                    <code :key="`slot-code-${slot.name}${index}`">
                        <slot :name="slot.name"></slot> 
                    </code>
                </div>
            </template>

            <template v-else-if="slot.type === 'explanation'">
                <div class="code-explanation" :key="`slot-ctn-${slot.type}-${slot.name}-${index}`">
                    <slot :name="slot.name"></slot>
                </div>
            </template>

            <template v-else>
                <div :key="`slot-ctn-${slot.name}-${index}`">
                    <slot :name="slot.name"></slot>
                </div>
            </template>
        </template>
    </template>
</template>