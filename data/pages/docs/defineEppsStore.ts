import { defineEppsStore as defineEppsStoreComponent } from "~/utils/components/resumes"
import defineEppsStoreDefinition from "~/data/components/defineEppsStore"
import { defineEppsStore as defineEppsStorePath } from "../paths";


export const components = [defineEppsStoreComponent]

export const { description, id, title } = defineEppsStoreDefinition

export const path = defineEppsStorePath

export default {
    components,
    description,
    id,
    path,
    title
}