<script setup lang="ts">
import ExtendedState from '~/components/docs/functions/ExtendedState.vue';
import Page from '~/components/common/Page.vue';

const { extendedState: definition } = await usePagesDefinitions()
</script>

<template>
    <Page :definition :display-title="false">
        <ExtendedState />
    </Page>
</template>