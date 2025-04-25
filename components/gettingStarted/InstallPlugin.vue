<script setup lang="ts">
import { installPlugin } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/shared/ExplanationContainer.vue'


const { id, title } = installPlugin
</script>

<template>
    <ExplanationContainer :id :codeSections="['npm', 'yarn']" :title>
        <template #explanation>
            <p>To install the plugin, you can use npm or yarn:</p>
        </template>
        <template #npm>
            <p>npm install epps</p>
        </template>
        <template #yarn>
            <p>yarn add epps</p>
        </template>
    </ExplanationContainer>
</template>