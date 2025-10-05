import { listsStoreCreation, useListsStore } from "~/utils/components/resumes";
import { id as useListsStoreId } from '~/data/stores/useListsStore'
import { lists as listsPath } from "../paths"


export const components = [listsStoreCreation, useListsStore]

export const description = 'Extend a store, rename its state properties and actions, and create action flows.'

export const id = useListsStoreId

export const path = listsPath

export const title = 'Lists Store'

export default {
    components,
    description,
    id,
    path,
    title
}