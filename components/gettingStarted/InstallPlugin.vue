<script setup lang="ts">
import { installPlugin } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/common/ExplanationContainer.vue'


const { id, title } = installPlugin
</script>

<template>
    <ExplanationContainer :id :codeSections="['npm', 'pnpm', 'yarn']" :title>
        <template #explanation>
            <p>Install the dependency with your favorite package manager:</p>
        </template>
        <template #npm>
            <p>npm install epps</p>
        </template>
        <template #pnpm>
            <p>pnpm add epps</p>
        </template>
        <template #yarn>
            <p>yarn add epps</p>
        </template>
    </ExplanationContainer>
</template>