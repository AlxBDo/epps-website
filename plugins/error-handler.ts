export default defineNuxtPlugin(nuxtApp => {
    const MAX_RETRIES = 2;
    const QUERY_PARAM_NAME = 'nuxt_reload_attempt'

    // Handle "Failed to fetch dynamically imported module ..." or similar issues
    nuxtApp.hook('app:chunkError', () => {
        const searchParams = new URLSearchParams(window.location.search);
        const currentRetry = Number(searchParams.get(QUERY_PARAM_NAME)) || 0
        if (currentRetry < MAX_RETRIES) {
            searchParams.set(QUERY_PARAM_NAME, (currentRetry + 1).toString())
            // Changing the search also causes a refresh
            window.location.search = searchParams.toString()
        }
    })
})