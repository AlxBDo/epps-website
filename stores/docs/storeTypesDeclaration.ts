import { defineEppsStore, Epps, ParentStore } from 'epps';
import { useTypeDeclarationStore, type TypeDeclarationState, type TypeDeclarationStore, type TypesProps } from './typesDeclaration';
import { parentsStores } from '~/data/stores/useErrorsStore';


export interface StoreParameterTypes {
    stateType: string
    storeType: string
}


const epps = new Epps({
    actionsToExtends: ['initTypes'],
    parentsStores: [new ParentStore('types', useTypeDeclarationStore)]
})


export const useStoreTypesDeclaration = (id: string) => defineEppsStore<TypeDeclarationStore, TypeDeclarationState>(`${id}StoreTypesDeclaration`, () => {
    function getTypesStore() {
        if (!parentsStores) { return }
        return epps.getStore<TypeDeclarationStore, TypeDeclarationState>(0, `${id}StoreTypesDeclaration`)
    }

    function initTypes(types: TypesProps & StoreParameterTypes) {
        const typesStore = getTypesStore()
        if (!typesStore) {
            return
        }

        if (types.stateType) {
            typesStore.addTypesToSee(types.stateType)
        }

        if (types.storeType) {
            typesStore.addTypesToSee(types.storeType)
        }
    }

    return {
        initTypes
    }
}, epps)()