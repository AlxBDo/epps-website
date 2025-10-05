import { id as useUserStoreId } from '~/data/stores/useUserStore'
import { user } from "../paths"
import { userStoreCreation, useUserStore } from "~/utils/components/resumes";


export const components = [userStoreCreation, useUserStore]

export const description = 'Extend multiple stores, extend a parent store action, persist the state and all its modifications, and define properties to encrypt.'

export const id = useUserStoreId

export const path = user

export const title = 'User Store'

export default {
    components,
    description,
    id,
    path,
    title
}