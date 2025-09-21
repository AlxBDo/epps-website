import { defineEppsStore, ParentStore } from "epps";
import { useContactStore, type ContactState, type ContactStore } from "./contact";


export const useConnectedUserStore = defineEppsStore<ContactStore, ContactState>(
    'connectedUser',
    () => ({
        mutationCallback: (mutation: any) => {
            console.log('useConnectedUserStore mutationCallback', mutation)
        }
    }),
    {
        parentsStores: [new ParentStore('connectedContact', useContactStore)],
        persist: {
            persistedPropertiesToEncrypt: ['email', 'password'],
            watchMutation: true
        }
    }
)

