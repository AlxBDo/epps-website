import { createDefinition } from "~/utils/pages/createDefinition"
import { createPageResume } from "~/utils/create-resume"
import defineEppsStoreDefinition from "~/data/pages/docs/defineEppsStore"
import extendedStateDefinition from "~/data/pages/docs/extendedState"
import homeDefinition from "~/data/pages/home"
import installationDefinition from "~/data/pages/docs/installation"
import usageDefinition from "~/data/pages/docs/usage"
import useListsStoreDefinition from "~/data/pages/examples/useListsStore"
import useUserStoreDefinition from "~/data/pages/examples/useUserStore"

import type { PageResume, PagesResumes } from "~/types/pages"


export async function usePagesDefinitions() {

    const error = createPageResume({ components: [], description: 'Something is wrong', id: 'error', path: 'error', title: 'Oups!' })
    const home = createPageResume(homeDefinition)


    /**
     * --- DOCS ---
     */

    const install = createPageResume(installationDefinition)
    const usage = createPageResume(usageDefinition)

    // Funtions
    const createPlugin = await createDefinition('functions', 'createPlugin')
    const defineEppsStore = createPageResume(defineEppsStoreDefinition)
    const extendedState = createPageResume(extendedStateDefinition)
    const getParentStoreMethod = await createDefinition('functions', 'getParentStoreMethod')
    const getParentStorePropertyValue = await createDefinition('functions', 'getParentStorePropertyValue')

    // Stores
    const useCollectionStore = await createDefinition('stores', 'useCollectionStore')

    // Types
    const eppsStoreType = await createDefinition('types', 'eppsStore')
    const extendedStateInterface = await createDefinition('types', 'extendedState')
    const extendedStateOptions = await createDefinition('types', 'extendedStateOptions')
    const extendedStore = await createDefinition('types', 'extendedStore')
    const persistedState = await createDefinition('types', 'persistedState')
    const persistedStore = await createDefinition('types', 'persistedStore')


    /**
     * --- EXAMPLES ---
     */
    const lists = createPageResume(useListsStoreDefinition)
    const user = createPageResume(useUserStoreDefinition)


    const pages: PagesResumes = {
        home,

        docs: {
            install,
            usage,

            functions: {
                createPlugin,
                defineEppsStore,
                extendedState,
                getParentStoreMethod,
                getParentStorePropertyValue
            } as Record<string, PageResume>,

            types: {
                eppsStore: eppsStoreType,
                extendedState: extendedStateInterface,
                extendedStateOptions,
                extendedStore,
                persistedState,
                persistedStore
            } as Record<string, PageResume>,

            stores: {
                useCollectionStore
            } as Record<string, PageResume>
        },

        examples: { lists, user }
    }

    return {
        createPlugin,
        defineEppsStore,
        eppsStoreType,
        error,
        extendedState,
        extendedStateInterface,
        extendedStateOptions,
        extendedStore,
        getParentStoreMethod,
        getParentStorePropertyValue,
        home,
        install,
        lists,
        pages,
        persistedState,
        persistedStore,
        usage,
        useCollectionStore,
        useListsStoreDefinition,
        user
    }
}