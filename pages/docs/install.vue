<script setup lang="ts">
import ConfigurePlugin from '~/components/gettingStarted/ConfigurePlugin.vue'
import InstallPlugin from '~/components/gettingStarted/InstallPlugin.vue'
import Page from '~/components/common/Page.vue'


const { install: definition, usage } = usePagesDefinitions()
</script>

<template>
    <Suspense>
        <Page :definition>
            <InstallPlugin />
            <ConfigurePlugin />
            <div class="w-full text-right">
                <UButton class="font-bold rounded-full" icon="mdi:code" :to="`/${usage.path}`">
                    {{ usage.title }}
                </UButton>
            </div>
        </Page>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>