<script setup lang="ts">
import DefineEppsStore from '~/components/docs/functions/DefineEppsStore.vue';
import Page from '~/components/common/Page.vue';

const { defineEppsStore: definition } = usePagesDefinitions()
</script>

<template>
    <Suspense>
        <Page :definition :display-title="false">
            <DefineEppsStore />
        </Page>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>