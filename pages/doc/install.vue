<script setup lang="ts">
import { install as definition } from '~/utils/pages/resumes'

import ConfigurePlugin from '~/components/gettingStarted/ConfigurePlugin.vue'
import InstallPlugin from '~/components/gettingStarted/InstallPlugin.vue'
import Page from '~/components/common/Page.vue'
</script>

<template>
    <Page :definition>
        <InstallPlugin />
        <ConfigurePlugin />
    </Page>
</template>