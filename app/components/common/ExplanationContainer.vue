<script setup lang="ts">
import { capitalize } from 'vue';
import { useSlots } from 'vue'
import { isEmpty } from '~/utils/validation';

const props = defineProps({
    codeSections: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    id: {
        type: String,
        required: true,
    },
    tipSections: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    title: {
        type: String
    },
})

const {
    display,
    numberDisplay,
    selectedSlot,
    selections,
    setSelectedSlot,
    slots: codeSlots,
    slotsNames
} = useSlotsContainer(props.codeSections.map(name => ({ name, type: 'code' })))

const slots = useSlots()
</script>

<template>
    <article>
        <header>
            <h3 v-if="title" :id>{{ title }}</h3>

            <h4 v-if="slots?.subtitle" :id="title ? `${id}-subtitle` : id">
                <slot name="subtitle"></slot>
            </h4>
        </header>

        <section class="explanation">
            <slot name="explanation"></slot>
        </section>

        <template v-if="!isEmpty(codeSections)">
            <div class="mt-2">
                <template v-if="numberDisplay !== slotsNames.length">
                    <UTabs color="neutral" :content="false"
                        :items="selections.map((selection) => ({ label: capitalize(selection) }))" size="xs"
                        :value="selectedSlot" variant="link"
                        @update:model-value="(payload) => setSelectedSlot(payload as number)">
                    </UTabs>
                </template>

                <template v-for="(slot, index) in codeSlots">
                    <slot v-if="display(index)" :key="`slot-ctn-${slot.type}-${slot.name}${index}`" :name="slot.name">
                    </slot>
                </template>
            </div>
        </template>

        <section v-if="$slots?.detailedExplanations">
            <slot name="detailedExplanations"></slot>
        </section>

        <section v-if="!isEmpty(tipSections)" class="tips">
            <div v-for="(name, index) of tipSections" :key="`${name}-${index}`" class="tip">
                <slot :name="name"></slot>
            </div>
        </section>

        <section v-if="slots?.toSee" class="to-see-section">
            <h4>@see</h4>
            <slot name="toSee"></slot>
        </section>

        <section v-if="slots?.more" class="more-information-section">
            <slot name="more"></slot>
        </section>
    </article>
</template>

<style scoped>
.code-selection-nav,
.tips {
    padding: 1%;
}

.code-selection-nav {
    ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        padding: 0;
    }
}

.code,
.tip {
    margin: 7px auto;
    padding: 5px;
}
</style>