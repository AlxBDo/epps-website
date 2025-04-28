<script setup lang="ts">
import { usage as definition } from '~/utils/pages/resumes'

import DefineAEppsStore from '~/components/gettingStarted/DefineAEppsStore.vue';
import UseAEppsStore from '~/components/gettingStarted/UseAEppsStore.vue';
import Page from '~/components/common/Page.vue'
</script>

<template>
    <Page :definition>
        <p>
            The package is installed and the plugin configured.
            Now let's define our first EppsStore and use it in a component.
        </p>
        <DefineAEppsStore />
        <UseAEppsStore />
    </Page>
</template>