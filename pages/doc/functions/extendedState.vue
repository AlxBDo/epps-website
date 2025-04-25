<script setup lang="ts">
import ExtendedState from '~/components/doc/functions/ExtendedState.vue';
import Page from '~/components/shared/Page.vue';

import { extendedState as definition } from '~/utils/pages/resumes'
</script>

<template>
    <Page :definition :display-title="false">
        <ExtendedState />
    </Page>
</template>