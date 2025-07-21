import { ref } from "vue";
import { defineEppsStore, extendedState } from "epps";
import { useUserStore, type UserStore, type UserState } from "../demo/user";
import { useContactStore, type ContactState, type ContactStore } from "./contact";


export const useConnectedUserStore = defineEppsStore<ContactStore, ContactState>(
    'connectedUser',
    () => ({
        ...extendedState(
            [useContactStore('connected-user')],
            {
                persist: {
                    persistedPropertiesToEncrypt: ref(['email', 'password', 'username']),
                    watchMutation: ref(true)
                }
            }
        )
    })
)

