<script setup lang="ts">
import { home as definition, install, usage } from '~/utils/pages/resumes'

import Page from '~/components/common/Page.vue'

const appName = useRuntimeConfig().public.appName
</script>

<template>
    <Page :definition :display-title="false">
        <div>
            <h2>What is it ?</h2>
            <p>
                <b>{{ appName }} is</b> an acronym for <b>"Extends and Perist Pinia Store"</b>.
                It's a plugin designed for <b>Pinia</b>, the state management library for <b>Vue.js</b>
                and <b>Nuxt.js</b>.
            </p>

            <p>
                It offers two core functionalities: <b>Store Extension</b> and <b>State Persistence</b>, making
                your state management more efficient and flexible.
            </p>

            <div class="flex justify-between align-top mt-6 ">
                <article class="w-1/2 px-6">
                    <h3>Store Extension</h3>
                    <ul>
                        <li>
                            <span>Inheritance-Based Design:</span> Child stores automatically inherit all methods and
                            state from their parent stores.
                        </li>
                        <li>
                            <span>Method Extension:</span> Easily extend parent methods in child stores, ensuring
                            that parent methods are executed after the child methods.
                        </li>
                    </ul>
                </article>

                <article class="w-1/2 px-6">
                    <h3>State Persistence</h3>
                    <ul>
                        <li>
                            <span>Flexible Storage Options:</span> Choose between localStorage and IndexedDB to persist
                            your store's state.
                        </li>
                        <li>
                            <span>Selective Persistence:</span> Exclude specific properties from being persisted.
                        </li>
                        <li>
                            <span>Data Encryption:</span> Encrypt sensitive properties to ensure data security.
                        </li>
                    </ul>
                </article>
            </div>
        </div>

        <div class="flex justify-between items-center max-w-80 m-auto mt-8">
            <UButton class="font-bold rounded-full" color="warning" icon="mdi:console-line" size="xl" :to="install.path"
                variant="outline">
                Getting started
            </UButton>
            <UButton class="font-bold rounded-full" icon="mdi:code" size="lg" :to="usage.path">
                {{ usage.title }}
            </UButton>
        </div>
    </Page>
</template>

<style scoped>
h2 {
    color: var(--color-yellow-500);
}

h3 {
    color: var(--color-yellow-500);
    margin-top: 0;
}

li {
    font-size: small;
    margin-bottom: 10px;

    span {
        font-weight: bold;
    }
}
</style>