<script setup lang="ts">
import { configurePlugin } from '~/utils/components/resumes'
import { nuxtDeclaration, vueDeclaration } from '~/data/components/configurePlugin'

import CodeBlock from '../dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'
import Links from '../common/Links.vue'


const { id, title } = configurePlugin
</script>

<template>
    <ExplanationContainer :id :codeSections="['vue', 'nuxt']" :title>
        <template #explanation>
            <p>To use the plugin, simply import it and add it to your Pinia instance.</p>
            <p>All createPlugin function parameters are optional.</p>
            <p class="text-sm mt-2">
                In the examples below, the environment variable CRYPT_KEY must be replaced with string.
                It's used for encrypting data persisted in the browser.
            </p>
        </template>
        <template #vue>
            <CodeBlock :code="vueDeclaration" lang="typeScript" />
        </template>
        <template #nuxt>
            <CodeBlock :code="nuxtDeclaration" lang="typeScript" />
        </template>

        <template #toSee>
            <Links :links="{ createPlugin: '/docs/functions/createPlugin' }" />
        </template>
    </ExplanationContainer>
</template>