<script setup lang="ts">
import ExtendedState from '~/components/docs/functions/ExtendedState.vue';
import Page from '~/components/common/Page.vue';

const { extendedState: definition } = usePagesDefinitions()
</script>

<template>
    <Suspense>
        <Page :definition :display-title="false">
            <ExtendedState />
        </Page>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>