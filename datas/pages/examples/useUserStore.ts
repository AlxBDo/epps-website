import { id as useUserStoreId } from '~/datas/stores/useUserStore'
import { user } from "../paths"
import { userStoreCreation, useUserStore } from "~/utils/components/resumes";


export const components = [userStoreCreation, useUserStore]

export const description = 'Create and use a user store'

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