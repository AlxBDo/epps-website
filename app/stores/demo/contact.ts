import type { Contact } from "../../models/contact"
import {
    defineEppsStore,
    getEppsStore,
    ParentStore,
    useWebUserStore,
    type WebUserState,
    type WebUserStore
} from "epps";
import { computed, ref } from "vue";


export interface ContactStore extends WebUserStore {
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


        const contact = computed(() => {
            const webUserStore = getEppsStore<ContactStore, ContactState>(id ?? 'contact')

            if (!webUserStore) {
                return
            }

            return {
                '@id': webUserStore["@id"],
                id: webUserStore.id,
                email: email.value,
                firstname: firstname.value,
                lastname: lastname.value,
                password: webUserStore.password,
                username: webUserStore.username
            }
        })


        function setData(data: ContactState) {
            if (data.email) { email.value = data.email; }
            if (data.firstname) { firstname.value = data.firstname; }
            if (data.lastname) { lastname.value = data.lastname; }
        }

        return {
            contact,
            email,
            firstname,
            lastname,
            setData
        }
    },
    {
        actionsToExtends: ['setData'],
        parentsStores: [new ParentStore('webUser', useWebUserStore)]
    }
)()