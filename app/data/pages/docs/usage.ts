import { defineAEppsStore, useAEppsStore, usingDefineEppsStore } from "~/utils/components/resumes";
import { usage as usagePath } from "../paths"


export const components = [usingDefineEppsStore, defineAEppsStore, useAEppsStore]

export const description = 'Define an EppsStore and use it in a component'

export const id = 'usage'

export const path = usagePath

export const title = 'Usage'

export default {
    components,
    description,
    id,
    path,
    title
}