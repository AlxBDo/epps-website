<script setup lang="ts">
import ExtendedState from '~/components/docs/functions/ExtendedState.vue';
import Page from '~/components/common/Page.vue';

import { extendedState as definition } from '~/utils/pages/resumes'
</script>

<template>
    <Page :definition :display-title="false">
        <ExtendedState />
    </Page>
</template>