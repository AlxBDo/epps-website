<script setup lang="ts">
import Page from '~/components/shared/Page.vue'
import { home as definition } from '~/utils/pages/resumes'

const appName = useRuntimeConfig().public.appName
</script>

<template>
    <Page :definition :display-title="false">
        <div>
            <p>
                {{ appName }} is a Pinia plugin. Is an acronym for "Extends and Perist Pinia Store".
            </p>

            <p>
                By using it, you can create more powerful and flexible Pinia stores while
                simplifying state and action management in your Vue.js or Nuxt application, and ensuring the security
                of your persisted data.
            </p>
        </div>


        <div>
            <h2>Store Extension</h2>
            <p>
                The plugin allows you to extend existing stores by adding additional actions and states.
                This facilitates code reuse and dependency management between stores.
            </p>
        </div>

        <div>
            <h2>State Persistence and Encryption</h2>
            <p>
                The plugin provides persistence and encryption for state properties in the browser.
                This functionality ensures that critical data stored in the browser is secure.
                However, the data remains readable within the store as it is decrypted when retrieved
                from LocalStorage or IndexedDB.
            </p>
        </div>
    </Page>
</template>