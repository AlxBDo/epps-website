<script setup lang="ts">
import CodeDeclarationExplanation from './CodeDeclarationExplanation.vue'
import Page from '~/components/common/Page.vue'
import StorePrototype from './StorePrototype.vue'

import type { PageDefinitionTypes, PageResume } from '~/types/pages'
import type { FunctionPrototype, InterfacePrototype, StorePrototype as StorePrototypeInterface } from '~/types/components'


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

const { createDynamicDefinition } = usePagesDefinitions()

const definition = await createDynamicDefinition(
    pageProps.type, pageProps.name
) as PageResume & (FunctionPrototype | InterfacePrototype | StorePrototypeInterface)
</script>

<template>
    <Suspense>
        <template #default>
            <Page :definition>
                <StorePrototype v-if="type === 'stores'" :prototype="(definition as StorePrototypeInterface)">
                </StorePrototype>
                <CodeDeclarationExplanation v-else :display-title="false"
                    :prototype="(definition as FunctionPrototype | InterfacePrototype)" />
            </Page>
        </template>
        <template #fallback>
            <p>Loading definition...</p>
        </template>
    </Suspense>
</template>