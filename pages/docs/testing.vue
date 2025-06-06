<script setup lang="ts">
import CodeBlock from '~/components/dependencies/CodeBlock.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';
import Page from '~/components/common/Page.vue'
import testing from '~/data/pages/docs/testing';

const { testing: definition } = usePagesDefinitions()

const code = `import { beforeEach } from "vitest";
import { createApp } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { createPluginMock } from "epps";

export function beforeEachPiniaPlugin() {
    beforeEach(() => {
        const app = createApp({});

        // Create a Pinia instance with the mocked epps plugin
        const pinia = createPinia().use(
            createPluginMock(
                'localStorage', // Mock database name
                'Replace_with_your_IV_string', // Mock encryption IV
                'Replace_with_your_KEY_string' // Mock encryption key
            )
        );

        app.use(pinia);
        setActivePinia(pinia); // Set the active Pinia instance for testing
    });
}`
</script>

<template>
    <Page :definition>
        <ExplanationContainer :code-sections="['js']" :id="`${testing.id}-explanation-ctn`">
            <template #explanation>
                <p>
                    To test Pinia stores using <b>epps</b>, you need to use the createPluginMock function.
                    This function provides a mock implementation of epps plugin, allowing you to simulate its
                    behavior during testing.
                </p>
                <p>
                    It creates a mock persistence layer and optionally supports encryption using the provided
                    initialization vector (IV) and encryption key. By integrating this mock plugin into your
                    Pinia instance, you can test your stores without relying on actual browser storage or encryption
                    mechanisms.
                </p>
                <p>
                    Here is an example of how to use createPluginMock in a beforeEach setup function:
                </p>
            </template>

            <template #js>
                <CodeBlock :code lang="javascript" />
            </template>
        </ExplanationContainer>
    </Page>
</template>