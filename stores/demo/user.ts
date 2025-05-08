import { computed, ref } from "vue"
import { defineEppsStore, extendedState, getParentStorePropertyValue, type ExtendState } from "epps"

import { useContactStore } from "./contact"

import type { Contact } from "../../models/contact"
import type { List } from "../../models/liste"
import type { User } from "../../models/user"


export interface UserStore {
    isPassword: (password: string) => boolean
    modifyPassword: (oldPassword: string, newPassword: string) => void
    setData: (data: UserState) => void
    user: User
}

export type UserState = ExtendState<Contact, User>

export const useUserStore = (id?: string) => defineEppsStore<UserStore, UserState>(
    id ?? 'contact',
    () => {
        const lists = ref<List[]>()
        const password = ref<string>()

        const {
            excludedKeys,
            actionsToExtends,
            parentsStores,
            persist,
            persistedPropertiesToEncrypt
        } = extendedState(
            [useContactStore(id ? `${id}-contact` : 'user-contact')],
            { actionsToExtends: ['setData'] }
        )


        function setData(data: UserState) {
            if (data.lists) { lists.value = data.lists; }
            if (data.password) { password.value = data.password; }
        }

        return {
            actionsToExtends,
            excludedKeys,
            lists,
            parentsStores,
            password,
            persist,
            persistedPropertiesToEncrypt,
            setData
        }
    }
)()