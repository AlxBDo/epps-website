<script setup lang="ts">
import { configurePlugin } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/shared/ExplanationContainer.vue'
import Links from '../shared/Links.vue'


const { id, title } = configurePlugin
</script>

<template>
    <ExplanationContainer :id :codeSections="['vue', 'nuxt']" :title>
        <template #explanation>
            <p>To use the plugin, simply import it and add it to your Pinia instance.</p>
        </template>
        <template #vue>
            <div>
                // ./main.ts <br />
                import { createPinia } from 'pinia' <br />
                import { createPlugin } from 'epps' <br /><br />

                const pinia = createPinia()<br /><br />

                const epps = createPlugin(
                <div>
                    'localStorage', <br />
                    import.meta.env.VITE_CRYPT_IV, <br />
                    import.meta.env.VITE_CRYPT_KEY
                </div>
                ) <br /><br />

                pinia.use(epps)
            </div>
        </template>
        <template #nuxt>
            <div>
                // ./plugins/epps.client.ts <br />
                import type { Pinia, PiniaPlugin, PiniaPluginContext } from "pinia" <br />
                import { createPlugin } from 'epps' <br /><br />

                export default defineNuxtPlugin({
                <div>
                    name: 'eppsPlugin', <br />
                    async setup({ $pinia }) {
                    <div>
                        ($pinia as Pinia).use(
                        <div>
                            createPlugin(
                            <div>
                                'localStorage', // define another database name to use IndexedDB <br />
                                useRuntimeConfig().public.cryptIv, <br />
                                useRuntimeConfig().public.cryptKey <br />
                            </div>
                            )
                        </div>
                        )
                    </div>
                    }
                </div>
                })
            </div>
        </template>

        <template #toSee>
            <Links :links="{ createPlugin: '/doc/functions/createPlugin' }" />
        </template>
    </ExplanationContainer>
</template>