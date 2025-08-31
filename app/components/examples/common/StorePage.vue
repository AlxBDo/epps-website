<script lang="ts" setup>
import { usePageProps } from '~/composables/componentsProps/pageProps'

import Page from '~/components/common/Page.vue'
import type { PageResume } from '~/types/pages';
import type { TabsItem } from '@nuxt/ui';

defineProps({
    ...usePageProps()
})

const items = ref<TabsItem[]>([
    {
        label: 'Explanation',
        slot: 'explanation' as const
    },
    {
        label: 'Demo',
        slot: 'demo' as const
    }
])

</script>

<template>
    <Page :definition="(definition as PageResume)">
        <slot name="pageExplanation"></slot>
        <UTabs color="neutral" :items variant="link">
            <template #explanation>
                <section id="explanation">
                    <slot name="storeExplanation"></slot>
                </section>
            </template>
            <template #demo>
                <section id="demo">
                    <slot name="demo"></slot>
                </section>
            </template>
        </UTabs>
    </Page>
</template>