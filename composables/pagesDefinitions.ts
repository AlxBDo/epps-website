import { createDefinition } from "~/utils/pages/createDefinition"
import { createPageResume } from "~/utils/create-resume"
import { firstCharToLowerCase } from "~/utils/string"

import createPluginDefinition from "~/data/functions/createPlugin"
import defineEppsStoreDefinition from "~/data/pages/docs/defineEppsStore"
import eppsStoreDefinition from "~/data/types/eppsStore"
import extendedStateDefinition from "~/data/pages/docs/extendedState"
import extendedStateInterfaceDefinition from "~/data/types/extendedState"
import extendedStateOptionsDefinition from "~/data/types/extendedStateOptions"
import extendedStoreDefinition from "~/data/types/extendedStore"
import getParentStoreMethodDefinition from "~/data/functions/getParentStoreMethod"
import getParentStorePropertyValueDefinition from "~/data/functions/getParentStorePropertyValue"
import homeDefinition from "~/data/pages/home"
import installationDefinition from "~/data/pages/docs/installation"
import persistedStateDefinition from "~/data/types/persistedState"
import persistedStoreDefinition from "~/data/types/persistedStore"
import resourceIdDefinition from '~/data/types/resourceId'
import testingStoresDefinition from "~/data/pages/docs/testing"
import usageDefinition from "~/data/pages/docs/usage"
import useCollectionStoreDefinition from "~/data/stores/useCollectionStore"
import useListsStoreDefinition from "~/data/pages/examples/useListsStore"
import useResourceIdStoreDefinition from '~/data/stores/useResourceIdStore'
import useUserStoreDefinition from "~/data/pages/examples/useUserStore"
import useWebUserStoreDefinition from "~/data/stores/useWebUserStore"

import type { AnyObject } from "epps"
import type { PageDefinitionTypes, PageResume, PagesResumes } from "~/types/pages"


export function usePagesDefinitions() {

    const error = createPageResume({ components: [], description: 'Something is wrong', id: 'error', path: 'error', title: 'Oups!' })
    const home = createPageResume(homeDefinition)


    /**
     * --- DOCS ---
     */

    const install = createPageResume(installationDefinition)
    const testing = createPageResume(testingStoresDefinition)
    const usage = createPageResume(usageDefinition)

    // Funtions
    const createPlugin = createDefinition('functions', createPluginDefinition)
    const defineEppsStore = createPageResume(defineEppsStoreDefinition)
    const extendedState = createPageResume(extendedStateDefinition)
    const getParentStoreMethod = createDefinition('functions', getParentStoreMethodDefinition)
    const getParentStorePropertyValue = createDefinition('functions', getParentStorePropertyValueDefinition)

    // Stores
    const useCollectionStore = createDefinition('stores', useCollectionStoreDefinition)
    const useResourceIdStore = createDefinition('stores', useResourceIdStoreDefinition)
    const useWebUserStore = createDefinition('stores', useWebUserStoreDefinition)

    // Types
    const eppsStoreType = createDefinition('types', eppsStoreDefinition)
    const extendedStateInterface = createDefinition('types', extendedStateInterfaceDefinition)
    const extendedStateOptions = createDefinition('types', extendedStateOptionsDefinition)
    const extendedStore = createDefinition('types', extendedStoreDefinition)
    const persistedState = createDefinition('types', persistedStateDefinition)
    const persistedStore = createDefinition('types', persistedStoreDefinition)
    const resourceId = createDefinition('types', resourceIdDefinition)


    /**
     * --- EXAMPLES ---
     */
    const lists = createPageResume(useListsStoreDefinition)
    const user = createPageResume(useUserStoreDefinition)

    /**
     * Utils
     */
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
                persistedStore,
                resourceId
            } as Record<string, PageResume>,

            testing,

            stores: {
                useCollectionStore,
                useResourceIdStore,
                useWebUserStore
            } as Record<string, PageResume>
        },

        examples: { lists, user }
    }

    function getPageDefinition(definitionType: PageDefinitionTypes, definitionName: string) {
        try {
            const pagesGroups: AnyObject = (pages.docs as AnyObject)[definitionType]

            if (!pagesGroups) return

            return pagesGroups[firstCharToLowerCase(definitionName)] as PageResume
        } catch (e) {
            logError('pages/createDefinition', e)
        }
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
        getPageDefinition,
        getParentStoreMethod,
        getParentStorePropertyValue,
        home,
        install,
        lists,
        pages,
        persistedState,
        persistedStore,
        testing,
        usage,
        useCollectionStore,
        useListsStoreDefinition,
        user
    }
}