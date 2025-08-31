export default defineNuxtPlugin(nuxtApp => {
    const MAX_RETRIES = 2;
    const QUERY_PARAM_NAME = 'nuxt_reload_attempt'

    nuxtApp.hook('app:chunkError', () => {
        const searchParams = new URLSearchParams(window.location.search);
        const currentRetry = Number(searchParams.get(QUERY_PARAM_NAME)) || 0

        if (currentRetry < MAX_RETRIES) {
            searchParams.set(QUERY_PARAM_NAME, (currentRetry + 1).toString())
            window.location.search = searchParams.toString()
        }
    })
})