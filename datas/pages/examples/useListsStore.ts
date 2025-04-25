import { listsStoreCreation, useListsStore } from "~/utils/components/resumes";
import { id as useListsStoreId } from '~/datas/stores/useListsStore'
import { lists as listsPath } from "../paths"


export const components = [listsStoreCreation, useListsStore]

export const description = 'Create and use a lists store'

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