import { createPlugin } from "epps"
import type { Pinia } from "pinia"


export default defineNuxtPlugin({
    name: 'eppsPlugin',
    async setup() {
        const { $pinia }: { $pinia: Pinia } = useNuxtApp()

        $pinia.use(
            createPlugin(
                'localStorage',
                useRuntimeConfig().public.cryptIv as string
            ))
    }
})
