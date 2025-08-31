import { defineEppsStore, Epps, ParentStore } from "epps";
import { useContactStore, type ContactState, type ContactStore } from "./contact";


const epps = new Epps({
    parentsStores: [new ParentStore('connectedContact', useContactStore)],
    persist: {
        persistedPropertiesToEncrypt: ['email', 'password'],
        watchMutation: true
    }
})

export const useConnectedUserStore = defineEppsStore<ContactStore, ContactState>(
    'connectedUser',
    () => ({}),
    epps
)

