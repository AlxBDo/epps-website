import { ref } from "vue";
import { defineEppsStore, extendedState } from "epps";
import { useUserStore, type UserStore, type UserState } from "../demo/user";


export const useConnectedUserStore = defineEppsStore<UserStore, UserState>(
    'connectedUser',
    () => ({
        ...extendedState(
            [useUserStore('connected-user')],
            {
                persist: {
                    persistedPropertiesToEncrypt: ref(['email', 'password']),
                    watchMutation: ref(true)
                }
            }
        )
    })
)

