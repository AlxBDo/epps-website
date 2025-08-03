import type { Contact } from "../../models/contact"
import {
    defineEppsStore,
    Epps,
    extendedState,
    getParentStore,
    ParentStore,
    useWebUserStore,
    type EppsStore,
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


const epps = new Epps({
    actionsToExtends: ['setData'],
    parentsStores: [new ParentStore<WebUserStore, WebUserState>('webUser', useWebUserStore)]
})

export const useContactStore = (id?: string) => defineEppsStore<ContactStore, ContactState>(
    id ?? 'contact',
    () => {
        const email = ref<string>()
        const firstname = ref<string>()
        const lastname = ref<string>()

        /**
         
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
         */


        const contact = computed(() => {
            const webUserStore = epps.getStore<WebUserStore, WebUserState>('webUser', id ?? 'contact')

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

        const getWebUserStore = computed(
            () => epps.getStore<WebUserStore, WebUserState>('webUser', id ?? 'contact') //getParentStore<WebUserStore, WebUserState>(0, parentsStores)
        )


        function setData(data: ContactState) {
            if (data.email) { email.value = data.email; }
            if (data.firstname) { firstname.value = data.firstname; }
            if (data.lastname) { lastname.value = data.lastname; }
        }

        return {
            //actionsToExtends,
            contact,
            email,
            firstname,
            //excludedKeys,
            lastname,
            //parentsStores,
            //persist,
            //persistedPropertiesToEncrypt,
            setData
        }
    },
    epps
)()