import type { ComponentResume } from "~/types/components"

export const id = 'configure-plugin'
export const title = 'Configure Epps'
export const description = 'Configure Epps plugin'

const definition: ComponentResume = { description, id, title }

export const nuxtDeclaration = `// ./plugins/epps.client.ts 
import type { Pinia, PiniaPlugin, PiniaPluginContext } from "pinia" 
import { createPlugin } from 'epps' 

export default defineNuxtPlugin({
    name: 'eppsPlugin', 
    async setup({ $pinia }) {
        ($pinia as Pinia).use(
            createPlugin(
                'localStorage', // define another database name to use IndexedDB 
                useRuntimeConfig().public.cryptIv, 
                useRuntimeConfig().public.cryptKey 
            )
        )
    }
})`

export const vueDeclaration = `// ./main.ts
import { createPinia } from 'pinia' 
import { createPlugin } from 'epps' 

const pinia = createPinia()

const epps = createPlugin(
    'localStorage', // define another database name to use IndexedDB 
    import.meta.env.VITE_CRYPT_IV, 
    import.meta.env.VITE_CRYPT_KEY
) 

pinia.use(epps)`

export default definition