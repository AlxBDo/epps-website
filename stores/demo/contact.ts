import type { Contact } from "../../models/contact"
import { useItemStore } from "./item"
import type { Item } from "../../models/item"
import {
    defineEppsStore,
    extendedState,
    getParentStorePropertyValue,
    useWebUserStore,
    type WebUserState,
    type WebUserStore
} from "epps";
import { computed, ref } from "vue";
import type { Store } from "pinia";


export interface ContactStore extends WebUserStore {
    isPassword: (password: string) => boolean
    setData: (data: ContactState) => void
    contact: Contact
}

export interface ContactState extends WebUserState, Contact {
}

export const useContactStore = (id?: string) => defineEppsStore<ContactStore, ContactState>(
    id ?? 'contact',
    () => {
        const email = ref<string>()
        const firstname = ref<string>()
        const lastname = ref<string>()

        const {
            excludedKeys,
            actionsToExtends,
            parentsStores,
            persist,
            persistedPropertiesToEncrypt
        } = extendedState(
            [useWebUserStore(id ? `${id}-item` : 'contact-item')],
            { actionsToExtends: ['setData'] }
        )


        const contact = computed(() => ({
            '@id': parentsStores && getParentStorePropertyValue('@id', 0, parentsStores() ?? ([] as Store[])),
            id: parentsStores && getParentStorePropertyValue('id', 0, parentsStores()),
            email: email.value,
            firstname: firstname.value,
            lastname: lastname.value
        }))


        function setData(data: ContactState) {
            if (data.email) { email.value = data.email; }
            if (data.firstname) { firstname.value = data.firstname; }
            if (data.lastname) { lastname.value = data.lastname; }
        }

        return {
            actionsToExtends,
            contact,
            email,
            firstname,
            excludedKeys,
            lastname,
            parentsStores,
            persist,
            persistedPropertiesToEncrypt,
            setData
        }
    }
)()