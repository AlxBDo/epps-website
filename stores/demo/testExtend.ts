import { defineEppsStore, extendedState } from 'epps'

//import type { CollectionStoreMethods, CollectionState, DefineExtendedStore } from 'epps'
//import { extendedState } from "~/plugins/pinia/extendsStore/extendedState";
import { useTestStore, type TestStore, type TestStoreState } from "./test";
import { ref, type Ref } from "vue";

export interface TestExtendedStoreMethods extends TestStore {
    setProperty2: (property: string) => void
}

export interface TestExtendedStoreState extends TestStoreState {
    property2: Ref<string> | string
}

export const useTestExtendStore = defineStore(
    'testExtend',
    () => {
        const property2 = ref<string>()
        //const parentsStores = [useTestStore()]
        //const testStore = useTestStore()

        function setProperty2(property: string) {
            property2.value = property
        }

        function parentsStores() {
            return [useTestStore()]
        }

        return {
            //parentsStores,
            property2, setProperty2
        }
    }
)