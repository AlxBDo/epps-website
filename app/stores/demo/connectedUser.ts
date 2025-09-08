import { defineEppsStore, ParentStore } from "epps";
import { useContactStore, type ContactState, type ContactStore } from "./contact";


export const useConnectedUserStore = defineEppsStore<ContactStore, ContactState>(
    'connectedUser',
    () => ({}),
    {
        parentsStores: [new ParentStore('connectedContact', useContactStore)],
        persist: {
            persistedPropertiesToEncrypt: ['email', 'password'],
            watchMutation: true
        }
    }
)

