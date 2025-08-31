<script setup lang="ts">
import type { PropType } from 'vue'
import { useSlots } from 'vue'
import { icons } from '~/utils/icons'

type AlertColors = DependencyAlertTypes | 'neutral' | 'primary' | 'secondary'
type AlertTypes = DependencyAlertTypes | 'tip'
type DependencyAlertTypes = 'error' | 'info' | 'success' | 'warning'

const props = defineProps({
    color: { type: String as PropType<AlertColors>, default: undefined },
    description: { type: String, default: undefined },
    icon: { type: [String, Boolean], default: true },
    title: { type: String, default: undefined },
    type: { type: String as PropType<AlertTypes>, default: 'info' },
})

const alertColor = props.color ?? (props.type === 'tip' ? 'secondary' : props.type)
const alertIcon = props.icon ? (typeof props.icon === 'string' ? props.icon : icons[props.type]) : undefined

const slots = useSlots()
</script>

<template>
    <UAlert :color="alertColor" :description :avatar="{ icon: alertIcon }" :title>
        <template v-if="!title && slots.title" #title>
            <slot name="title"></slot>
        </template>

        <template v-if="!description && slots.description" #description>
            <slot name="description"></slot>
        </template>
    </UAlert>
</template>