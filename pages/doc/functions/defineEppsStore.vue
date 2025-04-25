<script setup lang="ts">
import DefineEppsStore from '~/components/doc/functions/DefineEppsStore.vue';
import Page from '~/components/shared/Page.vue';

import { defineEppsStore as definition } from '~/utils/pages/resumes'
</script>

<template>
    <Page :definition :display-title="false">
        <DefineEppsStore />
    </Page>
</template>