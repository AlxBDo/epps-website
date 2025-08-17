import { createDefinition } from "~/utils/pages/createDefinition"
import { createPageResume } from "~/utils/create-resume"
import { firstCharToLowerCase } from "~/utils/string"

import collectionStateDefinition from "~/data/types/collectionState"
import collectionStoreDefinition from "~/data/types/collectionStore"
import createPluginDefinition from "~/data/functions/createPlugin"
import defineEppsStoreDefinition from "~/data/pages/docs/defineEppsStore"
import eppsDefinition from "~/data/class/epps"
import eppsStoreDefinition from "~/data/types/eppsStore"
import eppsStoreOptionsDefinition from "~/data/types/eppsStoreOptions"
import errorDefinition from "~/data/types/error"
import errorsStateDefinition from "~/data/types/errorsState"
import errorsStoreDefinition from "~/data/types/errorsStore"
import extendedStateInterfaceDefinition from "~/data/types/extendedState"
import extendedStoreDefinition from "~/data/types/extendedStore"
import homeDefinition from "~/data/pages/home"
import installationDefinition from "~/data/pages/docs/installation"
import parentStoreDefinition from "~/data/class/parentStore"
import persistedStateDefinition from "~/data/types/persistedState"
import persistedStoreDefinition from "~/data/types/persistedStore"
import resourceIdDefinition from '~/data/types/resourceId'
import testingStoresDefinition from "~/data/pages/docs/testing"
import usageDefinition from "~/data/pages/docs/usage"
import useCollectionStoreDefinition from "~/data/stores/useCollectionStore"
import useErrorsStoreDefinition from "~/data/stores/useErrorsStore"
import useListsStoreDefinition from "~/data/pages/examples/useListsStore"
import useResourceIdStoreDefinition from '~/data/stores/useResourceIdStore'
import useUserStoreDefinition from "~/data/pages/examples/useUserStore"
import useWebUserStoreDefinition from "~/data/stores/useWebUserStore"
import webUserStateDefinition from "~/data/types/webUserState"
import webUserStoreDefinition from "~/data/types/webUserStore"

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

    // Class
    const epps = createDefinition('class', eppsDefinition)
    const parentStore = createDefinition('class', parentStoreDefinition)

    // Funtions
    const createPlugin = createDefinition('functions', createPluginDefinition)
    const defineEppsStore = createPageResume(defineEppsStoreDefinition)

    // Stores
    const useCollectionStore = createDefinition('stores', useCollectionStoreDefinition)
    const useErrorsStore = createDefinition('stores', useErrorsStoreDefinition)
    const useResourceIdStore = createDefinition('stores', useResourceIdStoreDefinition)
    const useWebUserStore = createDefinition('stores', useWebUserStoreDefinition)

    // Types
    const collectionState = createDefinition('types', collectionStateDefinition)
    const collectionStore = createDefinition('types', collectionStoreDefinition)
    const eppsStoreType = createDefinition('types', eppsStoreDefinition)
    const eppsStoreOptions = createDefinition('types', eppsStoreOptionsDefinition)
    const errorInterface = createDefinition('types', errorDefinition)
    const errorsState = createDefinition('types', errorsStateDefinition)
    const errorsStore = createDefinition('types', errorsStoreDefinition)
    const extendedStateInterface = createDefinition('types', extendedStateInterfaceDefinition)
    const extendedStore = createDefinition('types', extendedStoreDefinition)
    const persistedState = createDefinition('types', persistedStateDefinition)
    const persistedStore = createDefinition('types', persistedStoreDefinition)
    const resourceId = createDefinition('types', resourceIdDefinition)
    const webUserState = createDefinition('types', webUserStateDefinition)
    const webUserStore = createDefinition('types', webUserStoreDefinition)


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

            class: {
                epps,
                parentStore
            } as Record<string, PageResume>,

            functions: {
                createPlugin,
                defineEppsStore,
            } as Record<string, PageResume>,

            stores: {
                useCollectionStore,
                useErrorsStore,
                useResourceIdStore,
                useWebUserStore
            } as Record<string, PageResume>,

            types: {
                collectionState,
                collectionStore,
                eppsStore: eppsStoreType,
                eppsStoreOptions,
                error: errorInterface,
                errorsState,
                errorsStore,
                extendedState: extendedStateInterface,
                extendedStore,
                persistedState,
                persistedStore,
                resourceId,
                webUserState,
                webUserStore
            } as Record<string, PageResume>,

            testing
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
        eppsStoreOptions,
        error,
        extendedStateInterface,
        extendedStore,
        getPageDefinition,
        home,
        install,
        lists,
        pages,
        persistedState,
        persistedStore,
        resourceId,
        testing,
        usage,
        useCollectionStore,
        useListsStoreDefinition,
        user,
        webUserState,
        webUserStore
    }
}