<script setup lang="ts">
defineProps({
    cancelBtn: { type: [Boolean, String], default: false },
    submitBtn: { type: [Boolean, String], default: false },
    title: { type: String }
})
</script>

<template>
    <form @submit.prevent="$emit('onSubmit')">
        <slot name="title">
            <h4 v-if="title">{{ title }}</h4>
        </slot>

        <slot name="inputs"></slot>

        <slot name="actions">
            <div v-if="cancelBtn || submitBtn">
                <UButton v-if="cancelBtn" class="cursor-pointer" color="neutral" variant="outline"
                    @click="$emit('onCancel')">
                    {{ cancelBtn }}
                </UButton>
                <UButton v-if="submitBtn" class="cursor-pointer" variant="outline" @click="$emit('onSubmit')">
                    {{ submitBtn }}
                </UButton>
            </div>
        </slot>
    </form>
</template>