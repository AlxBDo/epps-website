import { defineEppsStore, getEppsStore, ParentStore } from 'epps';
import { useTypeDeclarationStore, type TypeDeclarationState, type TypeDeclarationStore, type TypesProps } from './typesDeclaration';


export interface StoreParameterTypes {
    stateType: string
    storeType: string
}


export const useStoreTypesDeclaration = (id: string) => defineEppsStore<TypeDeclarationStore, TypeDeclarationState>(`${id}StoreTypesDeclaration`, () => {
    function getTypesStore() {
        return getEppsStore<TypeDeclarationStore, TypeDeclarationState>(`${id}StoreTypesDeclaration`)
    }

    function initTypes(types: TypesProps & StoreParameterTypes) {
        const typesStore = getTypesStore()

        if (types.stateType) {
            typesStore.addTypesToSee(types.stateType)
        }

        if (types.storeType) {
            typesStore.addTypesToSee(types.storeType)
        }
    }

    return { initTypes }
},
    {
        actionsToExtends: ['initTypes'],
        parentsStores: [new ParentStore('types', useTypeDeclarationStore)]
    })()