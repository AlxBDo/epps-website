import { defineEppsStore, extendedState, type EppsStore } from 'epps';
import { useTypeDeclarationStore, type TypeDeclarationState, type TypeDeclarationStore, type TypesProps } from './typesDeclaration';


export interface StoreParameterTypes {
    stateType: string
    storeType: string
}


export const useStoreTypesDeclaration = (id: string) => defineEppsStore<TypeDeclarationStore, TypeDeclarationState>(`${id}StoreTypesDeclaration`, () => {
    const { actionsToExtends, parentsStores } = extendedState(
        [useTypeDeclarationStore(id)],
        { actionsToExtends: ['initTypes'] }
    )

    function getTypesStore() {
        if (!parentsStores) { return }
        return parentsStores()[0] as EppsStore<TypeDeclarationStore, TypeDeclarationState>
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
        actionsToExtends,
        initTypes,
        parentsStores
    }
})()