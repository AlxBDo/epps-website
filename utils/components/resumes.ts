import { createResume } from "../create-resume"

import configurePluginDefinition from "~/datas/components/configurePlugin"
import defineEppsStoreDefinition from "~/datas/components/defineEppsStore"
import extendedStateDefinition from "~/datas/components/extendedState"
import installPluginDefinition from "~/datas/components/installPlugin"
import listsStoreCreationDefinition from "~/datas/components/listsStoreCreation"
import useListsStoreDefinition from "~/datas/components/useListsStore"
import userStoreCreationDefinition from "~/datas/components/userStoreCreation"
import useUserStoreDefinition from "~/datas/components/useListsStore"


export const configurePlugin = createResume(configurePluginDefinition)
export const defineEppsStore = createResume(defineEppsStoreDefinition)
export const extendedState = createResume(extendedStateDefinition)
export const installPlugin = createResume(installPluginDefinition)
export const listsStoreCreation = createResume(listsStoreCreationDefinition)
export const useListsStore = createResume(useListsStoreDefinition)
export const userStoreCreation = createResume(userStoreCreationDefinition)
export const useUserStore = createResume(useUserStoreDefinition)