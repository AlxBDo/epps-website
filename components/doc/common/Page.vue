<script setup lang="ts">
import { createDefinition } from '~/utils/pages/createDefinition'

import CodeDeclarationExplanation from './CodeDeclarationExplanation.vue'
import Page from '~/components/common/Page.vue'

import type { PageDefinitionTypes, PageResume } from '~/types/pages'
import type { FunctionPrototype, InterfacePrototype } from '~/types/components'


const pageProps = defineProps({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<PageDefinitionTypes>,
        required: true,
    },
})

const definition = await createDefinition(
    pageProps.type, pageProps.name
) as PageResume & (FunctionPrototype | InterfacePrototype)
</script>

<template>
    <Suspense>
        <template #default>
            <Page :definition>
                <CodeDeclarationExplanation :display-title="false" :prototype="definition" />
            </Page>
        </template>
        <template #fallback>
            <p>Loading definition...</p>
        </template>
    </Suspense>
</template>