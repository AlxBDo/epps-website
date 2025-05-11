import { createResume } from "../create-resume"

import configurePluginDefinition from "~/data/components/configurePlugin"
import defineAEppsStoreDefinition from "~/data/components/defineAEppsStore"
import defineEppsStoreDefinition from "~/data/components/defineEppsStore"
import extendedStateDefinition from "~/data/components/extendedState"
import installPluginDefinition from "~/data/components/installPlugin"
import listsStoreCreationDefinition from "~/data/components/listsStoreCreation"
import useAEppsStoreDefinition from "~/data/components/useAEppsStore"
import useListsStoreDefinition from "~/data/components/useListsStore"
import userStoreCreationDefinition from "~/data/components/userStoreCreation"
import useUserStoreDefinition from "~/data/components/useUserStore"


export const configurePlugin = createResume(configurePluginDefinition)
export const defineAEppsStore = createResume(defineAEppsStoreDefinition)
export const defineEppsStore = createResume(defineEppsStoreDefinition)
export const extendedState = createResume(extendedStateDefinition)
export const installPlugin = createResume(installPluginDefinition)
export const listsStoreCreation = createResume(listsStoreCreationDefinition)
export const useAEppsStore = createResume(useAEppsStoreDefinition)
export const useListsStore = createResume(useListsStoreDefinition)
export const userStoreCreation = createResume(userStoreCreationDefinition)
export const useUserStore = createResume(useUserStoreDefinition)