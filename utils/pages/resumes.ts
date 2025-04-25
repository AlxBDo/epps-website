import { createPageResume } from "~/utils/create-resume"
import type { PageResume, PagesResumes } from "~/types/pages"

import defineEppsStoreDefinition from "~/datas/pages/docs/defineEppsStore"
import extendedStateDefinition from "~/datas/pages/docs/extendedState"
import homeDefinition from "~/datas/pages/home"
import installationDefinition from "~/datas/pages/docs/installation"
import useListsStoreDefinition from "~/datas/pages/examples/useListsStore"
import useUserStoreDefinition from "~/datas/pages/examples/useUserStore"
import { createDefinition } from "./createDefinition"

export const error = createPageResume({ components: [], description: 'Something is wrong', id: 'error', path: 'error', title: 'Oups!' })
export const home = createPageResume(homeDefinition)


/**
 * --- DOCS ---
 */

export const install = createPageResume(installationDefinition)

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