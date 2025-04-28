import { createDefinition } from "./createDefinition"
import { createPageResume } from "~/utils/create-resume"
import type { PageResume, PagesResumes } from "~/types/pages"

import defineEppsStoreDefinition from "~/data/pages/docs/defineEppsStore"
import extendedStateDefinition from "~/data/pages/docs/extendedState"
import homeDefinition from "~/data/pages/home"
import installationDefinition from "~/data/pages/docs/installation"
import usageDefinition from "~/data/pages/docs/usage"
import useListsStoreDefinition from "~/data/pages/examples/useListsStore"
import useUserStoreDefinition from "~/data/pages/examples/useUserStore"

export const error = createPageResume({ components: [], description: 'Something is wrong', id: 'error', path: 'error', title: 'Oups!' })
export const home = createPageResume(homeDefinition)


/**
 * --- DOCS ---
 */

export const install = createPageResume(installationDefinition)
export const usage = createPageResume(usageDefinition)

// Funtions
export const createPlugin = await createDefinition('functions', 'createPlugin')
export const defineEppsStore = createPageResume(defineEppsStoreDefinition)
export const extendedState = createPageResume(extendedStateDefinition)

// Types
export const eppsStoreType = await createDefinition('types', 'eppsStore')
export const extendedStateInterface = await createDefinition('types', 'extendedState')
export const extendedStateOptions = await createDefinition('types', 'extendedStateOptions')
export const extendedStore = await createDefinition('types', 'extendedStore')
export const persistedState = await createDefinition('types', 'persistedState')
export const persistedStore = await createDefinition('types', 'persistedStore')


/**
 * --- EXAMPLES ---
 */
export const lists = createPageResume(useListsStoreDefinition)
export const user = createPageResume(useUserStoreDefinition)


export const pages: PagesResumes = {
    home,

    doc: {
        install,
        usage,

        functions: {
            createPlugin,
            defineEppsStore,
            extendedState
        } as Record<string, PageResume>,

        types: {
            eppsStore: eppsStoreType,
            extendedState: extendedStateInterface,
            extendedStateOptions,
            extendedStore,
            persistedState,
            persistedStore
        } as Record<string, PageResume>
    },

    examples: { lists, user }
}