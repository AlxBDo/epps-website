<script setup lang="ts">
import { installPlugin } from '~/utils/components/resumes'

import CodeBlock from '../dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'


const { id, title } = installPlugin
</script>

<template>
    <ExplanationContainer :id :codeSections="['npm', 'pnpm', 'yarn']" :title>
        <template #explanation>
            <p>Install the dependency with your favorite package manager:</p>
        </template>
        <template #npm>
            <CodeBlock code="npm install epps" lang="sh" />
        </template>
        <template #pnpm>
            <CodeBlock code="pnpm add epps" lang="sh" />
        </template>
        <template #yarn>
            <CodeBlock code="yarn add epps" lang="sh" />
        </template>
    </ExplanationContainer>
</template>