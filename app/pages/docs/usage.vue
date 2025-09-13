<script setup lang="ts">
import DefineAEppsStore from '~/components/gettingStarted/DefineAEppsStore.vue';
import UseAEppsStore from '~/components/gettingStarted/UseAEppsStore.vue';
import UsingDefineEppsStore from '~/components/gettingStarted/UsingDefineEppsStore.vue';
import Page from '~/components/common/Page.vue'

const { usage: definition } = usePagesDefinitions()
</script>

<template>
    <Suspense>
        <Page :definition>
            <p>
                The package is installed and the plugin configured.
                Now let's define our first EppsStore and use it in a component.
            </p>
            <UsingDefineEppsStore />
            <DefineAEppsStore />
            <UseAEppsStore />
        </Page>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>