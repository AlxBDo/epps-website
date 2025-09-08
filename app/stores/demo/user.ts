import { ref } from "vue"
import { defineEppsStore, ParentStore } from "epps"

import { useContactStore } from "./contact"

import type { Contact } from "../../models/contact"
import type { List } from "../../models/liste"
import type { User } from "../../models/user"


export interface UserStore {
    isPassword: (password: string) => boolean
    setData: (data: UserState) => void
    user: User
}

export type UserState = Contact & User


export const useUserStore = (id?: string) => defineEppsStore<UserStore, UserState>(
    id ?? 'contact',
    () => {
        const lists = ref<List[]>()
        const password = ref<string>()


        function setData(data: UserState) {
            if (data.lists) { lists.value = data.lists; }
            if (data.password) { password.value = data.password; }
        }

        return {
            lists,
            password,
            setData
        }
    },
    {
        actionsToExtends: ['setData'],
        parentsStores: [new ParentStore('userContact', useContactStore)]
    }
)()